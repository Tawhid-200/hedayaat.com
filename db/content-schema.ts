import { pgTable, text, timestamp, jsonb, uuid } from "drizzle-orm/pg-core";

export const contentInfo = pgTable("content_info", {
  id: uuid("id").defaultRandom().primaryKey(), // unique id for each post
  authorId: uuid("author_id").notNull(), // relational with authors (if any)
  authorName: text("author_name").notNull(), // stored name for quick lookup
  title: text("title").notNull(), // post title
  thumbnail: text("thumbnail").notNull(), // ImageKit image url
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const content = pgTable("content", {
  id: uuid("id").defaultRandom().primaryKey(),
  contentId: uuid("content_id")
    .references(() => contentInfo.id, { onDelete: "cascade" })
    .notNull(),
  blocks: jsonb("blocks").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
