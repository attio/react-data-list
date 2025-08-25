/** biome-ignore-all lint/suspicious/noExplicitAny: ignore */

export type FrameCallback = (timestamp: number) => void

export type RafLike = (cb: FrameCallback) => ReturnType<typeof setTimeout>

export type CafLike = (id: ReturnType<typeof setTimeout>) => void

const hasPerformance =
    typeof globalThis !== "undefined" &&
    typeof (globalThis as any).performance === "object" &&
    typeof (globalThis as any).performance.now === "function"

const now = (): number => (hasPerformance ? (globalThis as any).performance.now() : Date.now())

const hasRAF =
    typeof globalThis !== "undefined" &&
    typeof (globalThis as any).requestAnimationFrame === "function"

const hasCAF =
    typeof globalThis !== "undefined" &&
    typeof (globalThis as any).cancelAnimationFrame === "function"

// ~16ms matches 60Hz; close enough for most non-visual runtimes.
const fallbackRaf: RafLike = (cb) => setTimeout(() => cb(now()), 16)
const fallbackCaf: CafLike = (id) => clearTimeout(id)

export const requestFrame: RafLike = hasRAF
    ? (globalThis as any).requestAnimationFrame.bind(globalThis)
    : fallbackRaf

export const cancelFrame: CafLike = hasCAF
    ? (globalThis as any).cancelAnimationFrame.bind(globalThis)
    : fallbackCaf
