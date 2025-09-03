import type React from "react"

import {
    DataListFetchableCaptureContextProvider,
    type DataListFetchableCaptureContextProviderProps,
} from "./data-list-fetchable-capture-context"
import {
    DataListFetchableWithContext,
    type DataListFetchableWithContextProps,
} from "./data-list-fetchable-with-context"

interface DataListFetchableProps<TRenderItem>
    extends DataListFetchableCaptureContextProviderProps,
        DataListFetchableWithContextProps<TRenderItem> {
    children: React.ReactNode
}

/**
 * A wrapper around DataList to help handle typical top-level state behavior.
 */
export function DataListFetchable<TRenderItem>({
    renderPending,
    renderError,
    renderErrorRows,
    renderPendingRows,
    renderEmpty,
    ...props
}: DataListFetchableProps<TRenderItem>) {
    return (
        <DataListFetchableCaptureContextProvider
            renderEmpty={renderEmpty}
            renderPending={renderPending}
            renderError={renderError}
            renderErrorRows={renderErrorRows}
            renderPendingRows={renderPendingRows}
        >
            <DataListFetchableWithContext {...props} />
        </DataListFetchableCaptureContextProvider>
    )
}
