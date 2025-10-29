import { JournalData } from "@/types/journal";

const STORAGE_KEY = "module3_journal_data";
const DELETED_DATES_KEY = "module3_deleted_dates";

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

export const loadDeletedDates = (): Set<string> => {
  try {
    const data = localStorage.getItem(DELETED_DATES_KEY);
    return data ? new Set(JSON.parse(data)) : new Set();
  } catch (error) {
    console.error("Error loading deleted dates:", error);
    return new Set();
  }
};

export const saveDeletedDates = (dates: Set<string>): void => {
  try {
    localStorage.setItem(DELETED_DATES_KEY, JSON.stringify(Array.from(dates)));
  } catch (error) {
    console.error("Error saving deleted dates:", error);
  }
};
