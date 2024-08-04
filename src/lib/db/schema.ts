import { pgTable, uuid, timestamp, text, doublePrecision } from 'drizzle-orm/pg-core';

export const exerciseTable = pgTable('exercises', {
	id: uuid('id').primaryKey(),
	userid: text('userid').notNull(),
	max_weight: doublePrecision('max_weight').notNull(),
	name: text('name').notNull(),
	created_at: timestamp('created_at').notNull()
});
