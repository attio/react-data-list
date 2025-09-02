import type {StyleProp} from "react-native"

import type {LayoutViewStyle} from "../../../style/layout-view-style"
import {Text} from "../../design-system/text"

export interface ListHeaderProps {
    title: string
    style?: StyleProp<LayoutViewStyle>
}

export function ListHeader({title, style}: ListHeaderProps) {
    return (
        <Text style={style} variant="title">
            {title}
        </Text>
    )
}
