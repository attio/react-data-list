import {ActivityIndicator, type StyleProp} from "react-native"

import type {LayoutViewStyle} from "../../../style/layout-view-style"
import {Box} from "../../design-system/box"
import {Text} from "../../design-system/text"

export interface LoadingListItemProps {
    isFirst: boolean
    isLast: boolean
    style?: StyleProp<LayoutViewStyle>
}

export function LoadingListItem({isFirst, isLast, style}: LoadingListItemProps) {
    return (
        <Box
            flexDirection="row"
            alignItems="center"
            gap="4"
            borderColor="strokePrimary"
            backgroundColor="bgSecondary"
            borderWidth={1}
            padding="4"
            alignSelf="stretch"
            {...(isFirst && {borderTopLeftRadius: "8", borderTopRightRadius: "8"})}
            {...(isLast && {borderBottomLeftRadius: "8", borderBottomRightRadius: "8"})}
            style={style}
            height={32}
        >
            <ActivityIndicator size="small" />

            <Text variant="body">Loading...</Text>
        </Box>
    )
}
