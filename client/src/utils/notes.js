// convert note to scale degree
const noteToScaleDegree = (note) => {
    switch (note) {
        case 0 :
            return '1'
        case 1 :
            return 'b2'
        case 2 :
            return '2'
        case 3 :
            return 'b3'
        case 4 :
            return '3'
        case 5 :
            return '4'
        case 6 :
            return 'b5'
        case 7 :
            return '5'
        case 8 :
            return 'b6'
        case 9 :
            return '6'
        case 10 :
            return 'b7'
        case 11 : 
            return '7'
        default :
            return null
    }
}

// convert note to solfege
const noteToSolfege = (note) => {
    switch (note) {
        case 0 :
            return 'do'
        case 1 :
            return 'ra'
        case 2 :
            return 're'
        case 3 :
            return 'me'
        case 4 :
            return 'mi'
        case 5 :
            return 'fa'
        case 6 :
            return 'se'
        case 7 :
            return 'so'
        case 8 :
            return 'le'
        case 9 :
            return 'la'
        case 10 :
            return 'te'
        case 11 : 
            return 'ti'
        default :
            return null
    }
}

export {
    noteToScaleDegree,
    noteToSolfege,
}