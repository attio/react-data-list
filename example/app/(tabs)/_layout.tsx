import type {BottomTabNavigationOptions} from "@react-navigation/bottom-tabs"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import {Tabs} from "expo-router"
import * as React from "react"

import {useNavigationBottomTabTheme} from "../../src/navigation/use-navigation-bottom-tab-theme"

const NO_HEADER_SCREEN_OPTIONS = {
    headerShown: false,
} satisfies BottomTabNavigationOptions

export default function TabLayout() {
    const bottomTabTheme = useNavigationBottomTabTheme()
    const innerScreenOptions = React.useMemo(
        () =>
            ({
                ...NO_HEADER_SCREEN_OPTIONS,
                ...bottomTabTheme.options,
            }) satisfies BottomTabNavigationOptions,
        [bottomTabTheme.options]
    )

    return (
        <Tabs screenOptions={innerScreenOptions} initialRouteName="index">
            <Tabs.Screen
                name="index"
                options={{
                    title: "Basic",
                    tabBarIcon: ({color, size}) => (
                        <FontAwesome size={size} name="home" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="fetchable"
                options={{
                    title: "Fetchable",
                    tabBarIcon: ({color, size}) => (
                        <FontAwesome size={size} name="code" color={color} />
                    ),
                }}
            />
        </Tabs>
    )
}
