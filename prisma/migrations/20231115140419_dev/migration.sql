-- DropForeignKey
ALTER TABLE "bugs" DROP CONSTRAINT "bugs_project_id_fkey";

-- DropForeignKey
ALTER TABLE "member_project" DROP CONSTRAINT "member_project_project_id_fkey";

-- AddForeignKey
ALTER TABLE "member_project" ADD CONSTRAINT "member_project_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bugs" ADD CONSTRAINT "bugs_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
