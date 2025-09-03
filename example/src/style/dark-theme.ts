import {colord} from "colord"

import {lightTheme} from "./light-theme"

export const darkTheme = {
    ...lightTheme,
    colors: {
        ...lightTheme.colors,
        accent: "#D4AF37",
        bgPrimary: "#0F0F0F",
        bgSecondary: "#1A1A1A",
        bgTertiary: colord("#1A1A1A").lighten(0.05).toHex(),
        strokePrimary: "#2D2D2D",
        textOnAccent: "#000000",
        textBlue: "#4A90E2",
        textPrimary: "#F5F5DC",
        textSecondary: "#B8860B",
        textTertiary: "#8B7355",
        textQuaternary: "#696969",
    },
} satisfies typeof lightTheme
