CREATE TABLE IF NOT EXISTS "exercises" (
	"id" uuid PRIMARY KEY NOT NULL,
	"userid" text NOT NULL,
	"max_weight" double precision NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
DROP TABLE "profile";