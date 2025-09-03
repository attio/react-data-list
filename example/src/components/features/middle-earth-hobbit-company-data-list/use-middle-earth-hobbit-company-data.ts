import * as React from "react"

import type {MiddleEarthCharacter} from "../../../data/middle-earth-the-fellowship"
import {MIDDLE_EARTH_HOBBIT_COMPANY_NAMES} from "../../../data/middle-earth-hobbit-company"

let middleEarthHobbitCompanyPromise: Promise<ReadonlyArray<MiddleEarthCharacter>> | null = null

function fetchMiddleEarthHobbitCompany(): Promise<ReadonlyArray<MiddleEarthCharacter>> {
    if (!middleEarthHobbitCompanyPromise) {
        middleEarthHobbitCompanyPromise = new Promise<ReadonlyArray<MiddleEarthCharacter>>(
            (resolve) => {
                setTimeout(() => {
                    resolve(MIDDLE_EARTH_HOBBIT_COMPANY_NAMES)
                }, 2000)
            }
        )
    }
    return middleEarthHobbitCompanyPromise
}

const middleEarthHobbitCompanyResource = {
    read(): ReadonlyArray<MiddleEarthCharacter> {
        const promise = fetchMiddleEarthHobbitCompany()
        throw promise
    },
}

fetchMiddleEarthHobbitCompany().then((data) => {
    middleEarthHobbitCompanyResource.read = () => data
})

function resetMiddleEarthHobbitCompanyCache() {
    middleEarthHobbitCompanyPromise = null
    middleEarthHobbitCompanyResource.read = () => {
        const promise = fetchMiddleEarthHobbitCompany()
        promise.then((data) => {
            middleEarthHobbitCompanyResource.read = () => data
        })
        throw promise
    }
}

let mountCount = 0

/**
 * A bodged hook which pretends to fetch some data, using a suspense signal
 * when in a pending state.
 */
export function useMiddleEarthHobbitCompanyData(): ReadonlyArray<MiddleEarthCharacter> {
    React.useEffect(() => {
        mountCount++
        return () => {
            mountCount--
            if (mountCount === 0) {
                resetMiddleEarthHobbitCompanyCache()
            }
        }
    }, [])

    return middleEarthHobbitCompanyResource.read()
}
