import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
export const enquiries = sqliteTable(
  "enquiries",
  {
    id: text("id").primaryKey(),
    idempotencyKey: text("idempotency_key").notNull().unique(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    category: text("category").notNull(),
    country: text("country").notNull(),
    model: text("model").notNull(),
    message: text("message").notNull(),
    sourcePath: text("source_path").notNull(),
    attribution: text("attribution").notNull(),
    consent: text("consent").notNull(),
    createdAt: text("created_at").notNull(),
    status: text("status").notNull().default("new"),
  },
  (t) => [index("enquiries_created_at_idx").on(t.createdAt)],
);
export const rateLimits = sqliteTable("rate_limits", {
  key: text("key").primaryKey(),
  count: integer("count").notNull(),
  expiresAt: integer("expires_at").notNull(),
});
