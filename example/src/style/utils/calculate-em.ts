const EM_SUFFIX = "em" as const

export function calculateEm(emString: `${number}${typeof EM_SUFFIX}`, emBase: number) {
    if (!emString.endsWith(EM_SUFFIX)) {
        throw new Error(`The value must be in ${EM_SUFFIX} units`)
    }

    const suffixRemoved = emString.slice(0, -EM_SUFFIX.length)
    const emValue = Number.parseFloat(suffixRemoved)
    if (Number.isNaN(emValue)) {
        throw new TypeError("The value must be a number")
    }

    return emValue * emBase
}
