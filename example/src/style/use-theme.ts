import {useTheme as useRestyleTheme} from "@shopify/restyle"

import type {Theme} from "./theme-provider"

export function useTheme(): Theme {
    return useRestyleTheme()
}
