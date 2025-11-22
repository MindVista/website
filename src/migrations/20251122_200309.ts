import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "about_teams_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"pronouns" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "about_teams" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"team_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_about_v_version_teams_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"pronouns" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_about_v_version_teams" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"team_name" varchar,
  	"_uuid" varchar
  );
  
  DROP TABLE "about_team_members" CASCADE;
  DROP TABLE "_about_v_version_team_members" CASCADE;
  DO $$ BEGIN
   ALTER TABLE "about_teams_members" ADD CONSTRAINT "about_teams_members_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_teams_members" ADD CONSTRAINT "about_teams_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_teams"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_teams" ADD CONSTRAINT "about_teams_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_about_v_version_teams_members" ADD CONSTRAINT "_about_v_version_teams_members_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_about_v_version_teams_members" ADD CONSTRAINT "_about_v_version_teams_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_v_version_teams"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_about_v_version_teams" ADD CONSTRAINT "_about_v_version_teams_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "about_teams_members_order_idx" ON "about_teams_members" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "about_teams_members_parent_id_idx" ON "about_teams_members" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "about_teams_members_image_idx" ON "about_teams_members" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "about_teams_order_idx" ON "about_teams" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "about_teams_parent_id_idx" ON "about_teams" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_about_v_version_teams_members_order_idx" ON "_about_v_version_teams_members" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_about_v_version_teams_members_parent_id_idx" ON "_about_v_version_teams_members" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_about_v_version_teams_members_image_idx" ON "_about_v_version_teams_members" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_about_v_version_teams_order_idx" ON "_about_v_version_teams" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_about_v_version_teams_parent_id_idx" ON "_about_v_version_teams" USING btree ("_parent_id");`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
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
  
  DROP TABLE "about_teams_members" CASCADE;
  DROP TABLE "about_teams" CASCADE;
  DROP TABLE "_about_v_version_teams_members" CASCADE;
  DROP TABLE "_about_v_version_teams" CASCADE;
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
   ALTER TABLE "_about_v_version_team_members" ADD CONSTRAINT "_about_v_version_team_members_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_about_v_version_team_members" ADD CONSTRAINT "_about_v_version_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "about_team_members_order_idx" ON "about_team_members" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "about_team_members_parent_id_idx" ON "about_team_members" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "about_team_members_image_idx" ON "about_team_members" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_about_v_version_team_members_order_idx" ON "_about_v_version_team_members" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_about_v_version_team_members_parent_id_idx" ON "_about_v_version_team_members" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_about_v_version_team_members_image_idx" ON "_about_v_version_team_members" USING btree ("image_id");`);
}
