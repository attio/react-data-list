import React from "react"

import type {DataListDescriptor} from "./data-list-types"
import {
    useDataListDescriptorContext,
    useDataListDescriptorDescendant,
} from "./data-list-descriptor-context"

interface DataListRowsProps {
    descriptors: Array<DataListDescriptor<unknown>>
}

/**
 * Connects a single item row to the list.
 */
export function DataListRows({descriptors}: DataListRowsProps) {
    const {attachDescriptors} = useDataListDescriptorContext()

    const index = useDataListDescriptorDescendant({})
    React.useLayoutEffect(() => {
        const detach = attachDescriptors(index, descriptors)

        return detach
    }, [attachDescriptors, descriptors, index])

    return null
}
