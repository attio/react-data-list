import React, {useDeferredValue} from "react"

import type {
    DataListAllDescriptors,
    DataListDescriptor,
    DataListDescriptorIndexes,
    DataListRenderer,
    DataListRendererProps,
    DataListRendererRootRenderItem,
    DataListRendererRootRenderItemArgs,
    DataListRenderListItemInfo,
} from "./data-list-types"
import {DataListRendererContextProvider} from "./data-list-renderer-context"
import {cancelFrame, requestFrame} from "./utils/request-frame"

export interface DataListMasterRendererProps<TRenderItem>
    extends Omit<DataListRendererProps<TRenderItem>, "data" | "rootRenderItem" | "getItemId"> {
    renderer: DataListRenderer<TRenderItem> | ReturnType<DataListRenderer<TRenderItem>>
    allDescriptors: DataListAllDescriptors<TRenderItem>
    descriptorIndexes: DataListDescriptorIndexes
}

export function DataListMasterRenderer<TRenderItem>({
    renderer,
    allDescriptors,
    descriptorIndexes,
    ...rest
}: DataListMasterRendererProps<TRenderItem>) {
    const newData = React.useMemo((): Array<
        DataListRendererRootRenderItemArgs<TRenderItem>["item"]
    > => {
        const sortedDescriptorIds = [...descriptorIndexes.entries()].sort((a, b) => a[0] - b[0])

        return sortedDescriptorIds.flatMap(([index, descriptorId]) => {
            const descriptorsForId = allDescriptors.get(descriptorId)

            if (!descriptorsForId) return []

            return descriptorsForId.map((d: DataListDescriptor<TRenderItem>) => ({
                descriptor: {
                    ...d,
                    id: [index, ...(Array.isArray(d.id) ? d.id : [d.id])],
                },
                descriptorSourceIndex: index,
            }))
        })
    }, [allDescriptors, descriptorIndexes])

    const deferredData = useDeferredValue(newData)

    const hasInitialPaintedRef = React.useRef(false)
    React.useLayoutEffect(() => {
        if (!hasInitialPaintedRef.current) {
            const id = requestFrame(() => {
                hasInitialPaintedRef.current = true
            })

            return () => cancelFrame(id)
        }

        return
    }, [])

    // Only use deferred data after first mount/paint.
    const data = hasInitialPaintedRef.current ? deferredData : newData

    const rootRenderItem: DataListRendererRootRenderItem<TRenderItem> = React.useCallback(
        ({item, index}) => item.descriptor.render({...item, index, allData: data}),
        [data]
    )

    const getItemId = React.useCallback(
        (item: DataListRenderListItemInfo<TRenderItem>) =>
            (Array.isArray(item.descriptor.id) ? item.descriptor.id : [item.descriptor.id]).join(
                ":"
            ),
        []
    )

    const extraProps = {data, rootRenderItem, getItemId}

    return (
        <DataListRendererContextProvider {...rest} {...extraProps}>
            {typeof renderer === "function" ? renderer({...rest, ...extraProps}) : renderer}
        </DataListRendererContextProvider>
    )
}
