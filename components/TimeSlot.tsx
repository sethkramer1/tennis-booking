"use client";

import { Booking } from "@/lib/types";

interface TimeSlotProps {
  booking: Booking | undefined;
  isPast: boolean;
  isOwn?: boolean;
  onClick: () => void;
}

export default function TimeSlot({ booking, isPast, isOwn, onClick }: TimeSlotProps) {
  if (isPast) {
    return (
      <div className="h-14 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center">
        <span className="text-xs text-gray-400">Past</span>
      </div>
    );
  }

  if (booking) {
    return (
      <button
        onClick={onClick}
        className={`h-14 rounded-lg border-2 flex items-center justify-center transition w-full ${
          isOwn
            ? "bg-red-50 border-red-300 hover:bg-red-100 cursor-pointer"
            : "bg-red-50 border-red-200 cursor-default opacity-80"
        }`}
        title={
          isOwn
            ? "Your booking — click to cancel"
            : `Booked by ${booking.playerName}`
        }
      >
        <span className="text-xs font-medium text-red-700 truncate px-1">
          {booking.playerName}
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="h-14 rounded-lg bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center hover:bg-emerald-100 hover:border-emerald-300 transition cursor-pointer w-full"
    >
      <span className="text-xs font-medium text-emerald-700">Available</span>
    </button>
  );
}
