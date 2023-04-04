export default (context, inject) => {

    // https://regex101.com

    const CHROMATIC_SEQUENCE_SHARPS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B']
    const CHROMATIC_SEQUENCE_FLATS =  ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']

    const CHORD_REGEX = /\[([A-G]{1}[b#♭♯]*)(\/|M|Δ|[Mm]aj|m|[Mm]in|‑|[Dd]im|°|ø|[Aa]ug|\+|[Ss]usp?|[Aa]dd)?(\d|[A-G]{1}[b#♭♯]*)?\]/g;

    const transpose = (content, steps) => {

        const result = content.replace(CHORD_REGEX, function (full_match, $1, $2, $3) {

        // $1: note + b|#|etc
        // $2: '/' or maj|dim|m|etc
        // $3: if $2=='/': bass note, otherwise 7|etc
        
        var new_note = CHROMATIC_SEQUENCE_SHARPS[(((CHROMATIC_SEQUENCE_SHARPS.indexOf($1) + steps) % CHROMATIC_SEQUENCE_SHARPS.length) + CHROMATIC_SEQUENCE_SHARPS.length) % CHROMATIC_SEQUENCE_SHARPS.length]

        if ($2 === '/') {
            var new_bass_note = CHROMATIC_SEQUENCE_SHARPS[(((CHROMATIC_SEQUENCE_SHARPS.indexOf($3) + steps) % CHROMATIC_SEQUENCE_SHARPS.length) + CHROMATIC_SEQUENCE_SHARPS.length) % CHROMATIC_SEQUENCE_SHARPS.length]
            return '[' + new_note + '/' + new_bass_note + ']'
        } else {
            return '[' + new_note + ($2 || '') + ($3 || '') + ']'
        }
      });

      return result
    }
    

    inject('transpose', transpose)
    context.$transpose = transpose
  }