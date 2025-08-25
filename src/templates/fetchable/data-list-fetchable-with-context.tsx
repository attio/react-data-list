import React from "react"
import {ErrorBoundary, type FallbackProps} from "react-error-boundary"

import {DataList, type DataListProps} from "../../data-list"
import {useDataListFetchableCaptureContext} from "./data-list-fetchable-capture-context"

export interface DataListFetchableWithContextProps<TRenderItem>
    extends Omit<DataListProps<TRenderItem>, "renderEmpty"> {
    children: React.ReactNode
}

/**
 * A wrapper around UniversalList to help handle some typical top-level.
 */
export function DataListFetchableWithContext<TRenderItem>({
    children,
    ...props
}: DataListFetchableWithContextProps<TRenderItem>) {
    const {renderPendingRows, renderErrorRows, renderEmpty} = useDataListFetchableCaptureContext()

    const unknownErrorTypeRenderErrorRows = renderErrorRows as
        | React.ReactNode
        | ((args: FallbackProps) => React.ReactNode)

    return (
        <DataList {...props} renderEmpty={renderEmpty}>
            {!renderPendingRows && !renderErrorRows && children}
            {renderPendingRows && renderErrorRows && (
                <React.Suspense
                    fallback={
                        typeof renderPendingRows === "function"
                            ? renderPendingRows()
                            : renderPendingRows
                    }
                >
                    <ErrorBoundary
                        {...(typeof unknownErrorTypeRenderErrorRows === "function"
                            ? {fallbackRender: unknownErrorTypeRenderErrorRows}
                            : {fallback: unknownErrorTypeRenderErrorRows})}
                    >
                        {children}
                    </ErrorBoundary>
                </React.Suspense>
            )}
            {!renderPendingRows && renderErrorRows && (
                <ErrorBoundary
                    {...(typeof unknownErrorTypeRenderErrorRows === "function"
                        ? {fallbackRender: unknownErrorTypeRenderErrorRows}
                        : {fallback: unknownErrorTypeRenderErrorRows})}
                >
                    {children}
                </ErrorBoundary>
            )}
            {renderPendingRows && !renderErrorRows && (
                <React.Suspense
                    fallback={
                        typeof renderPendingRows === "function"
                            ? renderPendingRows()
                            : renderPendingRows
                    }
                >
                    {children}
                </React.Suspense>
            )}
        </DataList>
    )
}
