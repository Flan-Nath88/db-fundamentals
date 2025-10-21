import { pgTable, serial, varchar, text, timestamp, boolean, jsonb, unique } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const tasks = pgTable("tasks", {
	id: serial().primaryKey().notNull(),
	title: varchar({ length: 250 }).notNull(),
	description: text(),
	dueDate: timestamp("due_date", { mode: 'string' }),
	completed: boolean().default(false).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const aiProjects = pgTable("ai_projects", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 250 }).notNull(),
	description: text(),
	stack: jsonb(),
	status: text(),
	repository: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const users = pgTable("users", {
	id: serial().primaryKey().notNull(),
	username: varchar({ length: 100 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	passwordHash: text("password_hash").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("users_username_unique").on(table.username),
	unique("users_email_unique").on(table.email),
]);

export const gabesFavorites = pgTable("gabesFavorites", {
	id: serial().primaryKey().notNull(),
	videoGame: varchar({ length: 250 }).notNull(),
	movie: varchar({ length: 100 }).notNull(),
	architecture: varchar({ length: 250 }).notNull(),
	tech: varchar({ length: 100 }).notNull(),
});

export const movies = pgTable("movies", {
	id: serial().primaryKey().notNull(),
	title: varchar({ length: 250 }).notNull(),
	director: varchar({ length: 200 }),
	genre: varchar({ length: 100 }),
	releaseYear: timestamp("release_year", { mode: 'string' }),
	rating: text(),
	imdbRating: text("imdb_rating"),
	description: text(),
	posterUrl: text("poster_url"),
});
