import React from "react"

import type {DataListDescriptor} from "./data-list-types"
import {
    useDataListDescriptorContext,
    useDataListDescriptorDescendant,
} from "./data-list-descriptor-context"

interface DataListRowsProps {
    // biome-ignore lint/suspicious/noExplicitAny: allow any to avoid union issues
    descriptors: Array<DataListDescriptor<any>>
}

/**
 * Connects a single item row to the list.
 */
export function DataListRows({descriptors}: DataListRowsProps) {
    const {attachDescriptors, markForIndex} = useDataListDescriptorContext()

    const id = React.useId()
    React.useLayoutEffect(() => {
        const detach = attachDescriptors(id, descriptors)

        return detach
    }, [attachDescriptors, descriptors])

    const index = useDataListDescriptorDescendant({})
    React.useLayoutEffect(() => {
        const detach = markForIndex(id, index)

        return detach
    }, [markForIndex, index])

    return null
}
