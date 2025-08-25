import React from "react"

import type {DataListDescriptors as DataListDescriptorsType} from "./data-list-types"
import {DataListDescriptors, type DataListDescriptorsProps} from "./data-list-descriptors"
import {DataListMasterRenderer, type DataListMasterRendererProps} from "./data-list-master-renderer"

export interface DataListProps<TRenderItem>
    extends Omit<DataListMasterRendererProps<TRenderItem>, "descriptors" | "updateDescriptorIndex">,
        Omit<DataListDescriptorsProps<TRenderItem>, "descriptors" | "setDescriptors"> {
    children: React.ReactNode
}

/**
 * A list component that allows you to construct your data array and
 * item-related functions in a React-declarative way.
 *
 * Supports familiar React concepts such as Suspense and Error boundaries.
 */
export function DataList<TRenderItem>({renderer, children, ...rest}: DataListProps<TRenderItem>) {
    const [descriptors, setDescriptors] = React.useState<DataListDescriptorsType<TRenderItem>>(
        new Map()
    )

    return (
        <>
            <DataListDescriptors setDescriptors={setDescriptors} descriptors={children} />
            <DataListMasterRenderer {...rest} renderer={renderer} descriptors={descriptors} />
        </>
    )
}
