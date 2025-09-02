import type {ViewProps} from "react-native"
import {type BoxProps, createBox} from "@shopify/restyle"

import type {Theme} from "../../style/theme-provider"

export const Box = createBox<Theme>() as unknown as React.ForwardRefExoticComponent<
    React.PropsWithoutRef<BoxProps<Theme, false> & Omit<ViewProps, keyof BoxProps<Theme, false>>> &
        React.RefAttributes<unknown>
>
