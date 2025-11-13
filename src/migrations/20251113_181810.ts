import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
   CREATE TYPE "public"."enum_about_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__about_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE IF NOT EXISTS "about_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"team" varchar,
  	"pronouns" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "about" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"page_id" integer,
  	"_status" "enum_about_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "_about_v_version_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"team" varchar,
  	"pronouns" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_about_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_page_id" integer,
  	"version__status" "enum__about_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  DO $$ BEGIN
   ALTER TABLE "about_team_members" ADD CONSTRAINT "about_team_members_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_team_members" ADD CONSTRAINT "about_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about" ADD CONSTRAINT "about_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_about_v_version_team_members" ADD CONSTRAINT "_about_v_version_team_members_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_about_v_version_team_members" ADD CONSTRAINT "_about_v_version_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_about_v" ADD CONSTRAINT "_about_v_version_page_id_pages_id_fk" FOREIGN KEY ("version_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "about_team_members_order_idx" ON "about_team_members" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "about_team_members_parent_id_idx" ON "about_team_members" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "about_team_members_image_idx" ON "about_team_members" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "about_page_idx" ON "about" USING btree ("page_id");
  CREATE INDEX IF NOT EXISTS "about__status_idx" ON "about" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "_about_v_version_team_members_order_idx" ON "_about_v_version_team_members" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_about_v_version_team_members_parent_id_idx" ON "_about_v_version_team_members" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_about_v_version_team_members_image_idx" ON "_about_v_version_team_members" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_about_v_version_version_page_idx" ON "_about_v" USING btree ("version_page_id");
  CREATE INDEX IF NOT EXISTS "_about_v_version_version__status_idx" ON "_about_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_about_v_created_at_idx" ON "_about_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_about_v_updated_at_idx" ON "_about_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_about_v_latest_idx" ON "_about_v" USING btree ("latest");`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
   DROP TABLE "about_team_members" CASCADE;
  DROP TABLE "about" CASCADE;
  DROP TABLE "_about_v_version_team_members" CASCADE;
  DROP TABLE "_about_v" CASCADE;
  DROP TYPE "public"."enum_about_status";
  DROP TYPE "public"."enum__about_v_version_status";`);
}
