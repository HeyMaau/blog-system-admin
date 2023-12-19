/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SERVER_PATH: string
    readonly VITE_BUILD_MODE: string
    readonly VITE_IMAGE_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}