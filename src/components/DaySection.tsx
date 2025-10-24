import { DayData, Launch, Remark } from "@/types/journal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    
    // If remarks are added, create new pending remarks
    const oldRemarks = dayData.launches[index].remarks;
    const newRemarks = updatedLaunch.remarks;
    
    let updatedRemarksList = [...dayData.remarks];
    
    if (newRemarks && newRemarks !== oldRemarks) {
      const newPendingRemark: Remark = {
        id: Date.now().toString(),
        text: newRemarks,
        completed: false,
        comments: [],
      };
      updatedRemarksList = [...updatedRemarksList, newPendingRemark];
    }
    
    onUpdate({
      ...dayData,
      launches: newLaunches,
      remarks: updatedRemarksList,
    });
  };

  const handleUpdateRemark = (index: number, updatedRemark: Remark) => {
    const newRemarks = [...dayData.remarks];
    newRemarks[index] = updatedRemark;
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
          {/* Tests Section */}
          <div>
            <h3 className="font-semibold mb-2">Испытания</h3>
            <Textarea
              value={dayData.tests}
              onChange={(e) => onUpdate({ ...dayData, tests: e.target.value })}
              placeholder="Описание испытаний за день..."
              rows={4}
            />
          </div>

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
                />
              ))}
            </div>
          </div>

          {/* Remarks Section */}
          <div>
            <h3 className="font-semibold mb-3">Замечания</h3>
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
