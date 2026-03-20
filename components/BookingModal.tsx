"use client";

import { useEffect, useRef } from "react";

interface BookingModalProps {
  courtName: string;
  timeLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function BookingModal({ courtName, timeLabel, onConfirm, onCancel }: BookingModalProps) {
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    confirmRef.current?.focus();
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onCancel}>
      <div
        className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 animate-in"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-bold text-gray-900">Confirm Booking</h3>
        <p className="text-sm text-gray-500 mt-1">
          {courtName} &middot; {timeLabel}
        </p>
        <p className="text-sm text-gray-600 mt-3">
          This court will be booked under your account.
        </p>

        <div className="flex gap-3 mt-5">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            ref={confirmRef}
            type="button"
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition cursor-pointer"
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
}
