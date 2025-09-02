/** biome-ignore-all lint/suspicious/noExplicitAny: ignore */
import {FlashList, type FlashListProps, type FlashListRef} from "@shopify/flash-list"
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

export const FlashListRenderer = React.forwardRef<
    FlashListRef<ReactDataList.RenderListItemInfo<any>>,
    FlashListRendererProps<any>
>(function FlashListRenderer({...rest}, ref) {
    const {data, rootRenderItem, renderEmpty, getItemId} = useDataListRendererContext()

    const getItemType = React.useCallback(
        (item: ReactDataList.RenderListItemInfo<any>) => item.descriptor.recyclerType,
        []
    )

    return (
        <FlashList
            ref={ref}
            data={data}
            renderItem={rootRenderItem}
            keyExtractor={(item) => getItemId(item)}
            getItemType={getItemType}
            ListEmptyComponent={renderEmpty}
            {...rest}
        />
    )
})
