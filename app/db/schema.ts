import {
  pgTable,
  pgSchema,
  uuid,
  text,
  timestamp,
  integer,
  boolean,
  unique,
  uniqueIndex,
} from "drizzle-orm/pg-core";

// Reference Neon Auth's managed user table (read-only, managed by Neon)
const neonAuth = pgSchema("neon_auth");

export const usersInNeonAuth = neonAuth.table("user", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  emailVerified: boolean("emailVerified").notNull(),
  image: text("image"),
  createdAt: timestamp("createdAt", { withTimezone: true, mode: "string" }).notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true, mode: "string" }).notNull(),
});

export const courts = pgTable("courts", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  surface: text("surface").notNull(),
});

export const bookings = pgTable(
  "bookings",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    courtId: text("court_id")
      .notNull()
      .references(() => courts.id),
    date: text("date").notNull(),
    hour: integer("hour").notNull(),
    userId: uuid("user_id")
      .notNull()
      .references(() => usersInNeonAuth.id),
    playerName: text("player_name").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    uniqueIndex("booking_slot_unique").on(table.courtId, table.date, table.hour),
  ]
);

export type CourtRow = typeof courts.$inferSelect;
export type BookingRow = typeof bookings.$inferSelect;
