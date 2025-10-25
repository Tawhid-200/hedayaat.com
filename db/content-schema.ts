import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

export const contents = pgTable("contents", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  thumbnail_url: text("thumbnail_url"),
  author_id: text("author_id").notNull(),
  created_at: timestamp("created_at").defaultNow(),
});

export const content_blocks = pgTable("content_blocks", {
  id: serial("id").primaryKey(),
  content_id: integer("content_id").notNull(), // FK to contents.id
  type: text("type").notNull(), // 'text' | 'ayah' | 'image' | 'link'
  order: integer("order").notNull(),
  data: jsonb("data").notNull(), // flexible field for any block data
  created_at: timestamp("created_at").defaultNow(),
});
