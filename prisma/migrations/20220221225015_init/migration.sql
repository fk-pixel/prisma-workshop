-- CreateTable
CREATE TABLE "Reporter" (
    "reporterid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reporter" TEXT
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Question" (
    "questionid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "surveyid" INTEGER,
    "question" TEXT,
    "answer" TEXT,
    "reporterid" INTEGER,
    CONSTRAINT "Question_surveyid_fkey" FOREIGN KEY ("surveyid") REFERENCES "Survey" ("surveyid") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Question_reporterid_fkey" FOREIGN KEY ("reporterid") REFERENCES "Reporter" ("reporterid") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Question" ("answer", "question", "questionid", "surveyid") SELECT "answer", "question", "questionid", "surveyid" FROM "Question";
DROP TABLE "Question";
ALTER TABLE "new_Question" RENAME TO "Question";
CREATE TABLE "new_Survey" (
    "surveyid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "creatorid" INTEGER,
    "reporterid" INTEGER,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Survey_creatorid_fkey" FOREIGN KEY ("creatorid") REFERENCES "User" ("userId") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Survey_reporterid_fkey" FOREIGN KEY ("reporterid") REFERENCES "Reporter" ("reporterid") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Survey" ("createdAt", "creatorid", "published", "surveyid", "title", "updatedAt") SELECT "createdAt", "creatorid", "published", "surveyid", "title", "updatedAt" FROM "Survey";
DROP TABLE "Survey";
ALTER TABLE "new_Survey" RENAME TO "Survey";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
