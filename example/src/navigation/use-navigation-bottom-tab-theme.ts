import type {BottomTabNavigationOptions} from "@react-navigation/bottom-tabs"
import * as React from "react"
import {Platform} from "react-native"
import {type EdgeInsets, useSafeAreaInsets} from "react-native-safe-area-context"

import {useTheme} from "../style/use-theme"

const ITEM_VERTICAL_OFFSET = 5
const BOTTOM_TAB_HEIGHT = 57 - ITEM_VERTICAL_OFFSET
const BOTTOM_TAB_ICON_LABEL_SPACE = 4
export const BOTTOM_TAB_ICON_SIZE = 24

// Overrides for:
// https://github.com/react-navigation/react-navigation/blob/main/packages/bottom-tabs/src/views/BottomTabBar.tsx
const getPaddingBottom = (insets: EdgeInsets) =>
    Math.max(insets.bottom - Platform.select({ios: 4, default: 0}), 16) + ITEM_VERTICAL_OFFSET

export function useNavigationBottomTabTheme() {
    const theme = useTheme()
    const insets = useSafeAreaInsets()
    const paddingBottom = getPaddingBottom(insets)
    const tabBarHeight = BOTTOM_TAB_HEIGHT + paddingBottom

    return React.useMemo(
        () => ({
            height: tabBarHeight,
            options: {
                tabBarStyle: {
                    height: tabBarHeight,
                    paddingHorizontal: theme.spacing[16],
                    paddingBottom,
                },
                tabBarIconStyle: {
                    maxHeight: BOTTOM_TAB_ICON_SIZE + BOTTOM_TAB_ICON_LABEL_SPACE,
                    paddingBottom: BOTTOM_TAB_ICON_LABEL_SPACE,
                },
                tabBarLabelStyle: theme.textVariants.caption,
                tabBarAllowFontScaling: false,
                tabBarActiveTintColor: theme.colors.textPrimary,
                tabBarInactiveTintColor: theme.colors.textTertiary,
            } satisfies BottomTabNavigationOptions,
        }),
        [paddingBottom, tabBarHeight, theme]
    )
}
