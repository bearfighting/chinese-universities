import { pgTable, unique, uuid, text, timestamp, index, integer, foreignKey, primaryKey, date, boolean } from "drizzle-orm/pg-core"



export const classifications = pgTable("classifications", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	code: text().notNull(),
	name: text().notNull(),
	description: text(),
	created_at: timestamp({ mode: 'string' }).defaultNow(),
}, (table) => [
	unique("classifications_code_key").on(table.code),
]);

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
	slug: text(),
}, (table) => [
	index("idx_universities_region").using("btree", table.region.asc().nullsLast().op("text_ops")),
	unique("universities_slug_key").on(table.slug),
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

export const university_rankings = pgTable("university_rankings", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	university_id: uuid().notNull(),
	system: text().notNull(),
	year: integer().notNull(),
	rank_from: integer(),
	rank_to: integer(),
	rank_text: text(),
	source_url: text(),
	created_at: timestamp({ mode: 'string' }).defaultNow(),
}, (table) => [
	index("idx_university_rankings_university").using("btree", table.university_id.asc().nullsLast().op("uuid_ops")),
]);

export const source_documents = pgTable("source_documents", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	university_id: uuid().notNull(),
	academic_year: integer(),
	document_type: text().notNull(),
	title: text().notNull(),
	language: text(),
	format: text(),
	source_url: text(),
	local_path: text(),
	source_label: text(),
	published_on: date({ mode: 'string' }),
	retrieved_at: timestamp({ mode: 'string' }),
	notes: text(),
	created_at: timestamp({ mode: 'string' }).defaultNow(),
	updated_at: timestamp({ mode: 'string' }).defaultNow(),
}, (table) => [
	index("idx_source_documents_lookup").using("btree", table.university_id.asc().nullsLast().op("uuid_ops"), table.academic_year.asc().nullsLast().op("int4_ops"), table.document_type.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.university_id],
			foreignColumns: [universities.id],
			name: "source_documents_university_id_fkey"
		}).onDelete("cascade"),
]);

export const university_profiles = pgTable("university_profiles", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	university_id: uuid().notNull(),
	hero_summary: text(),
	overview: text(),
	city_pitch: text(),
	tuition_summary: text(),
	accommodation_summary: text(),
	visa_summary: text(),
	insurance_summary: text(),
	contact_email: text(),
	contact_phone: text(),
	contact_fax: text(),
	contact_website: text(),
	source_url: text(),
	source_label: text(),
	source_published_on: date({ mode: 'string' }),
	created_at: timestamp({ mode: 'string' }).defaultNow(),
	updated_at: timestamp({ mode: 'string' }).defaultNow(),
}, (table) => [
	unique("university_profiles_university_id_key").on(table.university_id),
	foreignKey({
			columns: [table.university_id],
			foreignColumns: [universities.id],
			name: "university_profiles_university_id_fkey"
		}).onDelete("cascade"),
]);

export const university_admission_tracks = pgTable("university_admission_tracks", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	university_id: uuid().notNull(),
	primary_source_document_id: uuid(),
	academic_year: integer().notNull(),
	degree_level: text().notNull(),
	track_code: text().notNull(),
	track_name: text().notNull(),
	teaching_language: text().notNull(),
	study_duration_text: text(),
	intake_text: text(),
	tuition_text: text(),
	application_fee_text: text(),
	application_platform: text(),
	application_url: text(),
	overview: text(),
	eligibility_text: text(),
	academic_requirement_text: text(),
	language_requirement_text: text(),
	scholarship_notes: text(),
	accommodation_notes: text(),
	insurance_notes: text(),
	visa_notes: text(),
	contact_email: text(),
	contact_phone: text(),
	source_url: text(),
	source_label: text(),
	source_published_on: date({ mode: 'string' }),
	created_at: timestamp({ mode: 'string' }).defaultNow(),
	updated_at: timestamp({ mode: 'string' }).defaultNow(),
}, (table) => [
	unique("uniq_university_admission_track").on(table.university_id, table.academic_year, table.degree_level, table.track_code, table.teaching_language),
	index("idx_university_admission_tracks_lookup").using("btree", table.university_id.asc().nullsLast().op("uuid_ops"), table.academic_year.asc().nullsLast().op("int4_ops"), table.degree_level.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.university_id],
			foreignColumns: [universities.id],
			name: "university_admission_tracks_university_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.primary_source_document_id],
			foreignColumns: [source_documents.id],
			name: "university_admission_tracks_primary_source_document_id_fkey"
		}).onDelete("set null"),
]);

export const university_admission_events = pgTable("university_admission_events", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	admission_track_id: uuid().notNull(),
	event_type: text().notNull(),
	label: text().notNull(),
	starts_at: timestamp({ mode: 'string' }),
	ends_at: timestamp({ mode: 'string' }),
	date_note: text(),
	sort_order: integer().default(0).notNull(),
	created_at: timestamp({ mode: 'string' }).defaultNow(),
}, (table) => [
	index("idx_university_admission_events_track").using("btree", table.admission_track_id.asc().nullsLast().op("uuid_ops"), table.sort_order.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.admission_track_id],
			foreignColumns: [university_admission_tracks.id],
			name: "university_admission_events_admission_track_id_fkey"
		}).onDelete("cascade"),
]);

export const university_admission_documents = pgTable("university_admission_documents", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	admission_track_id: uuid().notNull(),
	label: text().notNull(),
	description: text(),
	required: boolean().default(true).notNull(),
	sort_order: integer().default(0).notNull(),
	created_at: timestamp({ mode: 'string' }).defaultNow(),
}, (table) => [
	index("idx_university_admission_documents_track").using("btree", table.admission_track_id.asc().nullsLast().op("uuid_ops"), table.sort_order.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.admission_track_id],
			foreignColumns: [university_admission_tracks.id],
			name: "university_admission_documents_admission_track_id_fkey"
		}).onDelete("cascade"),
]);

export const university_scholarships = pgTable("university_scholarships", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	university_id: uuid().notNull(),
	academic_year: integer(),
	degree_level: text(),
	name: text().notNull(),
	coverage: text(),
	application_method: text(),
	eligibility: text(),
	notes: text(),
	source_url: text(),
	source_label: text(),
	source_published_on: date({ mode: 'string' }),
	sort_order: integer().default(0).notNull(),
	created_at: timestamp({ mode: 'string' }).defaultNow(),
	updated_at: timestamp({ mode: 'string' }).defaultNow(),
}, (table) => [
	index("idx_university_scholarships_lookup").using("btree", table.university_id.asc().nullsLast().op("uuid_ops"), table.academic_year.asc().nullsLast().op("int4_ops"), table.sort_order.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.university_id],
			foreignColumns: [universities.id],
			name: "university_scholarships_university_id_fkey"
		}).onDelete("cascade"),
]);
