/*
  Warnings:

  - You are about to drop the column `commentsCount` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `originalPostId` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "commentsCount",
DROP COLUMN "originalPostId",
ADD COLUMN     "comments_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "original_post_id" TEXT;
