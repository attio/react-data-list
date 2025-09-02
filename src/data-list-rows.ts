import React from "react"

import type {DataListDescriptor} from "./data-list-types"
import {
    useDataListDescriptorContext,
    useDataListDescriptorDescendant,
} from "./data-list-descriptor-context"

interface DataListRowsProps<TRenderItem> {
    descriptors: Array<DataListDescriptor<TRenderItem>>
}

/**
 * Connects a single item row to the list.
 */
export function DataListRows<TRenderItem>({descriptors}: DataListRowsProps<TRenderItem>) {
    const {attachDescriptors} = useDataListDescriptorContext()

    const index = useDataListDescriptorDescendant({})
    React.useLayoutEffect(() => {
        const detach = attachDescriptors(index, descriptors)

        return detach
    }, [attachDescriptors, descriptors, index])

    return null
}
