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
        accent: "#266DF0",
        bgPrimary: "#FFFFFF",
        bgSecondary: "#FBFBFB",
        bgTertiary: "#F4F5F6",
        strokePrimary: "#EEEFF1",
        textOnAccent: "#FFFFFF",
        textBlue: "#407FF2",
        textPrimary: "#232529",
        textSecondary: "#5C5E63",
        textTertiary: "#75777C",
        textQuaternary: "#9FA1A7",
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
