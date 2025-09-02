import {ThemeProvider as RestyleThemeProvider} from "@shopify/restyle"
import {StatusBar, type StatusBarStyle} from "expo-status-bar"
import {useColorScheme} from "react-native"

import {darkTheme} from "./dark-theme"
import {useLoadFontInter} from "./fonts/inter/use-load-font-inter"
import {lightTheme} from "./light-theme"

type ThemeVariant = "light" | "dark"
export type Theme = typeof lightTheme | typeof darkTheme

function getTheme(theme: ThemeVariant) {
    switch (theme) {
        case "light": {
            return lightTheme
        }

        case "dark": {
            return darkTheme
        }
    }
}

function getStatusBarStyle(theme: ThemeVariant): StatusBarStyle {
    switch (theme) {
        case "light": {
            return "dark"
        }

        case "dark": {
            return "light"
        }
    }
}

interface ThemeProviderProps extends React.PropsWithChildren {
    fontsError: React.ReactNode
    fontsPending: React.ReactNode
}

export function ThemeProvider({children, fontsError, fontsPending}: ThemeProviderProps) {
    const [fontsLoaded, fontError] = useLoadFontInter()
    const colorScheme = useColorScheme() ?? "light"

    return (
        <RestyleThemeProvider theme={getTheme(colorScheme)}>
            <StatusBar style={getStatusBarStyle(colorScheme)} />
            {fontError ? fontsError : fontsLoaded ? children : fontsPending}
        </RestyleThemeProvider>
    )
}
