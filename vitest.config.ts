import { defineConfig } from "vitest/config"
import path from "node:path"

const node_modules = path.resolve(__dirname, "node_modules")

export default defineConfig({
  test: {
    environment: "node",
  },
  resolve: {
    alias: {
      "solid-js/web": path.join(node_modules, "solid-js/web/dist/web.js"),
      "solid-js/store": path.join(node_modules, "solid-js/store/dist/store.js"),
      "solid-js": path.join(node_modules, "solid-js/dist/solid.js"),
    },
    conditions: ["browser"],
  },
})
