import { Remark, Comment } from "@/types/journal";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check } from "lucide-react";
import { CommentSection } from "./CommentSection";
import { cn } from "@/lib/utils";

interface RemarkCardProps {
  remark: Remark;
  onUpdate: (updatedRemark: Remark) => void;
}

export const RemarkCard = ({ remark, onUpdate }: RemarkCardProps) => {
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

  const handleComplete = () => {
    onUpdate({
      ...remark,
      completed: true,
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
        </div>

        {remark.completed ? (
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
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={handleComplete}
            className="w-full border-completed text-completed hover:bg-completed hover:text-completed-foreground"
          >
            Выполнено
          </Button>
        )}

        <CommentSection comments={remark.comments} onAddComment={handleAddComment} />
      </CardContent>
    </Card>
  );
};
