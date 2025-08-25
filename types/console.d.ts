/** biome-ignore-all lint/suspicious/noExplicitAny: ignore */

declare global {
    interface Console {
        assert(condition?: boolean, ...data: Array<any>): void
        clear(): void
        count(label?: string): void
        countReset(label?: string): void
        debug(...data: Array<any>): void
        dir(item?: any, options?: any): void
        dirxml(...data: Array<any>): void
        error(...data: Array<any>): void
        group(...data: Array<any>): void
        groupCollapsed(...data: Array<any>): void
        groupEnd(): void
        info(...data: Array<any>): void
        log(...data: Array<any>): void
        table(tabularData?: any, properties?: Array<string>): void
        time(label?: string): void
        timeEnd(label?: string): void
        timeLog(label?: string, ...data: Array<any>): void
        timeStamp(label?: string): void
        trace(...data: Array<any>): void
        warn(...data: Array<any>): void
    }

    const console: Console
}

export {}
