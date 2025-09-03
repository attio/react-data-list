import {CharacterListItemDataListRow} from "../character-list-item/character-list-item-data-list-row"
import {useMiddleEarthHobbitCompanyData} from "./use-middle-earth-hobbit-company-data"

export default function MiddleEarthHobbitCompanyDataListRows() {
    const places = useMiddleEarthHobbitCompanyData()

    return places.map((p) => (
        <CharacterListItemDataListRow key={p.name} name={p.name} race={p.race} url={p.url} />
    ))
}
