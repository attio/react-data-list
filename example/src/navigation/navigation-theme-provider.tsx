import {ThemeProvider} from "@react-navigation/native"
import * as SystemUI from "expo-system-ui"
import * as React from "react"

import {useNavigationTheme} from "./use-navigation-theme"

export function NavigationThemeProvider(props: Required<React.PropsWithChildren>) {
    const navigationTheme = useNavigationTheme()

    React.useEffect(() => {
        SystemUI.setBackgroundColorAsync(navigationTheme.colors.background)
    }, [navigationTheme.colors.background])

    return <ThemeProvider {...props} value={navigationTheme} />
}
