import * as React from "react"
import {StyleSheet, View} from "react-native"
import {useSafeAreaInsets} from "react-native-safe-area-context"

import {ReactDataList} from "@attio/react-data-list"

import {Box} from "../../src/components/design-system/box"
import {Button} from "../../src/components/design-system/button"
import {LIST_HORIZONTAL_MARGIN} from "../../src/components/design-system/constants"
import {CharacterListItemDataListRow} from "../../src/components/features/character-list-item/character-list-item-data-list-row"
import {ListHeaderDataListRow} from "../../src/components/features/list-header/list-header-data-list-row"
import {LoadingListItemDataListRow} from "../../src/components/features/loading-list-item/loading-list-item-data-list-row"
import MiddleEarthHobbitCompanyDataListRows from "../../src/components/features/middle-earth-hobbit-company-data-list/middle-earth-hobbit-company-data-list-rows"
import {MiddleEarthPlacesDataListRow} from "../../src/components/features/middle-earth-places-data-list/middle-earth-places-data-list-row"
import {MIDDLE_EARTH_PLACES} from "../../src/data/middle-earth-places"
import {
    MIDDLE_EARTH_THE_FELLOWSHIP,
    type MiddleEarthCharacter,
} from "../../src/data/middle-earth-the-fellowship"
import {FlashListRenderer} from "../../src/data-list/flashlist-renderer"

const getJumbledFellowship = () =>
    MIDDLE_EARTH_THE_FELLOWSHIP.slice().sort(() => Math.random() - 0.5)

function ErrorOnRenderCheck() {
    return (
        <View
            onLayout={() => {
                throw new Error("This never happens as we evaluate descriptors before first paint.")
            }}
        />
    )
}

function Header({
    toggleThorinAndCompany,
    jumbleFellowship,
}: {
    toggleThorinAndCompany: () => void
    jumbleFellowship: () => void
}) {
    return (
        <Box
            flexDirection="row"
            gap="4"
            marginHorizontal={`${LIST_HORIZONTAL_MARGIN}`}
            marginBottom="16"
            flexShrink={1}
        >
            <Button onPress={toggleThorinAndCompany} title="Toggle Thorin and Company" />
            <Button onPress={jumbleFellowship} title="Jumble Fellowship" />
        </Box>
    )
}

export default function HomeScreen() {
    const [fellowship, setFellowship] =
        React.useState<ReadonlyArray<MiddleEarthCharacter>>(getJumbledFellowship)
    const [isShowingThorinAndCompany, setIsShowingThorinAndCompany] = React.useState(false)

    const toggleThorinAndCompany = () => {
        setIsShowingThorinAndCompany((s) => !s)
    }

    // Jumble fellowship to test recreating list.
    const jumbleFellowship = () => {
        setFellowship(getJumbledFellowship())
    }

    const insets = useSafeAreaInsets()
    const contentContainerStyle = [
        styles.contentContainer,
        {paddingTop: insets.top, paddingBottom: insets.bottom},
    ]

    return (
        <ReactDataList
            renderer={
                <FlashListRenderer
                    contentContainerStyle={contentContainerStyle}
                    ListHeaderComponent={
                        <Header
                            toggleThorinAndCompany={toggleThorinAndCompany}
                            jumbleFellowship={jumbleFellowship}
                        />
                    }
                />
            }
            renderEmpty={() => (
                <View style={styles.alert}>
                    <ErrorOnRenderCheck />
                </View>
            )}
        >
            {/* Supports nested ReactDataList instances */}
            <ListHeaderDataListRow title="Places in Middle Earth" />
            <MiddleEarthPlacesDataListRow placeItems={MIDDLE_EARTH_PLACES} />

            <ListHeaderDataListRow title="The Fellowship" />
            {fellowship.map((character) => (
                <CharacterListItemDataListRow
                    key={character.name}
                    name={character.name}
                    race={character.race}
                    url={character.url}
                />
            ))}

            {isShowingThorinAndCompany && (
                <>
                    <ListHeaderDataListRow title="Thorin and Company" />
                    <React.Suspense fallback={<LoadingListItemDataListRow />}>
                        <MiddleEarthHobbitCompanyDataListRows />
                    </React.Suspense>
                </>
            )}
        </ReactDataList>
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
