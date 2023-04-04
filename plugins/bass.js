export default (context, inject) => {

    const CHORD_REGEX = /\[([A-G]{1}[b#♭♯]*)(\/|M|Δ|[Mm]aj|m|[Mm]in|‑|[Dd]im|°|ø|[Aa]ug|\+|[Ss]usp?|[Aa]dd)?(\d|[A-G]{1}[b#♭♯]*)?\]/g;

    const bass = (content, steps) => {
        
        const result = content.replace(CHORD_REGEX, function (full_match, $1, $2, $3) {

            return '[' + ($2 == '/' ? $3 : $1) + ']'
        });

        return result
    }
    

    inject('bass', bass)
    context.$bass = bass
  }