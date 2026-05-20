import { relations } from "drizzle-orm/relations";
import { universities, university_classifications, classifications } from "./schema";

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
}));

export const classificationsRelations = relations(classifications, ({many}) => ({
	university_classifications: many(university_classifications),
}));