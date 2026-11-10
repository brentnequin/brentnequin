CREATE TABLE "MovieViewing" (
    "id" SERIAL NOT NULL,
    "watchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reaction" TEXT,
    "movieId" INTEGER NOT NULL,

    CONSTRAINT "MovieViewing_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "MovieViewing"
ADD CONSTRAINT "MovieViewing_movieId_fkey"
FOREIGN KEY ("movieId") REFERENCES "Movie"("id")
ON DELETE CASCADE ON UPDATE CASCADE;
