export interface Comment {
  id: string;
  text: string;
  author: string;
  createdAt: string;
}

export interface Remark {
  id: string;
  text: string;
  completed: boolean;
  completedBy?: string;
  completedAction?: string;
  comments: Comment[];
}

export interface Launch {
  id: string;
  startTime: string;
  endTime: string;
  results: string;
  comments: Comment[];
  saved: boolean;
}

export interface DayData {
  date: string;
  launches: Launch[];
  remarks: Remark[];
}

export interface JournalData {
  [date: string]: DayData;
}
