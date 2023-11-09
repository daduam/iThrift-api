/*
  Warnings:

  - Added the required column `imageUrl` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "items" ADD COLUMN     "imageUrl" TEXT NOT NULL;
