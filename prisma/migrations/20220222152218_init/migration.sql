/*
  Warnings:

  - You are about to drop the column `reporterid` on the `Survey` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_surveyByReporter" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Reporter" ("reporterid") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "Survey" ("surveyid") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Survey" (
    "surveyid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "creatorid" INTEGER,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Survey_creatorid_fkey" FOREIGN KEY ("creatorid") REFERENCES "User" ("userId") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Survey" ("createdAt", "creatorid", "published", "surveyid", "title", "updatedAt") SELECT "createdAt", "creatorid", "published", "surveyid", "title", "updatedAt" FROM "Survey";
DROP TABLE "Survey";
ALTER TABLE "new_Survey" RENAME TO "Survey";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_surveyByReporter_AB_unique" ON "_surveyByReporter"("A", "B");

-- CreateIndex
CREATE INDEX "_surveyByReporter_B_index" ON "_surveyByReporter"("B");
