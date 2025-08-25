import React, {useDeferredValue} from "react"

import type {
    DataListDescriptors,
    DataListRenderer,
    DataListRendererProps as DataListRendererPropsType,
    DataListRendererRootRenderItem,
    DataListRendererRootRenderItemArgs,
    DataListRenderListItemInfo,
} from "./data-list-types"
import {DataListRendererContextProvider} from "./data-list-renderer-context"
import {cancelFrame, requestFrame} from "./utils/request-frame"

export interface DataListMasterRendererProps<TRenderItem>
    extends Omit<DataListRendererPropsType<TRenderItem>, "data" | "rootRenderItem" | "getItemId"> {
    renderer: DataListRenderer<TRenderItem> | ReturnType<DataListRenderer<TRenderItem>>
    descriptors: DataListDescriptors<TRenderItem>
}

export function DataListMasterRenderer<TRenderItem>({
    renderer,
    descriptors,
    ...rest
}: DataListMasterRendererProps<TRenderItem>) {
    const newData = React.useMemo((): Array<
        DataListRendererRootRenderItemArgs<TRenderItem>["item"]
    > => {
        const sortedDescriptors = [...descriptors.entries()].sort((a, b) => a[0] - b[0])

        return sortedDescriptors.flatMap(([index, descriptors]) =>
            descriptors.map((d) => ({
                descriptor: {
                    ...d,
                    id: [index, ...(Array.isArray(d.id) ? d.id : [d.id])],
                },
                descriptorSourceIndex: index,
            }))
        )
    }, [descriptors])

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
