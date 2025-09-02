import * as React from "react"
import {StyleSheet, View} from "react-native"
import {useSafeAreaInsets} from "react-native-safe-area-context"
import {ListItemDataListRow} from "src/components/features/list-item/list-item-data-list-row"

import {ReactDataList} from "@attio/react-data-list"

import {Button} from "../../src/components/design-system/button"
import {LIST_HORIZONTAL_MARGIN} from "../../src/components/design-system/constants"
import {ColorDataListRow} from "../../src/components/features/color-data-list/color-data-list-row"
import {ListHeaderDataListRow} from "../../src/components/features/list-header/list-header-data-list-row"
import LotrPlacesDataList from "../../src/components/features/lotr-places-data-list/lotr-places-data-list"
import {FlashListRenderer} from "../../src/data-list/flashlist-renderer"

const styles = StyleSheet.create({
    container: {
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
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
        marginHorizontal: LIST_HORIZONTAL_MARGIN,
        marginBottom: 16,
    },
})

const PEOPLE_NAMES = [
    {name: "Thorin", color: "black"},
    {name: "Fíli", color: "blue"},
    {name: "Kíli", color: "green"},
    {name: "Oín", color: "red"},
    {name: "Glóin", color: "orange"},
    {name: "Balin", color: "purple"},
    {name: "Dwalin", color: "brown"},
    {name: "Ori", color: "pink"},
    {name: "Dori", color: "yellow"},
    {name: "Nori", color: "cyan"},
    {name: "Bifur", color: "magenta"},
    {name: "Bofur", color: "lime"},
    {name: "Bombur", color: "navy"},
    {name: "Bilbo", color: "gold"},
    {name: "Gandalf", color: "silver"},
]

const WEAPONS = [
    "Sting",
    "Glamdring",
    "Orcrist",
    "Andúril",
    "Narsil",
    "Herugrim",
    "Hadhafang",
    "Aeglos",
    "Gurthang",
    "Ringil",
]

const ALL_COLORS = [
    "aquamarine",
    "coral",
    "crimson",
    "darkgoldenrod",
    "darkolivegreen",
    "deeppink",
    "deepskyblue",
    "dimgray",
    "dodgerblue",
    "firebrick",
    "forestgreen",
    "fuchsia",
]

const getJumbledPeople = () => PEOPLE_NAMES.slice().sort(() => Math.random() - 0.5)

function ErrorOnRenderCheck() {
    return (
        <View
            onLayout={() => {
                throw new Error("This never happens as we evaluate descriptors before first paint.")
            }}
        />
    )
}

export default function HomeScreen() {
    const [people, setPeople] = React.useState<typeof PEOPLE_NAMES>(getJumbledPeople)
    const [isShowingPlaces, setIsShowingPlaces] = React.useState(false)

    const togglePlaces = () => {
        setIsShowingPlaces((s) => !s)
    }

    const jumblePeople = () => {
        console.log("Jumble people to test recreating list.")
        setPeople(getJumbledPeople())
    }

    const insets = useSafeAreaInsets()

    return (
        <ReactDataList
            renderer={
                <FlashListRenderer
                    contentContainerStyle={[
                        styles.contentContainer,
                        {paddingTop: insets.top, paddingBottom: insets.bottom},
                    ]}
                    ListHeaderComponent={
                        <View style={styles.header}>
                            <Button
                                onPress={togglePlaces}
                                title={isShowingPlaces ? "Hide Places" : "Show Places"}
                            />
                            <Button onPress={jumblePeople} title="Jumble People" />
                        </View>
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
            <ListHeaderDataListRow title="Colors" />
            <ColorDataListRow colors={ALL_COLORS} />

            {isShowingPlaces && (
                <>
                    <ListHeaderDataListRow title="Places" />
                    <React.Suspense
                        fallback={<ListItemDataListRow name="Loading places..." color="black" />}
                    >
                        <LotrPlacesDataList />
                    </React.Suspense>
                </>
            )}

            <ListHeaderDataListRow title="People" />
            {people.map((person) => (
                <ListItemDataListRow key={person.name} name={person.name} color={person.color} />
            ))}

            <ListHeaderDataListRow title="Weapons" />
            {WEAPONS.map((weapon, idx) => (
                <ListItemDataListRow
                    key={weapon}
                    name={weapon}
                    color={ALL_COLORS.at(idx % ALL_COLORS.length) ?? "black"}
                />
            ))}
        </ReactDataList>
    )
}
