BEGIN;

LOCK TABLE "MovieVote" IN SHARE ROW EXCLUSIVE MODE;

WITH recommendation_counts AS (
    SELECT "movieId", COUNT(*)::INTEGER AS recommendation_count
    FROM "MovieRecommendation"
    GROUP BY "movieId"
),
vote_counts AS (
    SELECT "movieId", COUNT(*)::INTEGER AS vote_count
    FROM "MovieVote"
    GROUP BY "movieId"
)
INSERT INTO "MovieVote" ("movieId", "voterIdHash")
SELECT
    recommendations."movieId",
    md5('legacy-movie-vote:' || recommendations."movieId" || ':' || legacy_vote.vote_number)
        || md5('legacy-movie-vote-v2:' || recommendations."movieId" || ':' || legacy_vote.vote_number)
FROM recommendation_counts AS recommendations
LEFT JOIN vote_counts AS votes
    ON votes."movieId" = recommendations."movieId"
CROSS JOIN LATERAL generate_series(
    1,
    GREATEST(recommendations.recommendation_count - COALESCE(votes.vote_count, 0), 0)
) AS legacy_vote(vote_number)
ON CONFLICT ("movieId", "voterIdHash") DO NOTHING;

COMMIT;
