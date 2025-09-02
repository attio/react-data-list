import {type StyleProp, StyleSheet, View} from "react-native"

import type {LayoutViewStyle} from "../../../style/layout-view-style"
import {Box} from "../../design-system/box"
import {Text} from "../../design-system/text"

export interface ListItemProps {
    name: string
    color: string
    isFirst: boolean
    isLast: boolean
    style?: StyleProp<LayoutViewStyle>
}

export function ListItem({name, color, isFirst, isLast, style}: ListItemProps) {
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
            <View style={[styles.avatar, {backgroundColor: color}]} />

            <Text variant="body">{name}</Text>
        </Box>
    )
}

const styles = StyleSheet.create({
    avatar: {
        width: 16,
        height: 16,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
    },
})
