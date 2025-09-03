import {FlashList, type FlashListProps} from "@shopify/flash-list"
import * as React from "react"

import type ReactDataList from "@attio/react-data-list"

import {useDataListRendererContext} from "../../../src/data-list-renderer-context"

interface FlashListRendererProps<TRenderItem>
    extends Omit<
        FlashListProps<ReactDataList.RenderListItemInfo<TRenderItem>>,
        "data" | "renderItem" | "getItemType" | "keyExtractor" | "ListEmptyComponent"
    > {
    animated?: boolean
}

export function FlashListRenderer<TRenderItem>(props: FlashListRendererProps<TRenderItem>) {
    const {data, rootRenderItem, renderEmpty, getItemId} = useDataListRendererContext()

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
