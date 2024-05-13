/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "totalSold" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "User";
