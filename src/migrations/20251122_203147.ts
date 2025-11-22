import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
   ALTER TABLE "about" DROP CONSTRAINT "about_page_id_pages_id_fk";
  
  ALTER TABLE "_about_v" DROP CONSTRAINT "_about_v_version_page_id_pages_id_fk";
  
  DROP INDEX IF EXISTS "about_page_idx";
  DROP INDEX IF EXISTS "_about_v_version_version_page_idx";
  ALTER TABLE "about" DROP COLUMN IF EXISTS "page_id";
  ALTER TABLE "_about_v" DROP COLUMN IF EXISTS "version_page_id";`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
   ALTER TABLE "about" ADD COLUMN "page_id" integer;
  ALTER TABLE "_about_v" ADD COLUMN "version_page_id" integer;
  DO $$ BEGIN
   ALTER TABLE "about" ADD CONSTRAINT "about_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_about_v" ADD CONSTRAINT "_about_v_version_page_id_pages_id_fk" FOREIGN KEY ("version_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "about_page_idx" ON "about" USING btree ("page_id");
  CREATE INDEX IF NOT EXISTS "_about_v_version_version_page_idx" ON "_about_v" USING btree ("version_page_id");`);
}
