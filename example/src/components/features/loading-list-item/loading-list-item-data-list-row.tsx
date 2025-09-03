import * as React from "react"
import {StyleSheet} from "react-native"

import ReactDataList, {getRelativePositionPerRecyclerType} from "@attio/react-data-list"

import {LIST_HORIZONTAL_MARGIN} from "../../design-system/constants"
import {LoadingListItem, type LoadingListItemProps} from "./loading-list-item"

interface LoadingListItemItem extends Omit<LoadingListItemProps, "style" | "isFirst" | "isLast"> {
    id: string
}

const renderListItem: ReactDataList.RenderListItem<LoadingListItemItem> = (itemInfo) => {
    const {itemIndex, totalItems} = getRelativePositionPerRecyclerType(itemInfo)

    const isFirst = itemIndex === 0
    const isLast = itemIndex === totalItems - 1

    return <LoadingListItem style={styles.container} isFirst={isFirst} isLast={isLast} />
}

export function LoadingListItemDataListRow() {
    const id = React.useId()

    return (
        <ReactDataList.Row
            id={id}
            item={React.useMemo(() => ({id}), [])}
            render={renderListItem}
            recyclerType="loading-list-item"
        />
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: LIST_HORIZONTAL_MARGIN,
    },
})
