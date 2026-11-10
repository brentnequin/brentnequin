CREATE TABLE "MovieVote" (
    "movieId" INTEGER NOT NULL,
    "voterIdHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MovieVote_pkey" PRIMARY KEY ("movieId", "voterIdHash")
);

ALTER TABLE "MovieVote"
ADD CONSTRAINT "MovieVote_movieId_fkey"
FOREIGN KEY ("movieId") REFERENCES "Movie"("id")
ON DELETE CASCADE ON UPDATE CASCADE;
