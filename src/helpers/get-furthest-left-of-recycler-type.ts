import type {
    DataListRenderListItemInfo,
    DataListRenderListItemInfoWithIndex,
} from "../data-list-types"

export function getFurthestLeftOfRecyclerType<TRenderItem>(
    itemInfo: Pick<DataListRenderListItemInfoWithIndex<TRenderItem>, "index" | "allData"> & {
        descriptor: Pick<DataListRenderListItemInfo<TRenderItem>["descriptor"], "recyclerType">
    }
) {
    let firstItemIndex = itemInfo.index
    while (firstItemIndex > 0) {
        const prevItem = itemInfo.allData[firstItemIndex - 1]
        if (prevItem && prevItem.descriptor.recyclerType !== itemInfo.descriptor.recyclerType) {
            break
        }
        firstItemIndex--
    }

    return firstItemIndex
}
