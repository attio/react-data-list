import * as React from "react"

import type {
    DataListDescriptor,
    DataListDescriptors as DataListDescriptorsType,
} from "./data-list-types"
import {
    DataListDescriptorContextProvider,
    type DataListDescriptorContextProviderContext,
    DataListDescriptorDescendantContextProvider,
} from "./data-list-descriptor-context"

export interface DataListDescriptorsProps<TRenderItem>
    extends Omit<
        DataListDescriptorContextProviderContext,
        "children" | "attachDescriptors" | "updateDescriptorIndex"
    > {
    descriptors: React.ReactNode
    setDescriptors: React.Dispatch<React.SetStateAction<DataListDescriptorsType<TRenderItem>>>
}

export function DataListDescriptors<TRenderItem>({
    descriptors,
    setDescriptors,
}: DataListDescriptorsProps<TRenderItem>) {
    const attachDescriptors: DataListDescriptorContextProviderContext["attachDescriptors"] =
        React.useCallback(
            (index: number, additionalDescriptors: Array<DataListDescriptor<TRenderItem>>) => {
                setDescriptors((prevDescriptors) => {
                    const newDescriptors = new Map(prevDescriptors)
                    newDescriptors.set(index, additionalDescriptors)
                    return newDescriptors
                })

                // console.log(
                //     "attachDescriptors",
                //     index,
                //     additionalDescriptors.map((v) => v.item)
                // )

                return () => {
                    setDescriptors((prevDescriptors) => {
                        const newDescriptors = new Map(prevDescriptors)
                        newDescriptors.delete(index)
                        return newDescriptors
                    })
                }
            },
            [setDescriptors]
        )

    return (
        <DataListDescriptorContextProvider attachDescriptors={attachDescriptors}>
            <DataListDescriptorDescendantContextProvider>
                {descriptors}
            </DataListDescriptorDescendantContextProvider>
        </DataListDescriptorContextProvider>
    )
}
