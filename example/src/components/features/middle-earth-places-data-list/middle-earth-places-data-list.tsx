import type {FlashListProps} from "@shopify/flash-list"
import {Image} from "expo-image"
import * as React from "react"
import {type StyleProp, StyleSheet} from "react-native"

import {ReactDataList} from "@attio/react-data-list"

import type {MiddleEarthPlace} from "../../../data/middle-earth-places"
import type {LayoutViewStyle} from "../../../style/layout-view-style"
import {FlashListRenderer} from "../../../data-list/flashlist-renderer"
import {Box} from "../../design-system/box"
import {Text} from "../../design-system/text"

export interface MiddleEarthPlacesDataListProps
    extends Pick<FlashListProps<MiddleEarthPlace>, "contentContainerStyle"> {
    placeItems: ReadonlyArray<MiddleEarthPlace>
    style?: StyleProp<LayoutViewStyle>
}

const ItemSeparatorComponent = () => <Box width={8} />

/**
 * An example demonstrating a nested ReactDataList instance.
 */
export default function MiddleEarthPlacesDataList({
    style,
    placeItems,
    ...rest
}: MiddleEarthPlacesDataListProps) {
    const descriptors = React.useMemo(
        () =>
            placeItems.map(
                (placeItem): ReactDataList.Descriptor<MiddleEarthPlace> => ({
                    id: placeItem.name,
                    item: placeItem,
                    recyclerType: "list-item",
                    render: ({descriptor: {item}}) => (
                        <Box
                            paddingHorizontal="4"
                            paddingVertical="2"
                            borderRadius="4"
                            overflow="hidden"
                            justifyContent="flex-end"
                            alignItems="flex-end"
                            minHeight={64}
                            minWidth={64 * (16 / 9)}
                        >
                            <Image source={{uri: item.url}} style={styles.image} />

                            <Box
                                position="absolute"
                                left={0}
                                right={0}
                                bottom={0}
                                height={20}
                                style={{backgroundColor: "black", opacity: 0.5}}
                            />

                            <Text
                                variant="small"
                                numberOfLines={1}
                                flexShrink={1}
                                style={{color: "white"}}
                            >
                                {item.name}
                            </Text>
                        </Box>
                    ),
                })
            ),
        [placeItems]
    )

    return (
        <ReactDataList
            renderer={
                <FlashListRenderer
                    {...rest}
                    horizontal
                    ItemSeparatorComponent={ItemSeparatorComponent}
                    showsHorizontalScrollIndicator={false}
                />
            }
        >
            <ReactDataList.Rows descriptors={descriptors} />
        </ReactDataList>
    )
}

const styles = StyleSheet.create({
    image: {
        ...StyleSheet.absoluteFillObject,
    },
})
