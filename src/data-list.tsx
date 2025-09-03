import React from "react"

import type {DataListAllDescriptors, DataListDescriptorIndexes} from "./data-list-types"
import {DataListDescriptors, type DataListDescriptorsProps} from "./data-list-descriptors"
import {DataListMasterRenderer, type DataListMasterRendererProps} from "./data-list-master-renderer"

export interface DataListProps<TRenderItem>
    extends Omit<DataListMasterRendererProps<TRenderItem>, "allDescriptors" | "descriptorIndexes">,
        Omit<
            DataListDescriptorsProps<TRenderItem>,
            "rowChildren" | "setAllDescriptors" | "setDescriptorIndexes"
        > {
    children: React.ReactNode
}

/**
 * A list component that allows you to construct your data array and
 * item-related functions in a React-declarative way.
 *
 * Supports familiar React concepts such as Suspense and Error boundaries.
 */
export function DataList<TRenderItem>({renderer, children, ...rest}: DataListProps<TRenderItem>) {
    const [allDescriptors, setAllDescriptors] = React.useState<DataListAllDescriptors<TRenderItem>>(
        new Map()
    )
    const [descriptorIndexes, setDescriptorIndexes] = React.useState<DataListDescriptorIndexes>(
        new Map()
    )

    return (
        <>
            <DataListDescriptors
                setAllDescriptors={setAllDescriptors}
                setDescriptorIndexes={setDescriptorIndexes}
                rowChildren={children}
            />
            <DataListMasterRenderer
                {...rest}
                renderer={renderer}
                allDescriptors={allDescriptors}
                descriptorIndexes={descriptorIndexes}
            />
        </>
    )
}
