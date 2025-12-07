/*
  Warnings:

  - You are about to drop the column `rollNo` on the `Student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[usn]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `section` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usn` to the `Student` table without a default value. This is not possible if the table is not empty.

*/

-- Delete all existing students and responses first
DELETE FROM "Response" WHERE "studentId" IS NOT NULL;
DELETE FROM "Student";

-- DropIndex
DROP INDEX "Student_rollNo_idx";

-- DropIndex
DROP INDEX "Student_rollNo_key";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "rollNo",
ADD COLUMN     "section" TEXT NOT NULL,
ADD COLUMN     "usn" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Student_usn_key" ON "Student"("usn");

-- CreateIndex
CREATE INDEX "Student_usn_idx" ON "Student"("usn");

-- CreateIndex
CREATE INDEX "Student_section_idx" ON "Student"("section");
