"use client";

import { getNextDays, formatDate } from "@/lib/data";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

interface DatePickerProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

export default function DatePicker({ selectedDate, onSelectDate }: DatePickerProps) {
  const days = getNextDays(8);

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {days.map((date) => {
        const dateStr = formatDate(date);
        const isSelected = dateStr === selectedDate;
        const isToday = dateStr === formatDate(new Date());

        return (
          <button
            key={dateStr}
            onClick={() => onSelectDate(dateStr)}
            className={`flex flex-col items-center px-4 py-3 rounded-xl min-w-[72px] transition-all cursor-pointer
              ${isSelected
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/25"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
          >
            <span className="text-xs font-medium uppercase tracking-wide opacity-80">
              {isToday && dateStr === selectedDate ? "Today" : DAYS[date.getDay()]}
            </span>
            <span className="text-xl font-bold mt-0.5">{date.getDate()}</span>
            <span className="text-xs opacity-70">{MONTHS[date.getMonth()]}</span>
          </button>
        );
      })}
    </div>
  );
}
