import "../src/style/boot-colord"

import type {ViewStyle} from "react-native"
import {useReactNavigationDevTools} from "@dev-plugins/react-navigation"
import {Slot, useNavigationContainerRef} from "expo-router"
import {GestureHandlerRootView} from "react-native-gesture-handler"

import {NavigationThemeProvider} from "../src/navigation/navigation-theme-provider"
import {ThemeProvider} from "../src/style/theme-provider"

const ROOT_STYLE = {flex: 1} satisfies ViewStyle

export default function RootLayout() {
    const navigationRef = useNavigationContainerRef()

    // biome-ignore lint/suspicious/noExplicitAny: TODO: https://github.com/expo/dev-plugins/issues/70
    useReactNavigationDevTools(navigationRef as any)

    return (
        <GestureHandlerRootView style={ROOT_STYLE}>
            <ThemeProvider fontsError={null} fontsPending={null}>
                <NavigationThemeProvider>
                    <Slot />
                </NavigationThemeProvider>
            </ThemeProvider>
        </GestureHandlerRootView>
    )
}
