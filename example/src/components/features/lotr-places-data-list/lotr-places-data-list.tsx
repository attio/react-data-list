import {ListItemDataListRow} from "src/components/features/list-item/list-item-data-list-row"

import {useLotrPlaces} from "./use-lotr-places"

export default function LotrPlacesDataList() {
    const places = useLotrPlaces()

    return places.map((p) => <ListItemDataListRow key={p.name} name={p.name} color={p.color} />)
}
