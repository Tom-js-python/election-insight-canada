/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.svg?component' {
  import type { FunctionalComponent, SVGAttributes } from 'vue'

  const component: FunctionalComponent<SVGAttributes>
  export default component
}
