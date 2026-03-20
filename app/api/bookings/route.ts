import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/server";
import { db } from "@/app/db";
import { bookings } from "@/app/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date");
  if (!date) {
    return NextResponse.json({ error: "date parameter required" }, { status: 400 });
  }

  const results = await db
    .select()
    .from(bookings)
    .where(eq(bookings.date, date));

  return NextResponse.json(results);
}

export async function POST(request: NextRequest) {
  const { data: session } = await auth.getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { courtId, date, hour } = body;

  if (!courtId || !date || hour === undefined) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // Check for existing booking at this slot
  const existing = await db
    .select()
    .from(bookings)
    .where(
      and(
        eq(bookings.courtId, courtId),
        eq(bookings.date, date),
        eq(bookings.hour, hour)
      )
    );

  if (existing.length > 0) {
    return NextResponse.json({ error: "Slot already booked" }, { status: 409 });
  }

  const [newBooking] = await db
    .insert(bookings)
    .values({
      courtId,
      date,
      hour,
      userId: session.user.id,
      playerName: session.user.name || session.user.email || "Anonymous",
    })
    .returning();

  return NextResponse.json(newBooking, { status: 201 });
}
