import type {TextProps} from "react-native"
import {createText, type TextProps as RestyleTextProps} from "@shopify/restyle"

import type {Theme} from "../../style/theme-provider"

export const Text = createText<Theme>() as unknown as React.ForwardRefExoticComponent<
    React.PropsWithoutRef<
        RestyleTextProps<Theme, false> & Omit<TextProps, keyof RestyleTextProps<Theme, false>>
    > &
        React.RefAttributes<unknown>
>
