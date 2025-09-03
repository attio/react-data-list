import * as React from "react"
import {StyleSheet} from "react-native"

import ReactDataList from "@attio/react-data-list"

import {LIST_HORIZONTAL_MARGIN} from "../../design-system/constants"
import MiddleEarthPlacesDataList, {
    type MiddleEarthPlacesDataListProps,
} from "./middle-earth-places-data-list"

interface MiddleEarthPlacesDataListRowItem
    extends Pick<MiddleEarthPlacesDataListProps, "placeItems"> {
    id: string
}

const renderMiddleEarthPlacesDataList: ReactDataList.RenderListItem<
    MiddleEarthPlacesDataListRowItem
> = ({descriptor: {item}}) => (
    <MiddleEarthPlacesDataList
        placeItems={item.placeItems}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
    />
)

export function MiddleEarthPlacesDataListRow({
    placeItems,
}: Omit<MiddleEarthPlacesDataListRowItem, "id">) {
    const id = React.useId()

    return (
        <ReactDataList.Row
            id={id}
            item={React.useMemo(() => ({id, placeItems}), [placeItems])}
            render={renderMiddleEarthPlacesDataList}
            recyclerType="middle-earth-places-data-list"
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
