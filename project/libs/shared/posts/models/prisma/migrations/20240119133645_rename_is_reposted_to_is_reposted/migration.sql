/*
  Warnings:

  - You are about to drop the column `isReposted` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "isReposted",
ADD COLUMN     "is_reposted" BOOLEAN NOT NULL DEFAULT false;
