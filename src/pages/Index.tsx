import { useState, useEffect } from "react";
import { AuthModal } from "@/components/AuthModal";
import { DaySection } from "@/components/DaySection";
import { generateDateRange } from "@/lib/dates";
import { loadJournalData, saveJournalData } from "@/lib/storage";
import { JournalData, DayData } from "@/types/journal";
import { FileText } from "lucide-react";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [journalData, setJournalData] = useState<JournalData>({});
  
  const dates = generateDateRange("2025-10-24", "2025-12-31");

  useEffect(() => {
    const data = loadJournalData();
    setJournalData(data);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      saveJournalData(journalData);
    }
  }, [journalData, isAuthenticated]);

  const handleUpdateDay = (date: string, updatedData: DayData) => {
    setJournalData(prev => ({
      ...prev,
      [date]: updatedData,
    }));
  };

  const getDayData = (date: string): DayData => {
    return journalData[date] || {
      date,
      tests: "",
      launches: [],
      remarks: [],
    };
  };

  if (!isAuthenticated) {
    return <AuthModal onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-card border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <FileText className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Журнал запуска и испытаний модуля 3
              </h1>
              <p className="text-sm text-muted-foreground">
                24 октября 2025 — 31 декабря 2025
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-1">
          {dates.map((date) => (
            <DaySection
              key={date}
              dayData={getDayData(date)}
              onUpdate={(updatedData) => handleUpdateDay(date, updatedData)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
