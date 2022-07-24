// returns level color given level number
const getLevelColor = (level) => {
    switch (level) {
        case 1 :
            return '#999'
        case 2 :
            return '#fff'
        case 3 :
            return '#0c0'
        case 4 :
            return '#06f'
        case 5 :
            return '#93f'
        case 6 :
            return '#ff3'
        case 7 :
            return '#f93'
        case 8 :
            return '#f6c'
        case 9 :
            return '#603'
        case 10 :
            return '#000'
        case 11 : case 12 : case 13 : case 14 : case 15 :
            return '#630'
        case 16 : case 17 : case 18 : case 19 : case 20 :
            return '#666'
        case 21 : case 22 : case 23 : case 24 : case 25 :
            return '#c90'
        default :
            return
    }
}

export {
    getLevelColor,
}