const {defineConfig} = require('@vue/cli-service')
const nodeExternals = require('webpack-node-externals');
module.exports = defineConfig({
    transpileDependencies: true,
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            config.externals = [
                nodeExternals()
            ]
            config.target = 'node'
            config.externalsPresets = {node: true}
            config.entry = './src/main-prod.js'
        } else {
            config.entry = './src/main.js'
        }
    }
})
