import { setMovieVote } from '../../../utils/movieVote'

export default defineEventHandler(event => setMovieVote(event, false))
