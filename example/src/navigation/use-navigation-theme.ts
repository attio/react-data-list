import type {Theme as NavigationTheme} from "@react-navigation/native"
import {useTheme} from "@shopify/restyle"
import {colord} from "colord"
import * as React from "react"

import type {Theme} from "../style/theme-provider"
import {getFontFamilyInter} from "../style/fonts/inter/get-font-family-inter"

export function useNavigationTheme() {
    const theme = useTheme<Theme>()

    return React.useMemo(
        () =>
            ({
                dark: colord(theme.colors.bgPrimary).luminance() < 0.5,
                colors: {
                    primary: theme.colors.bgPrimary,
                    background: theme.colors.bgPrimary,
                    card: theme.colors.bgPrimary,
                    text: theme.colors.textPrimary,
                    border: theme.colors.strokePrimary,
                    notification: theme.colors.accent,
                },
                fonts: {
                    regular: {
                        fontFamily: getFontFamilyInter("regular"),
                        fontWeight: "400",
                    },
                    medium: {
                        fontFamily: getFontFamilyInter("medium"),
                        fontWeight: "500",
                    },
                    bold: {
                        fontFamily: getFontFamilyInter("bold"),
                        fontWeight: "700",
                    },
                    heavy: {
                        fontFamily: getFontFamilyInter("heavy"),
                        fontWeight: "900",
                    },
                },
            }) satisfies NavigationTheme,
        [theme]
    )
}
