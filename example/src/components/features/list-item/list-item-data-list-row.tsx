import * as React from "react"
import {StyleSheet} from "react-native"
import {LIST_HORIZONTAL_MARGIN} from "src/components/design-system/constants"

import ReactDataList, {getRelativePositionPerRecyclerType} from "@attio/react-data-list"

import {ListItem, type ListItemProps} from "./list-item"

interface ListItemItem extends Omit<ListItemProps, "style" | "isFirst" | "isLast"> {
    id: string
}

const renderListItem: ReactDataList.RenderListItem<ListItemItem> = (itemInfo) => {
    const {itemIndex, totalItems} = getRelativePositionPerRecyclerType(itemInfo)

    const item = itemInfo.descriptor.item
    const isFirst = itemIndex === 0
    const isLast = itemIndex === totalItems - 1

    return (
        <ListItem
            name={item.name}
            color={item.color}
            style={styles.container}
            isFirst={isFirst}
            isLast={isLast}
        />
    )
}

export function ListItemDataListRow({name, color}: Omit<ListItemItem, "id">) {
    const id = React.useId()

    return (
        <ReactDataList.Row
            id={id}
            item={React.useMemo(() => ({id, name, color}), [name, color])}
            render={renderListItem}
            recyclerType="list-item"
        />
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: LIST_HORIZONTAL_MARGIN,
    },
})
