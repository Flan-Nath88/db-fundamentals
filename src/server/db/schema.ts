import { pgTable, text, timestamp, boolean, serial, varchar, jsonb } from "drizzle-orm/pg-core";

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 250 }).notNull(),
  description: text("description"),
  dueDate: timestamp("due_date"),
  completed: boolean("completed").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
})

export const aiProjects = pgTable("ai_projects", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 250 }).notNull(),
  description: text("description"),
  stack: jsonb("stack"),
  status: text("status"),
  repository: text("repository"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
})

export const gabesFavorites = pgTable("gabesFavorites", {
  id: serial().primaryKey(),
  videoGame: varchar({ length: 250 }).notNull(),
  movie: varchar({ length: 100 }).notNull(),
  architecture: varchar({ length: 250 }).notNull(),
  tech: varchar({ length: 100 }).notNull(),
})

export interface StackItem {
  name: string;
  version?: string;
  category?: string;
}

export type Task = typeof tasks.$inferSelect;
export type InsertTask = typeof tasks.$inferInsert;

// Overriding the stack type to use the interface so TypeScript knows what the stack is
export type AiProject = Omit<typeof aiProjects.$inferSelect, 'stack'> & {
  stack: StackItem[] | null;
};
export type InsertAiProject = Omit<typeof aiProjects.$inferInsert, 'stack'> & {
  stack: StackItem[] | null;
};

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 100 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
})

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export type gabesFavorites = typeof gabesFavorites.$inferSelect;
