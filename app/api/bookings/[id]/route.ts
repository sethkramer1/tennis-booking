import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/server";
import { db } from "@/app/db";
import { bookings } from "@/app/db/schema";
import { eq, and } from "drizzle-orm";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { data: session } = await auth.getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const bookingId = parseInt(id, 10);

  // Only delete if the booking belongs to the current user
  const result = await db
    .delete(bookings)
    .where(
      and(
        eq(bookings.id, bookingId),
        eq(bookings.userId, session.user.id)
      )
    )
    .returning();

  if (result.length === 0) {
    return NextResponse.json(
      { error: "Booking not found or not yours" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true });
}
