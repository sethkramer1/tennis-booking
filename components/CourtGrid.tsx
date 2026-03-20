"use client";

import { useState } from "react";
import { courts, generateTimeSlots, formatDate } from "@/lib/data";
import { useBookings } from "@/lib/booking-store";
import { authClient } from "@/lib/auth/client";
import TimeSlot from "./TimeSlot";
import BookingModal from "./BookingModal";

const SURFACE_BADGE: Record<string, string> = {
  hard: "bg-blue-100 text-blue-700",
  clay: "bg-orange-100 text-orange-700",
  grass: "bg-green-100 text-green-700",
};

interface CourtGridProps {
  selectedDate: string;
}

export default function CourtGrid({ selectedDate }: CourtGridProps) {
  const timeSlots = generateTimeSlots();
  const { getBooking, addBooking, removeBooking } = useBookings();
  const { data: sessionData } = authClient.useSession();
  const [modal, setModal] = useState<{ courtId: string; hour: number } | null>(null);

  const now = new Date();
  const todayStr = formatDate(now);
  const currentHour = now.getHours();
  const currentUserId = sessionData?.user?.id;

  const isSlotPast = (hour: number) => {
    return selectedDate === todayStr && hour <= currentHour;
  };

  const handleSlotClick = async (courtId: string, hour: number) => {
    const existing = getBooking(courtId, selectedDate, hour);
    if (existing) {
      if (existing.userId === currentUserId) {
        if (confirm("Cancel your booking?")) {
          await removeBooking(existing.id);
        }
      }
      return;
    }

    if (!currentUserId) {
      alert("Please sign in to book a court.");
      return;
    }
    setModal({ courtId, hour });
  };

  const handleConfirmBooking = async () => {
    if (modal) {
      const success = await addBooking(modal.courtId, selectedDate, modal.hour);
      if (!success) {
        alert("Failed to book. The slot may already be taken.");
      }
      setModal(null);
    }
  };

  const modalCourt = modal ? courts.find((c) => c.id === modal.courtId) : null;
  const modalTimeSlot = modal ? timeSlots.find((t) => t.hour === modal.hour) : null;

  return (
    <>
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Header row */}
          <div className="grid gap-2 mb-3" style={{ gridTemplateColumns: `100px repeat(${courts.length}, 1fr)` }}>
            <div /> {/* Empty corner cell */}
            {courts.map((court) => (
              <div key={court.id} className="text-center">
                <div className="font-semibold text-gray-900 text-sm">{court.name}</div>
                <span className={`inline-block text-xs px-2 py-0.5 rounded-full mt-1 font-medium capitalize ${SURFACE_BADGE[court.surface]}`}>
                  {court.surface}
                </span>
              </div>
            ))}
          </div>

          {/* Time slot rows */}
          <div className="space-y-1.5">
            {timeSlots.map((slot) => (
              <div
                key={slot.hour}
                className="grid gap-2 items-center"
                style={{ gridTemplateColumns: `100px repeat(${courts.length}, 1fr)` }}
              >
                <div className="text-xs text-gray-500 font-medium text-right pr-3 whitespace-nowrap">
                  {slot.label.split(" - ")[0]}
                </div>
                {courts.map((court) => {
                  const booking = getBooking(court.id, selectedDate, slot.hour);
                  return (
                    <TimeSlot
                      key={`${court.id}-${slot.hour}`}
                      booking={booking}
                      isPast={isSlotPast(slot.hour)}
                      isOwn={booking?.userId === currentUserId}
                      onClick={() => handleSlotClick(court.id, slot.hour)}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {modal && modalCourt && modalTimeSlot && (
        <BookingModal
          courtName={modalCourt.name}
          timeLabel={modalTimeSlot.label}
          onConfirm={handleConfirmBooking}
          onCancel={() => setModal(null)}
        />
      )}
    </>
  );
}
