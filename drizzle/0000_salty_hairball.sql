-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "universities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"name_en" text,
	"region" text NOT NULL,
	"city" text,
	"address" text,
	"type" text,
	"website" text,
	"established_year" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "classifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "classifications_code_key" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "university_classifications" (
	"university_id" uuid NOT NULL,
	"classification_id" uuid NOT NULL,
	CONSTRAINT "university_classifications_pkey" PRIMARY KEY("university_id","classification_id")
);
--> statement-breakpoint
ALTER TABLE "university_classifications" ADD CONSTRAINT "university_classifications_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "public"."universities"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "university_classifications" ADD CONSTRAINT "university_classifications_classification_id_fkey" FOREIGN KEY ("classification_id") REFERENCES "public"."classifications"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_universities_region" ON "universities" USING btree ("region" text_ops);--> statement-breakpoint
CREATE INDEX "idx_university_classifications_university" ON "university_classifications" USING btree ("university_id" uuid_ops);
*/