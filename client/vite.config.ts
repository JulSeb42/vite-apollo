import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import macrosPlugin from "vite-plugin-babel-macros"
import tsconfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), macrosPlugin(), tsconfigPaths()],
})
