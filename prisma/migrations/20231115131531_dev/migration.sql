-- DropForeignKey
ALTER TABLE "project_columns" DROP CONSTRAINT "project_columns_project_id_fkey";

-- CreateTable
CREATE TABLE "project_invitations" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "url" TEXT NOT NULL,
    "expiration" TIMESTAMP NOT NULL,
    "project_id" INTEGER NOT NULL,

    CONSTRAINT "project_invitations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "project_columns" ADD CONSTRAINT "project_columns_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_invitations" ADD CONSTRAINT "project_invitations_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
