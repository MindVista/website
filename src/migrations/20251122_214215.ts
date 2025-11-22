import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
   ALTER TABLE "about" ADD COLUMN "group_picture_id" integer;
  ALTER TABLE "_about_v" ADD COLUMN "version_group_picture_id" integer;
  DO $$ BEGIN
   ALTER TABLE "about" ADD CONSTRAINT "about_group_picture_id_media_id_fk" FOREIGN KEY ("group_picture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_about_v" ADD CONSTRAINT "_about_v_version_group_picture_id_media_id_fk" FOREIGN KEY ("version_group_picture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "about_group_picture_idx" ON "about" USING btree ("group_picture_id");
  CREATE INDEX IF NOT EXISTS "_about_v_version_version_group_picture_idx" ON "_about_v" USING btree ("version_group_picture_id");`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
   ALTER TABLE "about" DROP CONSTRAINT "about_group_picture_id_media_id_fk";
  
  ALTER TABLE "_about_v" DROP CONSTRAINT "_about_v_version_group_picture_id_media_id_fk";
  
  DROP INDEX IF EXISTS "about_group_picture_idx";
  DROP INDEX IF EXISTS "_about_v_version_version_group_picture_idx";
  ALTER TABLE "about" DROP COLUMN IF EXISTS "group_picture_id";
  ALTER TABLE "_about_v" DROP COLUMN IF EXISTS "version_group_picture_id";`);
}
