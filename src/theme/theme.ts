export const theme = {
    colours: {
        ubhRed: {
            0: '#f6d0d0',
            1: '#efb2b2',
            2: '#e68e8e',
            3: '#da6666',
            4: '#be2525',
            5: '#c40904',
            6: '#b10707',
            7: '#a11a1a',
            8: '#941f1f',
            9: '#7d0907',
        },

        ubhBlue: {
            0: '#edf2f7',
            1: '#e6f0fa',
            2: '#d6e6f5',
            3: '#bdd7f0',
            4: '#9fc2e3',
            5: '#689abb',
            6: '#4f8fcb',
            7: '#146ac7',
            8: '#0056b3',
            9: '#023149',
        },

        ubhCream: {
            0: '#fffdf9',
            1: '#fffbf5',
            2: '#fff9ef',
            3: '#fef8ec',
            4: '#fef7ea',
            5: '#fdf6e8',
            6: '#eadfc9',
            7: '#d2c4a6',
            8: '#b6a77f',
            9: '#8f805d',
        },

        ubhNeutral: {
            0: '#ffffff',
            1: '#fafafa',
            2: '#f2f2f2',
            3: '#d9d9d9',
            4: '#c9c9c9',
            5: '#bdbdbd',
            6: '#a0a0a0',
            7: '#999999',
            8: '#727272',
            9: '#141414',
        },
    },

    status: {
        error: {
            text: '#cc0000',
            background: '#fef5f5',
            border: '#e57373',
            shadow: '#941f1f',
        },

        success: {
            text: '#2e7d32',
            backgroundPrimary: '#f8fcf8',
            backgroundSecondary: '#e8f5e8',
            border: '#4caf50',
            shadow: '#2e7d32',
        },
    },

    primaryColor: 'ubhRed',
    primaryShade: 5,
    primaryShadeDark: 9,

    secondaryColor: 'ubhBlue',
    secondaryShade: 5,
    secondaryShadeDark: 9,

    creamColor: 'ubhCream',
    creamShade: 5,

    neutralColor: 'ubhNeutral',
    neutralShadeLight: 0,
    neutralShadeDark: 9,

    defaultRadius: 'sm',

    spacing: {
        xxxs: 2,
        xxs: 4,
        xs: 8,
        sm: 12,
        md: 16,
        lg: 28,
        xl: 32,
    },

    radius: {
        xs: 8,
        sm: 10,
        md: 12,
        lg: 16,
        xl: 18,
        xxl: 24,
    },

    borderWidth: {
        default: 1,
        thick: 2,
    },
} as const;

export type Theme = typeof theme;