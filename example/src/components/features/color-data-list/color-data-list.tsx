import type {FlashListProps} from "@shopify/flash-list"
import type {StyleProp} from "react-native"
import type {LayoutViewStyle} from "src/style/layout-view-style"
import * as React from "react"
import {FlashListRenderer} from "src/data-list/flashlist-renderer"

import {ReactDataList} from "@attio/react-data-list"

import type {DataListDescriptor} from "../../../../../src/data-list-types"
import {Box} from "../../design-system/box"
import {Text} from "../../design-system/text"

interface ColorDataListItem {
    color: string
}

export interface ColorDataListProps
    extends Pick<FlashListProps<ColorDataListItem>, "contentContainerStyle"> {
    colors: ColorDataListItem["color"][]
    style?: StyleProp<LayoutViewStyle>
}

const ItemSeparatorComponent = () => <Box width={8} />

export default function ColorDataList({colors, style, ...rest}: ColorDataListProps) {
    const descriptors = React.useMemo(
        () =>
            colors.map(
                (color): DataListDescriptor<ColorDataListItem> => ({
                    id: color,
                    item: {color},
                    recyclerType: "list-item",
                    render: ({descriptor: {item}}) => (
                        <Box
                            style={{backgroundColor: item.color}}
                            paddingHorizontal="4"
                            paddingVertical="8"
                            borderRadius="4"
                        >
                            <Text variant="small" numberOfLines={1} flexShrink={1}>
                                {color}
                            </Text>
                        </Box>
                    ),
                })
            ),
        [colors]
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
