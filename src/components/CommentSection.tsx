import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { MessageSquare, X } from "lucide-react";
import { Comment } from "@/types/journal";

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (text: string, author: string) => void;
}

export const CommentSection = ({ comments, onAddComment }: CommentSectionProps) => {
  const [showForm, setShowForm] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = () => {
    if (commentText.trim() && author.trim()) {
      onAddComment(commentText, author);
      setCommentText("");
      setAuthor("");
      setShowForm(false);
    }
  };

  return (
    <div className="mt-3 space-y-2">
      {comments.length > 0 && (
        <div className="space-y-2">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-muted p-3 rounded-md text-sm">
              <p className="text-foreground">{comment.text}</p>
              <p className="text-muted-foreground mt-1 text-xs">
                — {comment.author}, {new Date(comment.createdAt).toLocaleString('ru-RU')}
              </p>
            </div>
          ))}
        </div>
      )}
      
      {!showForm ? (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowForm(true)}
          className="gap-2"
        >
          <MessageSquare className="h-4 w-4" />
          Комментировать
        </Button>
      ) : (
        <div className="bg-muted p-3 rounded-md space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Добавить комментарий</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowForm(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Input
            placeholder="Ваше ФИО"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <Textarea
            placeholder="Текст комментария"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            rows={3}
          />
          <Button onClick={handleSubmit} size="sm">
            Отправить
          </Button>
        </div>
      )}
    </div>
  );
};
