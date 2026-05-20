import { pgTable, index, uuid, text, integer, timestamp, unique, foreignKey, primaryKey } from "drizzle-orm/pg-core"



export const universities = pgTable("universities", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: text().notNull(),
	name_en: text(),
	region: text().notNull(),
	city: text(),
	address: text(),
	type: text(),
	website: text(),
	established_year: integer(),
	created_at: timestamp({ mode: 'string' }).defaultNow(),
	updated_at: timestamp({ mode: 'string' }).defaultNow(),
}, (table) => [
	index("idx_universities_region").using("btree", table.region.asc().nullsLast().op("text_ops")),
]);

export const classifications = pgTable("classifications", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	code: text().notNull(),
	name: text().notNull(),
	description: text(),
	created_at: timestamp({ mode: 'string' }).defaultNow(),
}, (table) => [
	unique("classifications_code_key").on(table.code),
]);

export const university_classifications = pgTable("university_classifications", {
	university_id: uuid().notNull(),
	classification_id: uuid().notNull(),
}, (table) => [
	index("idx_university_classifications_university").using("btree", table.university_id.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.university_id],
			foreignColumns: [universities.id],
			name: "university_classifications_university_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.classification_id],
			foreignColumns: [classifications.id],
			name: "university_classifications_classification_id_fkey"
		}).onDelete("cascade"),
	primaryKey({ columns: [table.university_id, table.classification_id], name: "university_classifications_pkey"}),
]);
