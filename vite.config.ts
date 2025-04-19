import {defineConfig, loadEnv, type PluginOption} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from "path";
import eslintPlugin from "vite-plugin-eslint";
import {visualizer} from "rollup-plugin-visualizer"
import externalGlobals from 'rollup-plugin-external-globals'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd())
    if (env.VITE_BUILD_MODE === 'dev') {
        return {
            build: {
                rollupOptions: {
                    input: {
                        main: resolve(__dirname, 'index.html')
                    }
                },
            },
            plugins: getPlugins(env.VITE_BUILD_MODE),
            resolve: getResolve(),
            server: {
                host: '0.0.0.0'
            }
        }
    } else {
        return {
            build: {
                rollupOptions: {
                    input: {
                        main: resolve(__dirname, 'index-prod.html')
                    },
                    externals: ['axios', 'vue', 'vue-router', 'tinymce', '@tinymce/tinymce-vue', 'element-plus', '@element-plus/icons-vue'],
                    plugins: [
                        externalGlobals({
                            'vue': 'Vue',
                            'vue-router': 'VueRouter',
                            'axios': 'axios',
                            '@tinymce/tinymce-vue': 'Editor',
                            'tinymce/tinymce': 'tinymce',
                            'element-plus': 'ElementPlus',
                            '@element-plus/icons-vue': 'ElementPlusIconsVue',
                            'vditor': 'Vditor'
                        })
                    ]
                },
            },
            plugins: getPlugins(env.VITE_BUILD_MODE),
            resolve: getResolve()
        }
    }
})

function getPlugins(mode: string): Array<object> {
    switch (mode) {
        case 'test':
            return [
                vue(),
                eslintPlugin({
                    include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
                }),
                visualizer() as PluginOption
            ]
        case 'dev':
        case 'prod':
            return [
                vue(),
                eslintPlugin({
                    include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
                })
            ]
    }
}

function getResolve(): object {
    return {
        alias: {
            "@": resolve(__dirname, "./src"),
        }
    }
}