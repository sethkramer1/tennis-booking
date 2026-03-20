"use client";

import { useState, useEffect } from "react";
import { formatDate } from "@/lib/data";
import { BookingProvider, useBookings } from "@/lib/booking-store";
import DatePicker from "@/components/DatePicker";
import CourtGrid from "@/components/CourtGrid";
import { UserButton } from "@neondatabase/neon-js/auth/react/ui";

function BookingPage() {
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  const { fetchBookings, loading } = useBookings();

  useEffect(() => {
    fetchBookings(selectedDate);
  }, [selectedDate, fetchBookings]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12c0-4 2-8 4-8s4 4 4 8-2 8-4 8-4-4-4-8z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Court Booker</h1>
                <p className="text-sm text-gray-500">Reserve your court in seconds</p>
              </div>
            </div>
            <UserButton />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* Date picker section */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Select a Date
          </h2>
          <DatePicker selectedDate={selectedDate} onSelectDate={setSelectedDate} />
        </section>

        {/* Court grid section */}
        <section className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Available Courts
            </h2>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-200 border border-emerald-300" />
                Available
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-red-200 border border-red-300" />
                Booked
              </span>
            </div>
          </div>
          {loading ? (
            <div className="text-center py-12 text-gray-400">Loading bookings...</div>
          ) : (
            <CourtGrid selectedDate={selectedDate} />
          )}
        </section>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <BookingProvider>
      <BookingPage />
    </BookingProvider>
  );
}
