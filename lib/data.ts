import { Court, TimeSlot } from "./types";

export const courts: Court[] = [
  { id: "court-1", name: "Court 1", surface: "hard" },
  { id: "court-2", name: "Court 2", surface: "hard" },
  { id: "court-3", name: "Court 3", surface: "clay" },
  { id: "court-4", name: "Court 4", surface: "grass" },
];

export function generateTimeSlots(): TimeSlot[] {
  const slots: TimeSlot[] = [];
  for (let hour = 7; hour <= 20; hour++) {
    const startHour = hour % 12 === 0 ? 12 : hour % 12;
    const endRaw = hour + 1;
    const endHour = endRaw % 12 === 0 ? 12 : endRaw % 12;
    const startPeriod = hour < 12 ? "AM" : "PM";
    const endPeriod = endRaw < 12 ? "AM" : "PM";
    slots.push({
      hour,
      label: `${startHour}:00 ${startPeriod} - ${endHour}:00 ${endPeriod}`,
    });
  }
  return slots;
}

export function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function getNextDays(count: number): Date[] {
  const days: Date[] = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
}
