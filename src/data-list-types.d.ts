/** biome-ignore-all lint/suspicious/noExplicitAny: allow any */
import type {Descendant} from "@attio/react-descendants"

type Primitive = string | number | boolean | null

/**
 * A simple type alias to help track the list item provided to the row by a
 * consumer.
 */
export type DataListItem<TRenderItem> = TRenderItem

/**
 * A descriptor for the list.
 * Describes an item and how it should be consumed by a renderer.
 */
export interface DataListDescriptor<TRenderItem = any> {
    /**
     * A unique identifier for the item.
     */
    id: Primitive | Array<Primitive>

    /**
     * Data used to help render the item.
     */
    item: DataListItem<TRenderItem>

    /**
     * Describes how this item should be rendered.
     */
    render: DataListRenderListItem<TRenderItem>

    /**
     * Used by recycler-compatible list renderers to optimize performance by
     * reusing the same view for differing items (swapping components).
     */
    recyclerType: string
}

/**
 * The shape of the item info passed into the render function of a row.
 */
export interface DataListRenderListItemInfo<TRenderItem> {
    /**
     * The descriptor that created this item.
     */
    descriptor: DataListDescriptor<TRenderItem>

    /**
     * The index of the descriptor that created this item.
     */
    descriptorSourceIndex: number
}

/**
 * Our master renderer enriches data items as they're passed to the renderer.
 */
export interface DataListRenderListItemInfoWithIndex<TRenderItem>
    extends DataListRenderListItemInfo<TRenderItem> {
    /**
     * The index of this item.
     */
    index: number

    /**
     * The full data array.
     */
    allData: Array<Omit<DataListRenderListItemInfo<TRenderItem>, "allData" | "index">>
}

/**
 * The render item function which receives the fully enriched item row.
 */
export type DataListRenderListItem<TRenderItem> = (
    props: DataListRenderListItemInfoWithIndex<TRenderItem>
) => React.ReactElement | null

type DescriptorId = string

/**
 * The internal array of descriptors.
 */
export type DataListAllDescriptors<TRenderItem = any> = Map<
    DescriptorId,
    Array<DataListDescriptor<TRenderItem>>
>

/**
 * Tracks the position of descriptors at particular indexes.
 */
export type DataListDescriptorIndexes = Map<number, DescriptorId>

/**
 * The internal data array.
 * This is similar to DataListDescriptors, but has been flattened according
 * to the index sort order.
 */
export type DataListData<TRenderItem = any> = Array<DataListDescriptor<TRenderItem>>

/**
 * Extends the reach-ui descendant context to provide some additional data.
 */
export interface DataListDescriptorDescendant extends Descendant {}

/**
 * The shape of the args passed into the internally produced render function.
 * This takes the data items in their internally processed form.
 */
export interface DataListRendererRootRenderItemArgs<TRenderItem = any> {
    item: DataListRenderListItemInfo<TRenderItem>
    index: number
}

/**
 * The internal render item function which is given to the renderer.
 */
export type DataListRendererRootRenderItem<TRenderItem = any> = (
    args: DataListRendererRootRenderItemArgs<TRenderItem>
) => React.ReactElement | null

/**
 * The props passed into the renderer.
 */
export interface DataListRendererProps<TRenderItem = any> {
    /**
     * The data to render.
     */
    data: Array<DataListRenderListItemInfo<TRenderItem>>

    /**
     * The root render item function.
     */
    rootRenderItem: DataListRendererRootRenderItem<TRenderItem>

    /**
     * A function that returns a key used to uniquely identify the item.
     */
    getItemId: (item: DataListRenderListItemInfo<TRenderItem>) => string

    /**
     * A function that's rendered when the descriptors produce an empty array.
     */
    renderEmpty?: (() => React.JSX.Element | null) | null | undefined
}

/**
 * The renderer which maps the internal data model to some arbitrary list
 * component.
 */
export type DataListRenderer<TRenderItem = any> = (
    props: DataListRendererProps<TRenderItem>
) => React.ReactElement | null
