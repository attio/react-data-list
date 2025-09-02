import * as React from "react"
import {StyleSheet} from "react-native"
import {LIST_HORIZONTAL_MARGIN} from "src/components/design-system/constants"

import ReactDataList from "@attio/react-data-list"

import {ListHeader, type ListHeaderProps} from "./list-header"

interface ListHeaderItem extends Omit<ListHeaderProps, "style"> {
    id: string
}

const renderListHeader: ReactDataList.RenderListItem<ListHeaderItem> = (itemInfo) => {
    const item = itemInfo.descriptor.item
    const isFirst = itemInfo.index === 0

    return (
        <ListHeader
            title={item.title}
            style={[styles.container, !isFirst && {marginTop: 24}, {marginBottom: 8}]}
        />
    )
}

export function ListHeaderDataListRow({title}: Omit<ListHeaderItem, "id">) {
    const id = React.useId()

    return (
        <ReactDataList.Row
            id={id}
            item={React.useMemo(() => ({id, title}), [id, title])}
            render={renderListHeader}
            recyclerType="list-header"
        />
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: LIST_HORIZONTAL_MARGIN,
    },
})
