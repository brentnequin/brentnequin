export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()

    // Extract query parameters from the incoming request URL
    const { query } = getQuery(event)

    // Validate that the query exists before hitting TMDB
    if (!query) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing required "query" parameter',
        })
    }

    try {
        // Make the backend request to TMDB
        const response = await $fetch('/search/movie', {
            baseURL: 'https://api.themoviedb.org/3',
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${config.tmdbAccessToken}`
            },
            // Forward the query parameter to TMDB
            query: {
                query: query
            }
        })

        return response
    } catch (error) {
        console.log('Error fetching data from TMDB:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to fetch data from TMDB',
        })
    }
})
