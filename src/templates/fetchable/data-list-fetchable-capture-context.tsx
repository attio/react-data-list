/** biome-ignore-all lint/suspicious/noExplicitAny: ignore */

import type {FallbackProps} from "react-error-boundary"
import React from "react"

import {complete, errored, type Fetchable, pending} from "@attio/fetchable"

import type {DataListProps} from "../../data-list"

function argWarning({
    renderPendingRows,
    renderPending,
    renderErrorRows,
    renderError,
}: DataListFetchableCaptureContextProviderProps) {
    if (renderPendingRows && renderPending) {
        console.warn(
            "renderPending and renderPendingRows cannot both be provided. Falling back to renderPendingRows."
        )
    }

    if (renderErrorRows && renderError) {
        console.warn(
            "renderError and renderErrorRows cannot both be provided. Falling back to renderErrorRows."
        )
    }
}

export interface DataListFetchableCaptureContextProviderContext
    extends Pick<DataListProps<unknown>, "renderEmpty"> {
    /**
     * An alternative to creating a top-level Suspense boundary within the
     * children (to help you avoid nesting).
     */
    renderPendingRows?: (() => React.ReactNode) | React.ReactNode

    /**
     * An alternative to creating a top-level ErrorBoundary boundary within
     * the children (to help you avoid nesting).
     */
    renderErrorRows?: React.ReactNode | ((props: FallbackProps) => React.ReactNode)
}

const DataListFetchableCaptureContext =
    React.createContext<DataListFetchableCaptureContextProviderContext | null>(null)

function InternalDataListFetchableCaptureContextProvider({
    children,
    renderEmpty,
    renderErrorRows,
    renderPendingRows,
}: React.PropsWithChildren<DataListFetchableCaptureContextProviderContext>) {
    const value = React.useMemo(
        () => ({renderEmpty, renderPendingRows, renderErrorRows}),
        [renderEmpty, renderPendingRows, renderErrorRows]
    )

    return (
        <DataListFetchableCaptureContext.Provider value={value}>
            {children}
        </DataListFetchableCaptureContext.Provider>
    )
}

export function useDataListFetchableCaptureContext(): DataListFetchableCaptureContextProviderContext {
    const context = React.useContext(DataListFetchableCaptureContext)
    if (context === null) {
        throw new Error(
            "useDataListFetchableCaptureContext must be used within a DataListFetchableCaptureContextProvider"
        )
    }
    return context as DataListFetchableCaptureContextProviderContext
}

type CapturedFetchable = Fetchable<true, FallbackProps>

const DataListFetchableCaptureContextFetchableStateContext = React.createContext<{
    fetchable: CapturedFetchable
} | null>(null)

function InternalDataListFetchableCaptureContextFetchableStateProvider({
    children,
    fetchable,
}: React.PropsWithChildren<{fetchable: CapturedFetchable}>) {
    const value = React.useMemo(() => ({fetchable}), [fetchable])

    return (
        <DataListFetchableCaptureContextFetchableStateContext.Provider value={value}>
            {children}
        </DataListFetchableCaptureContextFetchableStateContext.Provider>
    )
}

function useDataListFetchableCaptureContextFetchableState(): {fetchable: CapturedFetchable} {
    const context = React.useContext(DataListFetchableCaptureContextFetchableStateContext)
    if (context === null) {
        throw new Error(
            "useDataListFetchableCaptureContextFetchableState must be used within a DataListFetchableCaptureContextFetchableStateProvider"
        )
    }
    return context
}

interface CapturePendingProps {
    setFetchableState: React.Dispatch<React.SetStateAction<CapturedFetchable>>
}

function CapturePending({setFetchableState}: CapturePendingProps) {
    React.useLayoutEffect(() => {
        setFetchableState(pending())
    }, [setFetchableState])

    return null
}

interface CaptureErrorProps extends CapturePendingProps, FallbackProps {}

function CaptureError({setFetchableState, error, resetErrorBoundary}: CaptureErrorProps) {
    React.useLayoutEffect(() => {
        setFetchableState(errored({error, resetErrorBoundary}))
    }, [setFetchableState, error, resetErrorBoundary])

    return null
}

interface CapturedErrorProps {
    renderError: (p: FallbackProps) => React.ReactNode
}

function CapturedError({renderError}: CapturedErrorProps) {
    const {fetchable} = useDataListFetchableCaptureContextFetchableState()

    // This shouldn't happen
    if (fetchable.state !== "error") return null

    return renderError(fetchable.error)
}

export interface DataListFetchableCaptureContextProviderProps
    extends React.PropsWithChildren,
        DataListFetchableCaptureContextProviderContext {
    /**
     * A function that's rendered when the descriptors are pending.
     * This is ignored when renderPendingRows is provided.
     */
    renderPending?: (() => React.JSX.Element | null) | null | undefined

    /**
     * A function that's rendered when the descriptors throw an error.
     * This is ignored when renderErrorRows is provided.
     */
    renderError?: ((props: FallbackProps) => React.JSX.Element | null) | null | undefined
}

export function DataListFetchableCaptureContextProvider({
    renderEmpty: outerRenderEmpty,
    renderPending,
    renderError,
    renderErrorRows: outerRenderErrorRows,
    renderPendingRows: outerRenderPendingRows,
    children,
}: DataListFetchableCaptureContextProviderProps) {
    // biome-ignore lint/complexity/noArguments: ignore
    argWarning(arguments[0])

    const [capturedFetchable, setCapturedFetchable] = React.useState<CapturedFetchable>(
        complete(true)
    )

    const renderCapturePending = React.useCallback(
        () => <CapturePending setFetchableState={setCapturedFetchable} />,
        []
    )

    const renderCaptureError = React.useCallback(
        (props: FallbackProps) => (
            <CaptureError {...props} setFetchableState={setCapturedFetchable} />
        ),
        []
    )

    const renderCapturedPending = renderPending
    const newRenderCapturedError = React.useCallback(
        () =>
            renderError ? (
                <CapturedError
                    renderError={renderError as (props: FallbackProps) => React.ReactNode}
                />
            ) : null,
        [renderError]
    )
    const renderCapturedError = renderError ? newRenderCapturedError : undefined

    const capturedFetchableState = capturedFetchable.state
    const newRenderEmpty = (() => {
        if (capturedFetchableState === "pending" && renderCapturedPending) {
            return renderCapturedPending
        }

        if (capturedFetchableState === "error" && renderCapturedError) {
            return renderCapturedError
        }

        return outerRenderEmpty
    })()

    const renderEmpty = outerRenderEmpty ? newRenderEmpty : undefined

    const renderPendingRows =
        outerRenderPendingRows ?? (renderPending ? renderCapturePending : undefined)
    const renderErrorRows = outerRenderErrorRows ?? (renderError ? renderCaptureError : undefined)

    // Downcast the error type
    const notTypedRenderErrorRows = renderErrorRows as
        | ((props: FallbackProps) => React.ReactNode)
        | undefined

    return (
        <InternalDataListFetchableCaptureContextFetchableStateProvider
            fetchable={capturedFetchable}
        >
            <InternalDataListFetchableCaptureContextProvider
                renderEmpty={renderEmpty}
                renderErrorRows={notTypedRenderErrorRows}
                renderPendingRows={renderPendingRows}
            >
                {children}
            </InternalDataListFetchableCaptureContextProvider>
        </InternalDataListFetchableCaptureContextFetchableStateProvider>
    )
}
