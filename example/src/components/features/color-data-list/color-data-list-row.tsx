import * as React from "react"
import {StyleSheet} from "react-native"

import ReactDataList from "@attio/react-data-list"

import {LIST_HORIZONTAL_MARGIN} from "../../design-system/constants"
import ColorDataList, {type ColorDataListProps} from "./color-data-list"

interface ColorDataListRowItem extends Pick<ColorDataListProps, "colors"> {
    id: string
}

const renderColorDataList: ReactDataList.RenderListItem<ColorDataListRowItem> = ({
    descriptor: {item},
}) => (
    <ColorDataList
        colors={item.colors}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
    />
)

export function ColorDataListRow({colors}: Omit<ColorDataListRowItem, "id">) {
    const id = React.useId()

    return (
        <ReactDataList.Row
            id={id}
            item={React.useMemo(() => ({id, colors}), [id, colors])}
            render={renderColorDataList}
            recyclerType="color-data-list"
        />
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: "stretch",
    },
    contentContainer: {
        marginHorizontal: LIST_HORIZONTAL_MARGIN,
    },
})
