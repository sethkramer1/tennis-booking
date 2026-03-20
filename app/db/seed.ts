import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { courts } from "./schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function seed() {
  await db
    .insert(courts)
    .values([
      { id: "court-1", name: "Court 1", surface: "hard" },
      { id: "court-2", name: "Court 2", surface: "hard" },
      { id: "court-3", name: "Court 3", surface: "clay" },
      { id: "court-4", name: "Court 4", surface: "grass" },
    ])
    .onConflictDoNothing();

  console.log("Courts seeded successfully");
}

seed().catch(console.error);
