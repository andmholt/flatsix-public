const getUserDefault = () => {
    return {
        // needs to load flag. Once user is loaded, this flag does not exist
        needsToLoad: true,

        username: null,

        // levels
        levels: {
            overall: {
                level: 1,
                progress: 0,
            },
            notes: {
                level: 1,
                progress: 0,
            },
            chords: {
                level: 1,
                progress: 0,
            },
            rhythm: {
                level: 1,
                progress: 0,
            },
        },

        // progress
        progress: {
            notes: {
                notes: [],
                num: null,
            },
            chords: {
                intervals: [],
                chords: [],
            },
            rhythm: {
                lengths: [],
                meters: [],
            },
        },

        // preferences
        preferences: {
            noteNames: 'solfege',
            noteColors: [
                // do
                '#40b', // blue-purple

                // di/ra
                '#808', // purple

                // re
                '#fb0', // yellow-orange

                // ri/me
                '#ff0', // yellow

                // mi
                '#b04', // red-purple

                // fa
                '#8f0', //yellow-green

                // fi/se
                '#0f0', // green

                // so
                '#f00', // red

                // si/le
                '#f40', // red-orange

                // la
                '#088', // blue-green

                // li/te
                '#00f', // blue

                // ti
                '#f80', // orange
            ],
        }
    }
}

export {
    getUserDefault,
}