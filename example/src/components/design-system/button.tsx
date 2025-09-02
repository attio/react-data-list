import {type StyleProp, TouchableOpacity, type TouchableOpacityProps} from "react-native"

import type {LayoutViewStyle} from "../../style/layout-view-style"
import {Box} from "./box"
import {Text} from "./text"

interface ExampleButtonProps extends Pick<TouchableOpacityProps, "onPress"> {
    title: string
    style?: StyleProp<LayoutViewStyle>
}

export function Button({title, onPress, style}: ExampleButtonProps) {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
            <Box
                minHeight={52}
                backgroundColor="accent"
                borderRadius="12"
                padding="8"
                justifyContent="center"
                alignItems="center"
                style={style}
            >
                <Text variant="titleLarge" color="textOnAccent" numberOfLines={1}>
                    {title}
                </Text>
            </Box>
        </TouchableOpacity>
    )
}
