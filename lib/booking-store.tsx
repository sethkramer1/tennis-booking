"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { Booking } from "./types";

interface BookingContextType {
  bookings: Booking[];
  loading: boolean;
  fetchBookings: (date: string) => Promise<void>;
  addBooking: (courtId: string, date: string, hour: number) => Promise<boolean>;
  removeBooking: (bookingId: number) => Promise<boolean>;
  getBooking: (courtId: string, date: string, hour: number) => Booking | undefined;
}

const BookingContext = createContext<BookingContextType | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBookings = useCallback(async (date: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/bookings?date=${date}`);
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const addBooking = useCallback(
    async (courtId: string, date: string, hour: number): Promise<boolean> => {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courtId, date, hour }),
      });
      if (res.ok) {
        const newBooking = await res.json();
        setBookings((prev) => [...prev, newBooking]);
        return true;
      }
      return false;
    },
    []
  );

  const removeBooking = useCallback(async (bookingId: number): Promise<boolean> => {
    const res = await fetch(`/api/bookings/${bookingId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
      return true;
    }
    return false;
  }, []);

  const getBooking = useCallback(
    (courtId: string, date: string, hour: number) => {
      return bookings.find(
        (b) => b.courtId === courtId && b.date === date && b.hour === hour
      );
    },
    [bookings]
  );

  return (
    <BookingContext.Provider
      value={{ bookings, loading, fetchBookings, addBooking, removeBooking, getBooking }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBookings must be used within a BookingProvider");
  }
  return context;
}
