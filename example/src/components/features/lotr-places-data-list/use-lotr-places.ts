import * as React from "react"

type Place = {name: string; color: string}

const PLACES: ReadonlyArray<Place> = [
    {name: "Hobbiton", color: "black"},
    {name: "Bree", color: "brown"},
    {name: "Rivendell", color: "sienna"},
    {name: "Mordor", color: "peru"},
    {name: "Minas Tirith", color: "chocolate"},
]

let placesPromise: Promise<ReadonlyArray<Place>> | null = null

function fetchPlaces(): Promise<ReadonlyArray<Place>> {
    if (!placesPromise) {
        placesPromise = new Promise<ReadonlyArray<Place>>((resolve) => {
            setTimeout(() => {
                resolve(PLACES)
            }, 2000)
        })
    }
    return placesPromise
}

const placesResource = {
    read(): ReadonlyArray<Place> {
        const promise = fetchPlaces()
        throw promise
    },
}

fetchPlaces().then((data) => {
    placesResource.read = () => data
})

function resetPlacesCache() {
    placesPromise = null
    placesResource.read = () => {
        const promise = fetchPlaces()
        promise.then((data) => {
            placesResource.read = () => data
        })
        throw promise
    }
}

let mountCount = 0

export function useLotrPlaces(): ReadonlyArray<Place> {
    React.useEffect(() => {
        mountCount++
        return () => {
            mountCount--
            if (mountCount === 0) {
                resetPlacesCache()
            }
        }
    }, [])

    return placesResource.read()
}
