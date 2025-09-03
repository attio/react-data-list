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
    const {attachDescriptors, markForIndex} = useDataListDescriptorContext()

    const id = React.useId()
    React.useLayoutEffect(() => {
        const detach = attachDescriptors(id, [descriptor])

        return detach
    }, [attachDescriptors, descriptor])

    const index = useDataListDescriptorDescendant({})
    React.useLayoutEffect(() => {
        const detach = markForIndex(id, index)

        return detach
    }, [markForIndex, index])

    return null
}
