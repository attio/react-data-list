import {Image} from "expo-image"
import {type StyleProp, StyleSheet} from "react-native"

import type {MiddleEarthCharacter} from "../../../data/middle-earth-the-fellowship"
import type {LayoutViewStyle} from "../../../style/layout-view-style"
import {Box} from "../../design-system/box"
import {Text} from "../../design-system/text"

export interface CharacterListItemProps extends MiddleEarthCharacter {
    isFirst: boolean
    isLast: boolean
    style?: StyleProp<LayoutViewStyle>
}

export function CharacterListItem({
    name,
    race,
    url,
    isFirst,
    isLast,
    style,
}: CharacterListItemProps) {
    return (
        <Box
            flexDirection="row"
            alignItems="center"
            gap="4"
            borderColor="strokePrimary"
            backgroundColor="bgSecondary"
            borderWidth={1}
            borderBottomWidth={isLast ? 1 : 0}
            padding="6"
            paddingHorizontal="8"
            alignSelf="stretch"
            {...(isFirst && {borderTopLeftRadius: "8", borderTopRightRadius: "8"})}
            {...(isLast && {borderBottomLeftRadius: "8", borderBottomRightRadius: "8"})}
            style={style}
        >
            <Image source={{uri: url}} style={styles.avatar} />

            <Text variant="body">{name}</Text>

            <Text variant="body" color="textQuaternary">
                {race}
            </Text>
        </Box>
    )
}

const styles = StyleSheet.create({
    avatar: {
        width: 32,
        height: 32,
        borderRadius: "50%",
        flexDirection: "row",
        alignItems: "center",
    },
})
