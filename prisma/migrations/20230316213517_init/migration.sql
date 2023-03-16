/*
  Warnings:

  - You are about to drop the `UserList` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_posts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserList" DROP CONSTRAINT "UserList_communityId_fkey";

-- DropForeignKey
ALTER TABLE "UserList" DROP CONSTRAINT "UserList_userId_fkey";

-- DropForeignKey
ALTER TABLE "_posts" DROP CONSTRAINT "_posts_A_fkey";

-- DropForeignKey
ALTER TABLE "_posts" DROP CONSTRAINT "_posts_B_fkey";

-- DropTable
DROP TABLE "UserList";

-- DropTable
DROP TABLE "_posts";

-- CreateTable
CREATE TABLE "_communityPosts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_userPosts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_communityPosts_AB_unique" ON "_communityPosts"("A", "B");

-- CreateIndex
CREATE INDEX "_communityPosts_B_index" ON "_communityPosts"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_userPosts_AB_unique" ON "_userPosts"("A", "B");

-- CreateIndex
CREATE INDEX "_userPosts_B_index" ON "_userPosts"("B");

-- AddForeignKey
ALTER TABLE "_communityPosts" ADD CONSTRAINT "_communityPosts_A_fkey" FOREIGN KEY ("A") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_communityPosts" ADD CONSTRAINT "_communityPosts_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_userPosts" ADD CONSTRAINT "_userPosts_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_userPosts" ADD CONSTRAINT "_userPosts_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
