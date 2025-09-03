import * as React from "react"

import type {
    DataListAllDescriptors,
    DataListDescriptor,
    DataListDescriptorIndexes,
    DescriptorId,
} from "./data-list-types"
import {
    DataListDescriptorContextProvider,
    type DataListDescriptorContextProviderContext,
    DataListDescriptorDescendantContextProvider,
} from "./data-list-descriptor-context"

export interface DataListDescriptorsProps<TRenderItem>
    extends Omit<
        DataListDescriptorContextProviderContext,
        "children" | "attachDescriptors" | "markForIndex"
    > {
    rowChildren: React.ReactNode
    setAllDescriptors: React.Dispatch<React.SetStateAction<DataListAllDescriptors<TRenderItem>>>
    setDescriptorIndexes: React.Dispatch<React.SetStateAction<DataListDescriptorIndexes>>
}

export function DataListDescriptors<TRenderItem>({
    rowChildren,
    setAllDescriptors,
    setDescriptorIndexes: outerSetDescriptorIndexes,
}: DataListDescriptorsProps<TRenderItem>) {
    const attachDescriptors: DataListDescriptorContextProviderContext["attachDescriptors"] =
        React.useCallback(
            (id: DescriptorId, rowDescriptors: Array<DataListDescriptor<TRenderItem>>) => {
                setAllDescriptors((prevAllDescriptors) => {
                    const newDescriptors = new Map(prevAllDescriptors)
                    newDescriptors.set(id, rowDescriptors)
                    return newDescriptors
                })

                return () => {
                    setAllDescriptors((prevAllDescriptors) => {
                        const newDescriptors = new Map(prevAllDescriptors)
                        newDescriptors.delete(id)
                        return newDescriptors
                    })
                }
            },
            [setAllDescriptors]
        )

    const markForIndex: DataListDescriptorContextProviderContext["markForIndex"] =
        React.useCallback(
            (id: DescriptorId, index: number) => {
                outerSetDescriptorIndexes((prevDescriptorIndexes) => {
                    const newDescriptorsIndex = new Map(prevDescriptorIndexes)
                    newDescriptorsIndex.set(index, id)
                    return newDescriptorsIndex
                })

                return () => {
                    outerSetDescriptorIndexes((prevDescriptorIndexes) => {
                        const currentIdAtIndex = prevDescriptorIndexes.get(index)

                        // Already used
                        if (currentIdAtIndex !== id) return prevDescriptorIndexes

                        const newDescriptorsIndex = new Map(prevDescriptorIndexes)
                        newDescriptorsIndex.delete(index)
                        return newDescriptorsIndex
                    })
                }
            },
            [outerSetDescriptorIndexes]
        )

    return (
        <DataListDescriptorContextProvider
            attachDescriptors={attachDescriptors}
            markForIndex={markForIndex}
        >
            <DataListDescriptorDescendantContextProvider>
                {rowChildren}
            </DataListDescriptorDescendantContextProvider>
        </DataListDescriptorContextProvider>
    )
}
