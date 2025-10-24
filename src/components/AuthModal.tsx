import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { toast } from "sonner";

interface AuthModalProps {
  onAuthenticated: () => void;
}

const CORRECT_PASSWORD = "Module32025";

export const AuthModal = ({ onAuthenticated }: AuthModalProps) => {
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setOpen(false);
      onAuthenticated();
      toast.success("Вход выполнен успешно");
    } else {
      toast.error("Неверный пароль");
      setPassword("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md [&>button]:hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Lock className="h-6 w-6" />
            Журнал запуска модуля 3
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
          </div>
          <Button type="submit" className="w-full">
            Войти
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
