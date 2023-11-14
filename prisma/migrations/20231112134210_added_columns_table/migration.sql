/*
  Warnings:

  - Added the required column `order_in_column` to the `bugs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bugs" ADD COLUMN     "column_id" INTEGER,
ADD COLUMN     "order_in_column" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "project_columns" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "project_id" INTEGER NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "project_columns_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bugs" ADD CONSTRAINT "bugs_column_id_fkey" FOREIGN KEY ("column_id") REFERENCES "project_columns"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_columns" ADD CONSTRAINT "project_columns_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
