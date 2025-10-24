import { Remark, Comment } from "@/types/journal";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, Trash2 } from "lucide-react";
import { CommentSection } from "./CommentSection";
import { cn } from "@/lib/utils";

interface RemarkCardProps {
  remark: Remark;
  onUpdate: (updatedRemark: Remark) => void;
  onDelete: () => void;
}

export const RemarkCard = ({ remark, onUpdate, onDelete }: RemarkCardProps) => {
  const handleAddComment = (text: string, author: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      text,
      author,
      createdAt: new Date().toISOString(),
    };
    onUpdate({
      ...remark,
      comments: [...remark.comments, newComment],
    });
  };

  const handleStartComplete = () => {
    onUpdate({
      ...remark,
      inProgress: true,
    });
  };

  const handleSaveComplete = () => {
    if (remark.completedBy && remark.completedAction) {
      onUpdate({
        ...remark,
        completed: true,
        inProgress: false,
      });
    }
  };

  const handleCancelComplete = () => {
    onUpdate({
      ...remark,
      inProgress: false,
      completedBy: undefined,
      completedAction: undefined,
    });
  };

  const handleDeleteComment = (commentId: string) => {
    onUpdate({
      ...remark,
      comments: remark.comments.filter(c => c.id !== commentId),
    });
  };

  return (
    <Card
      className={cn(
        "transition-all",
        remark.completed
          ? "border-completed bg-completed/5"
          : "border-pending bg-pending/5"
      )}
    >
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start gap-2">
          {remark.completed && (
            <Check className="h-5 w-5 text-completed flex-shrink-0 mt-0.5" />
          )}
          <p className="text-sm flex-1">{remark.text}</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="h-6 w-6 p-0 flex-shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>

        {remark.completed ? (
          <>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-muted-foreground">Кто устранил:</span>
                <p className="font-medium">{remark.completedBy}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Что сделал:</span>
                <p className="whitespace-pre-wrap bg-muted p-2 rounded mt-1">{remark.completedAction}</p>
              </div>
            </div>
          </>
        ) : remark.inProgress ? (
          <>
            <div className="space-y-2">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Кто устранил:</label>
                <Input
                  value={remark.completedBy || ""}
                  onChange={(e) => onUpdate({ ...remark, completedBy: e.target.value })}
                  placeholder="ФИО"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Что сделал:</label>
                <Textarea
                  value={remark.completedAction || ""}
                  onChange={(e) => onUpdate({ ...remark, completedAction: e.target.value })}
                  placeholder="Описание выполненных работ"
                  rows={2}
                  className="mt-1"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="default"
                size="sm"
                onClick={handleSaveComplete}
                className="flex-1 bg-completed text-completed-foreground hover:bg-completed/90"
                disabled={!remark.completedBy || !remark.completedAction}
              >
                Сохранить
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancelComplete}
                className="flex-1"
              >
                Отмена
              </Button>
            </div>
          </>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={handleStartComplete}
            className="w-full border-completed text-completed hover:bg-completed hover:text-completed-foreground"
          >
            Выполнено
          </Button>
        )}

        <CommentSection 
          comments={remark.comments} 
          onAddComment={handleAddComment}
          onDeleteComment={handleDeleteComment}
        />
      </CardContent>
    </Card>
  );
};
