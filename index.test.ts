import { describe, test, expect } from "vitest"
import { isServer } from "solid-js/web"
import { createEffect, createRoot, createSignal } from "solid-js"
import { createTrigger } from "@solid-primitives/trigger"

describe(".", () => {
  test("we are on the server", () => {
    // @ts-expect-error no document on server
    expect(typeof document).toBe("undefined")
  })

  test("but solid thinks we are on the client", () => {
    expect(isServer).toBe(false)
  })

  test("so reactivity should work", () => {
    const [count, setCount] = createSignal(0)
    let captured = -1

    const dispose = createRoot(dispose => {
      createEffect(() => {
        captured = count()
      })
      return dispose
    })

    expect(captured).toBe(0)

    setCount(1)

    expect(captured).toBe(1)

    dispose()
  })

  test("as well as solid-primitives", () => {
    const [track, trigger] = createTrigger()
    let runs = 0

    const dispose = createRoot(dispose => {
      createEffect(() => {
        runs++
        track()
      })
      return dispose
    })

    expect(runs).toBe(1)

    trigger()

    expect(runs).toBe(2)

    dispose()
  })
})
