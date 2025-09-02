import type {TextStyle} from "react-native"

export function getFontFamilyInter(fontWeight: NonNullable<TextStyle["fontWeight"]>) {
    switch (fontWeight) {
        case "ultralight":
        case "thin":
        case "100":
        case 100: {
            return "Inter_100Thin"
        }

        case "200":
        case 200: {
            return "Inter_200ExtraLight"
        }

        case "light":
        case "300":
        case 300: {
            return "Inter_300Light"
        }

        case "normal":
        case "regular":
        case "400":
        case 400: {
            return "Inter_400Regular"
        }

        case "medium":
        case "500":
        case 500: {
            return "Inter_500Medium"
        }

        case "semibold":
        case "600":
        case 600: {
            return "Inter_600SemiBold"
        }

        case "bold":
        case "700":
        case 700: {
            return "Inter_700Bold"
        }

        case "condensed":
        case "condensedBold":
        case "800":
        case 800: {
            return "Inter_800ExtraBold"
        }

        case "black":
        case "heavy":
        case "900":
        case 900: {
            return "Inter_900Black"
        }
    }
}
