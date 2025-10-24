import { useState } from "react";
import { DayData, Launch, Remark } from "@/types/journal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { formatDate } from "@/lib/dates";
import { LaunchCard } from "./LaunchCard";
import { RemarkCard } from "./RemarkCard";

interface DaySectionProps {
  dayData: DayData;
  onUpdate: (updatedData: DayData) => void;
}

export const DaySection = ({ dayData, onUpdate }: DaySectionProps) => {
  const [newRemarkText, setNewRemarkText] = useState("");
  const [showRemarkForm, setShowRemarkForm] = useState(false);

  const handleAddLaunch = () => {
    const newLaunch: Launch = {
      id: Date.now().toString(),
      startTime: "",
      endTime: "",
      remarks: "",
      results: "",
      comments: [],
    };
    
    onUpdate({
      ...dayData,
      launches: [...dayData.launches, newLaunch],
    });
  };

  const handleUpdateLaunch = (index: number, updatedLaunch: Launch) => {
    const newLaunches = [...dayData.launches];
    newLaunches[index] = updatedLaunch;
    
    onUpdate({
      ...dayData,
      launches: newLaunches,
    });
  };

  const handleDeleteLaunch = (index: number) => {
    const newLaunches = dayData.launches.filter((_, i) => i !== index);
    onUpdate({
      ...dayData,
      launches: newLaunches,
    });
  };

  const handleAddRemark = () => {
    if (newRemarkText.trim()) {
      const newRemark: Remark = {
        id: Date.now().toString(),
        text: newRemarkText,
        completed: false,
        comments: [],
      };
      
      onUpdate({
        ...dayData,
        remarks: [...dayData.remarks, newRemark],
      });
      
      setNewRemarkText("");
      setShowRemarkForm(false);
    }
  };

  const handleUpdateRemark = (index: number, updatedRemark: Remark) => {
    const newRemarks = [...dayData.remarks];
    newRemarks[index] = updatedRemark;
    onUpdate({
      ...dayData,
      remarks: newRemarks,
    });
  };

  const handleDeleteRemark = (index: number) => {
    const newRemarks = dayData.remarks.filter((_, i) => i !== index);
    onUpdate({
      ...dayData,
      remarks: newRemarks,
    });
  };

  const pendingRemarks = dayData.remarks.filter(r => !r.completed);
  const completedRemarks = dayData.remarks.filter(r => r.completed);

  return (
    <div className="relative pl-8 pb-12 border-l-2 border-primary/30">
      <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-background" />
      
      <Card className="bg-card">
        <CardHeader className="bg-primary/5 border-b">
          <CardTitle className="text-xl">{formatDate(dayData.date)}</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Launches Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Запуски модуля</h3>
              <Button onClick={handleAddLaunch} size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Добавить запуск
              </Button>
            </div>
            <div className="space-y-3">
              {dayData.launches.map((launch, index) => (
                <LaunchCard
                  key={launch.id}
                  launch={launch}
                  index={index}
                  onUpdate={(updated) => handleUpdateLaunch(index, updated)}
                  onDelete={() => handleDeleteLaunch(index)}
                />
              ))}
            </div>
          </div>

          {/* Remarks Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Замечания</h3>
              <Button 
                onClick={() => setShowRemarkForm(!showRemarkForm)} 
                size="sm" 
                className="gap-2"
                variant={showRemarkForm ? "outline" : "default"}
              >
                <Plus className="h-4 w-4" />
                {showRemarkForm ? "Отмена" : "Добавить замечание"}
              </Button>
            </div>
            
            {showRemarkForm && (
              <div className="mb-4 space-y-2">
                <Textarea
                  value={newRemarkText}
                  onChange={(e) => setNewRemarkText(e.target.value)}
                  placeholder="Текст замечания..."
                  rows={3}
                />
                <Button onClick={handleAddRemark} size="sm">
                  Сохранить замечание
                </Button>
              </div>
            )}
            
            <div className="grid md:grid-cols-2 gap-4">
              {/* Pending Remarks */}
              <div>
                <h4 className="text-sm font-medium mb-2 text-pending">
                  Невыполненные замечания ({pendingRemarks.length})
                </h4>
                <div className="space-y-2">
                  {pendingRemarks.map((remark, index) => {
                    const originalIndex = dayData.remarks.indexOf(remark);
                    return (
                      <RemarkCard
                        key={remark.id}
                        remark={remark}
                        onUpdate={(updated) => handleUpdateRemark(originalIndex, updated)}
                        onDelete={() => handleDeleteRemark(originalIndex)}
                      />
                    );
                  })}
                  {pendingRemarks.length === 0 && (
                    <p className="text-sm text-muted-foreground italic">Нет невыполненных замечаний</p>
                  )}
                </div>
              </div>

              {/* Completed Remarks */}
              <div>
                <h4 className="text-sm font-medium mb-2 text-completed">
                  Выполненные замечания ({completedRemarks.length})
                </h4>
                <div className="space-y-2">
                  {completedRemarks.map((remark, index) => {
                    const originalIndex = dayData.remarks.indexOf(remark);
                    return (
                      <RemarkCard
                        key={remark.id}
                        remark={remark}
                        onUpdate={(updated) => handleUpdateRemark(originalIndex, updated)}
                        onDelete={() => handleDeleteRemark(originalIndex)}
                      />
                    );
                  })}
                  {completedRemarks.length === 0 && (
                    <p className="text-sm text-muted-foreground italic">Нет выполненных замечаний</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
