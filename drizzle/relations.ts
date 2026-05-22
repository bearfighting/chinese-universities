import { relations } from "drizzle-orm/relations";
import { universities, university_classifications, classifications, source_documents, university_profiles, university_admission_tracks, university_admission_events, university_admission_documents, university_scholarships } from "./schema";

export const university_classificationsRelations = relations(university_classifications, ({one}) => ({
	university: one(universities, {
		fields: [university_classifications.university_id],
		references: [universities.id]
	}),
	classification: one(classifications, {
		fields: [university_classifications.classification_id],
		references: [classifications.id]
	}),
}));

export const universitiesRelations = relations(universities, ({many}) => ({
	university_classifications: many(university_classifications),
	source_documents: many(source_documents),
	university_profiles: many(university_profiles),
	university_admission_tracks: many(university_admission_tracks),
	university_scholarships: many(university_scholarships),
}));

export const classificationsRelations = relations(classifications, ({many}) => ({
	university_classifications: many(university_classifications),
}));

export const source_documentsRelations = relations(source_documents, ({one, many}) => ({
	university: one(universities, {
		fields: [source_documents.university_id],
		references: [universities.id]
	}),
	university_admission_tracks: many(university_admission_tracks),
}));

export const university_profilesRelations = relations(university_profiles, ({one}) => ({
	university: one(universities, {
		fields: [university_profiles.university_id],
		references: [universities.id]
	}),
}));

export const university_admission_tracksRelations = relations(university_admission_tracks, ({one, many}) => ({
	university: one(universities, {
		fields: [university_admission_tracks.university_id],
		references: [universities.id]
	}),
	primary_source_document: one(source_documents, {
		fields: [university_admission_tracks.primary_source_document_id],
		references: [source_documents.id]
	}),
	university_admission_events: many(university_admission_events),
	university_admission_documents: many(university_admission_documents),
}));

export const university_admission_eventsRelations = relations(university_admission_events, ({one}) => ({
	university_admission_track: one(university_admission_tracks, {
		fields: [university_admission_events.admission_track_id],
		references: [university_admission_tracks.id]
	}),
}));

export const university_admission_documentsRelations = relations(university_admission_documents, ({one}) => ({
	university_admission_track: one(university_admission_tracks, {
		fields: [university_admission_documents.admission_track_id],
		references: [university_admission_tracks.id]
	}),
}));

export const university_scholarshipsRelations = relations(university_scholarships, ({one}) => ({
	university: one(universities, {
		fields: [university_scholarships.university_id],
		references: [universities.id]
	}),
}));
