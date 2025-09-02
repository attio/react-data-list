import {colord} from "colord"

import {lightTheme} from "./light-theme"

export const darkTheme = {
    ...lightTheme,
    colors: {
        ...lightTheme.colors,
        accent: "#266DF0",
        bgPrimary: "#1B1D21",
        bgSecondary: "#232529",
        bgTertiary: colord("#232529").lighten(0.05).toHex(),
        strokePrimary: "#313337",
        textOnAccent: "#FFFFFF",
        textBlue: "#538BF3",
        textPrimary: "#EEEFF1",
        textSecondary: "#9FA1A7",
        textTertiary: "#86888D",
        textQuaternary: "#5C5E63",
    },
} satisfies typeof lightTheme
