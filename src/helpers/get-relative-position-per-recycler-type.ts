import type {
    DataListRenderListItemInfo,
    DataListRenderListItemInfoWithIndex,
} from "../data-list-types"
import {getFurthestLeftOfRecyclerType} from "./get-furthest-left-of-recycler-type"
import {getFurthestRightOfRecyclerType} from "./get-furthest-right-of-recycler-type"

export function getRelativePositionPerRecyclerType<TRenderItem>(
    itemInfo: Pick<
        DataListRenderListItemInfoWithIndex<TRenderItem>,
        "index" | "allData" | "descriptorSourceIndex"
    > & {descriptor: Pick<DataListRenderListItemInfo<TRenderItem>["descriptor"], "recyclerType">}
) {
    const firstPickerItemIndex = getFurthestLeftOfRecyclerType(itemInfo)
    const lastPickerItemIndex = getFurthestRightOfRecyclerType(itemInfo)

    const distanceFromFirstPickerItem = itemInfo.index - firstPickerItemIndex

    const itemIndex = distanceFromFirstPickerItem
    const totalItems = lastPickerItemIndex - firstPickerItemIndex + 1

    return {itemIndex, totalItems}
}
