import type {
    DataListDescriptor,
    DataListRenderListItem,
    DataListRenderListItemInfo,
    DataListRenderListItemInfoWithIndex,
} from "./data-list-types"
import {DataList} from "./data-list"
import {useDataListRendererContext} from "./data-list-renderer-context"
import {DataListRow} from "./data-list-row"
import {DataListRows} from "./data-list-rows"
import {DataListFetchable} from "./templates/fetchable/data-list-fetchable"

export {getFurthestLeftOfRecyclerType} from "./helpers/get-furthest-left-of-recycler-type"
export {getFurthestRightOfRecyclerType} from "./helpers/get-furthest-right-of-recycler-type"
export {getRelativePositionPerRecyclerType} from "./helpers/get-relative-position-per-recycler-type"

// biome-ignore lint/correctness/noUnusedVariables: namespace expansion
const ReactDataList = DataList as typeof DataList & {
    Row: typeof DataListRow
    Rows: typeof DataListRows
    Fetchable: typeof DataListFetchable
    useRendererContext: typeof useDataListRendererContext
}

ReactDataList.Row = DataListRow
ReactDataList.Rows = DataListRows
ReactDataList.Fetchable = DataListFetchable
ReactDataList.useRendererContext = useDataListRendererContext

namespace ReactDataList {
    export type Descriptor<TRenderItem> = DataListDescriptor<TRenderItem>
    export type RenderListItem<TRenderItem> = DataListRenderListItem<TRenderItem>
    export type RenderListItemInfo<TRenderItem> = DataListRenderListItemInfo<TRenderItem>
    export type RenderListItemInfoWithIndex<TRenderItem> =
        DataListRenderListItemInfoWithIndex<TRenderItem>
}

export {ReactDataList}

export default ReactDataList
