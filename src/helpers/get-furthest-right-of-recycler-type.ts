import type {
    DataListRenderListItemInfo,
    DataListRenderListItemInfoWithIndex,
} from "../data-list-types"

export function getFurthestRightOfRecyclerType<TRenderItem>(
    itemInfo: Pick<DataListRenderListItemInfoWithIndex<TRenderItem>, "index" | "allData"> & {
        descriptor: Pick<DataListRenderListItemInfo<TRenderItem>["descriptor"], "recyclerType">
    }
) {
    let lastIndex = itemInfo.index
    while (lastIndex < itemInfo.allData.length - 1) {
        const nextItem = itemInfo.allData[lastIndex + 1]
        if (nextItem && nextItem.descriptor.recyclerType !== itemInfo.descriptor.recyclerType) {
            break
        }
        lastIndex++
    }

    return lastIndex
}
