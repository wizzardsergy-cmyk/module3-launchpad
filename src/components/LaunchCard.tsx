import { Launch, Comment } from "@/types/journal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Clock, Trash2 } from "lucide-react";
import { CommentSection } from "./CommentSection";

interface LaunchCardProps {
  launch: Launch;
  index: number;
  onUpdate: (updatedLaunch: Launch) => void;
  onDelete: () => void;
  onSave: () => void;
}

export const LaunchCard = ({ launch, index, onUpdate, onDelete, onSave }: LaunchCardProps) => {
  const handleAddComment = (text: string, author: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      text,
      author,
      createdAt: new Date().toISOString(),
    };
    onUpdate({
      ...launch,
      comments: [...launch.comments, newComment],
    });
  };

  const handleDeleteComment = (commentId: string) => {
    onUpdate({
      ...launch,
      comments: launch.comments.filter(c => c.id !== commentId),
    });
  };

  const handleSave = () => {
    if (launch.startTime && launch.endTime && launch.results) {
      onSave();
    }
  };

  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Запуск #{index + 1}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {!launch.saved ? (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Начало</label>
                <Input
                  type="time"
                  value={launch.startTime}
                  onChange={(e) => onUpdate({ ...launch, startTime: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Окончание</label>
                <Input
                  type="time"
                  value={launch.endTime}
                  onChange={(e) => onUpdate({ ...launch, endTime: e.target.value })}
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-muted-foreground">Результаты запуска</label>
              <Textarea
                value={launch.results}
                onChange={(e) => onUpdate({ ...launch, results: e.target.value })}
                placeholder="Введите результаты..."
                rows={3}
              />
            </div>

            <Button 
              onClick={handleSave} 
              className="w-full"
              disabled={!launch.startTime || !launch.endTime || !launch.results}
            >
              Добавить
            </Button>
          </>
        ) : (
          <>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Время:</span>
                <span className="font-medium">{launch.startTime} - {launch.endTime}</span>
              </div>
              <div>
                <span className="text-muted-foreground block mb-1">Результаты:</span>
                <p className="whitespace-pre-wrap bg-muted p-2 rounded">{launch.results}</p>
              </div>
            </div>

            <CommentSection 
              comments={launch.comments} 
              onAddComment={handleAddComment}
              onDeleteComment={handleDeleteComment}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
};
