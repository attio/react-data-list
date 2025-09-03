import * as React from "react"
import {StyleSheet} from "react-native"

import ReactDataList, {getRelativePositionPerRecyclerType} from "@attio/react-data-list"

import {LIST_HORIZONTAL_MARGIN} from "../../design-system/constants"
import {CharacterListItem, type CharacterListItemProps} from "./character-list-item"

interface CharacterListItemItem
    extends Omit<CharacterListItemProps, "style" | "isFirst" | "isLast"> {
    id: string
}

const renderListItem: ReactDataList.RenderListItem<CharacterListItemItem> = (itemInfo) => {
    const {itemIndex, totalItems} = getRelativePositionPerRecyclerType(itemInfo)

    const item = itemInfo.descriptor.item
    const isFirst = itemIndex === 0
    const isLast = itemIndex === totalItems - 1

    return (
        <CharacterListItem
            name={item.name}
            race={item.race}
            url={item.url}
            style={styles.container}
            isFirst={isFirst}
            isLast={isLast}
        />
    )
}

export function CharacterListItemDataListRow({name, race, url}: Omit<CharacterListItemItem, "id">) {
    const id = React.useId()

    return (
        <ReactDataList.Row
            id={id}
            item={React.useMemo(() => ({id, name, race, url}), [name, race, url])}
            render={renderListItem}
            recyclerType="character-list-item"
        />
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: LIST_HORIZONTAL_MARGIN,
    },
})
