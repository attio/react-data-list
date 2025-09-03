import type {TextStyle} from "react-native"
import {createTheme} from "@shopify/restyle"

import {getFontFamilyInter} from "./fonts/inter/get-font-family-inter"

interface CreateInterFontConfig {
    fontSize: NonNullable<TextStyle["fontSize"]>
    lineHeight: NonNullable<TextStyle["lineHeight"]>
    fontWeight: NonNullable<TextStyle["fontWeight"]>
}
function createInterFont(config: CreateInterFontConfig) {
    return {
        fontFamily: getFontFamilyInter(config.fontWeight),
        fontSize: config.fontSize,
        lineHeight: config.lineHeight,
        fontWeight: config.fontWeight,
    }
}

const lightTheme = createTheme({
    colors: {
        accent: "#B8860B",
        bgPrimary: "#F5F5DC",
        bgSecondary: "#F0E68C",
        bgTertiary: "#DEB887",
        strokePrimary: "#D2B48C",
        textOnAccent: "#FFFFFF",
        textBlue: "#4682B4",
        textPrimary: "#2F4F4F",
        textSecondary: "#556B2F",
        textTertiary: "#8B7355",
        textQuaternary: "#A0522D",
    },
    spacing: {
        "2": 2,
        "4": 4,
        "6": 6,
        "8": 8,
        "10": 10,
        "12": 12,
        "16": 16,
        "20": 20,
        "24": 24,
        "28": 28,
        "32": 32,
        "36": 36,
        "40": 40,
        "48": 48,
        "64": 64,
        "72": 72,
        "96": 96,
        "128": 128,
    },
    borderRadii: {
        "2": 2,
        "4": 4,
        "6": 6,
        "8": 8,
        "10": 10,
        "12": 12,
        "14": 14,
        "16": 16,
        "20": 20,
    },
    textVariants: {
        caption: createInterFont({
            fontSize: 12,
            lineHeight: 18,
            fontWeight: "500",
        }),
        title: createInterFont({
            fontSize: 20,
            lineHeight: 24,
            fontWeight: "600",
        }),
        titleLarge: createInterFont({
            fontSize: 22,
            lineHeight: 28,
            fontWeight: "600",
        }),
        titleExtraLarge: createInterFont({
            fontSize: 32,
            lineHeight: 36,
            fontWeight: "600",
        }),
        body: createInterFont({
            fontSize: 15,
            lineHeight: 22,
            fontWeight: "500",
        }),
        small: createInterFont({
            fontSize: 12,
            lineHeight: 18,
            fontWeight: "500",
        }),
        medium: createInterFont({
            fontSize: 15,
            lineHeight: 22,
            fontWeight: "500",
        }),
        large: createInterFont({
            fontSize: 18,
            lineHeight: 24,
            fontWeight: "500",
        }),
        defaults: createInterFont({
            fontSize: 15,
            lineHeight: 22,
            fontWeight: "500",
        }),
    },
})

export {lightTheme}
