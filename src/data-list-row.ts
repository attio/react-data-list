import React from "react"

import type {DataListDescriptor} from "./data-list-types"
import {
    useDataListDescriptorContext,
    useDataListDescriptorDescendant,
} from "./data-list-descriptor-context"

/**
 * Connects a single item row to the list.
 */
export function DataListRow<TRenderItem>(descriptor: DataListDescriptor<TRenderItem>) {
    const {attachDescriptors} = useDataListDescriptorContext()

    const index = useDataListDescriptorDescendant({})
    React.useLayoutEffect(() => {
        const detach = attachDescriptors(index, [descriptor])

        return detach
    }, [attachDescriptors, descriptor, index])

    return null
}
