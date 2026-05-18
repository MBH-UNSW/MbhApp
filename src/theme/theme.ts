export const theme = {
    // temp placeholders till business team confirms final colours
    colours: {
        ubhRed: {
            0: '#fbeeee',
            1: '#f1dada',
            2: '#e6b0b0',
            3: '#dd8383',
            4: '#d55f5d',
            5: '#d04845',
            6: '#cf3c38',
            7: '#b72f2b',
            8: '#a42825',
            9: '#941f1f',
        },

        ubhBlue: {
            0: '#edf2f7',
            1: '#e6f0fa',
            2: '#c8ddf3',
            3: '#aacaec',
            4: '#8eb8e5',
            5: '#6fa4dd',
            6: '#5292d6',
            7: '#337ecf',
            8: '#146ac7',
            9: '#0056b3',
        },

        neutral: {
            0: '#ffffff',
            1: '#fafafa',
            2: '#f2f2f2',
            3: '#d9d9d9',
            4: '#c9c9c9',
            5: '#bdbdbd',
            6: '#a0a0a0',
            7: '#999999',
            8: '#727272',
            9: '#393939',
        },

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

    semantic: {
        background: '#ffffff',
        surface: '#ffffff',
        surfaceMuted: '#f2f2f2',

        textPrimary: '#393939',
        textSecondary: '#727272',
        textMuted: '#999999',

        border: '#999999',
        borderFocused: '#337ecf',

        primary: '#941f1f',
        secondary: '#0056b3',
    },

    spacing: {
        xxxs: 2,
        xxs: 4,
        xs: 8,
        sm: 12,
        md: 16,
        lg: 24,
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