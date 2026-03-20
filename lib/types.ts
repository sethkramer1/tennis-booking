export interface Court {
  id: string;
  name: string;
  surface: "hard" | "clay" | "grass";
}

export interface TimeSlot {
  hour: number; // 7 = 7:00 AM, 13 = 1:00 PM, etc.
  label: string; // "7:00 AM - 8:00 AM"
}

export interface Booking {
  id: number;
  courtId: string;
  date: string; // "YYYY-MM-DD"
  hour: number;
  playerName: string;
  userId: string;
}
