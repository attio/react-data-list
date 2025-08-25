import React from "react"

import type {DataListRendererProps} from "./data-list-types"

const DataListRendererContext = React.createContext<DataListRendererProps | undefined>(undefined)

export function DataListRendererContextProvider({
    children,
    ...value
}: DataListRendererProps & {children: React.ReactNode}) {
    return (
        <DataListRendererContext.Provider value={value}>
            {children}
        </DataListRendererContext.Provider>
    )
}

export function useDataListRendererContext(): DataListRendererProps {
    const context = React.useContext(DataListRendererContext)
    if (context === undefined) {
        throw new Error(
            "useDataListRendererContext must be used within a DataListRendererContextProvider"
        )
    }
    return context
}
