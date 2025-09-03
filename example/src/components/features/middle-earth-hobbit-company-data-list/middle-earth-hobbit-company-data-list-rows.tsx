import {CharacterListItemDataListRow} from "../character-list-item/character-list-item-data-list-row"
import {useMiddleEarthHobbitCompanyData} from "./use-middle-earth-hobbit-company-data"

export default function MiddleEarthHobbitCompanyDataListRows() {
    const characters = useMiddleEarthHobbitCompanyData()

    return characters.map((c) => (
        <CharacterListItemDataListRow key={c.name} name={c.name} race={c.race} url={c.url} />
    ))
}
