import {FlashList, type FlashListProps} from "@shopify/flash-list"
import * as React from "react"

import ReactDataList from "@attio/react-data-list"

interface FlashListRendererProps<TRenderItem>
    extends Omit<
        FlashListProps<ReactDataList.RenderListItemInfo<TRenderItem>>,
        "data" | "renderItem" | "keyExtractor" | "getItemType" | "ListEmptyComponent"
    > {}

export function FlashListRenderer<TRenderItem>(props: FlashListRendererProps<TRenderItem>) {
    const {data, rootRenderItem, renderEmpty, getItemId} = ReactDataList.useRendererContext()

    const getItemType = React.useCallback(
        (item: ReactDataList.RenderListItemInfo<TRenderItem>) => item.descriptor.recyclerType,
        []
    )

    return (
        <FlashList
            data={data}
            renderItem={rootRenderItem}
            keyExtractor={(item) => getItemId(item)}
            getItemType={getItemType}
            ListEmptyComponent={renderEmpty}
            {...props}
        />
    )
}
