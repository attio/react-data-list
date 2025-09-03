import React from "react"

import {createDescendantContext} from "@attio/react-descendants"

import type {DataListDescriptor, DataListDescriptorDescendant} from "./data-list-types"

export interface DataListDescriptorContextProviderContext {
    attachDescriptors: (id: string, descriptors: Array<DataListDescriptor>) => () => void
    markForIndex: (id: string, index: number) => void
}

const DataListDescriptorContext = React.createContext<
    DataListDescriptorContextProviderContext | undefined
>(undefined)

export function DataListDescriptorContextProvider({
    children,
    ...value
}: DataListDescriptorContextProviderContext & {children: React.ReactNode}) {
    return (
        <DataListDescriptorContext.Provider value={value}>
            {children}
        </DataListDescriptorContext.Provider>
    )
}

export function useDataListDescriptorContext(): DataListDescriptorContextProviderContext {
    const context = React.useContext(DataListDescriptorContext)
    if (context === undefined) {
        throw new Error(
            "useDataListDescriptorContext must be used within a DataListDescriptorContextProvider"
        )
    }
    return context
}

interface DataListDescriptorDescendantContextProviderProps extends React.PropsWithChildren {}

const {DescendantsContextProvider, useDescendant} =
    createDescendantContext<DataListDescriptorDescendant>()

export function DataListDescriptorDescendantContextProvider({
    children,
}: DataListDescriptorDescendantContextProviderProps) {
    return <DescendantsContextProvider>{children}</DescendantsContextProvider>
}

export const useDataListDescriptorDescendant = useDescendant as typeof useDescendant
