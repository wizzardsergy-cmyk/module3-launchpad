import { JournalData } from "@/types/journal";

const STORAGE_KEY = "module3_journal_data";

export const loadJournalData = (): JournalData => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error("Error loading journal data:", error);
    return {};
  }
};

export const saveJournalData = (data: JournalData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving journal data:", error);
  }
};
