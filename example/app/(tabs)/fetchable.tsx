import * as React from "react"
import {StyleSheet, View} from "react-native"
import {useSafeAreaInsets} from "react-native-safe-area-context"

import {ReactDataList} from "@attio/react-data-list"

import {Box} from "../../src/components/design-system/box"
import {Button} from "../../src/components/design-system/button"
import {LIST_HORIZONTAL_MARGIN} from "../../src/components/design-system/constants"
import {ListHeaderDataListRow} from "../../src/components/features/list-header/list-header-data-list-row"
import {LoadingListItemDataListRow} from "../../src/components/features/loading-list-item/loading-list-item-data-list-row"
import MiddleEarthHobbitCompanyDataListRows from "../../src/components/features/middle-earth-hobbit-company-data-list/middle-earth-hobbit-company-data-list-rows"
import {FlashListRenderer} from "../../src/data-list/flashlist-renderer"

function ErrorOnRenderCheck() {
    return (
        <View
            onLayout={() => {
                throw new Error("This never happens as we evaluate descriptors before first paint.")
            }}
        />
    )
}

function Header({reload}: {reload: () => void}) {
    return (
        <Box
            flexDirection="column"
            gap="4"
            marginHorizontal={`${LIST_HORIZONTAL_MARGIN}`}
            marginBottom="16"
            flexShrink={1}
        >
            <Button onPress={reload} title="Reload" />
        </Box>
    )
}

export default function FetchableScreen() {
    const [reloadKey, setReloadKey] = React.useState(1)

    // Jumble fellowship to test recreating list.
    const reload = () => {
        setReloadKey((k) => k + 1)
    }

    const insets = useSafeAreaInsets()
    const contentContainerStyle = [
        styles.contentContainer,
        {paddingTop: insets.top, paddingBottom: insets.bottom},
    ]

    return (
        <ReactDataList.Fetchable
            renderer={
                <FlashListRenderer
                    contentContainerStyle={contentContainerStyle}
                    ListHeaderComponent={<Header reload={reload} />}
                />
            }
            /**
             * This catches the suspense signal from below and gives us a
             * chance to attach a different set of rows.
             */
            renderPendingRows={
                <>
                    <ListHeaderDataListRow title="Thorin and Company" />
                    <LoadingListItemDataListRow />
                    <LoadingListItemDataListRow />
                    <LoadingListItemDataListRow />
                    <LoadingListItemDataListRow />
                    <LoadingListItemDataListRow />
                    <LoadingListItemDataListRow />
                </>
            }
            renderEmpty={() => (
                <View style={styles.alert}>
                    <ErrorOnRenderCheck />
                </View>
            )}
        >
            <ListHeaderDataListRow title="Thorin and Company" />
            {/* This component throws a suspense signal whilst loading */}
            <MiddleEarthHobbitCompanyDataListRows key={reloadKey} />
        </ReactDataList.Fetchable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        flex: 1,
    },
    contentContainer: {
        marginBottom: 64,
    },
    alert: {
        width: "100%",
        aspectRatio: 1,
        backgroundColor: "red",
    },
})
