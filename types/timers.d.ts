declare global {
    // Note: Timeout returns number in DOM, but object in Node; here we pretend they're unknown.
    function setTimeout(fcn: () => void, ms: number): unknown

    function clearTimeout(timeout: ReturnType<typeof setTimeout>): void

    function setInterval(fcn: () => void, ms: number): unknown

    function clearInterval(interval: ReturnType<typeof setInterval>): void
}

export {}
