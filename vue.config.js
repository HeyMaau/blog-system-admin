const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            config.externals = {
                'vue': 'Vue',
                'element-ui': 'ELEMENT'
            }
            config.entry = './src/main-prod.js'
        } else {
            config.entry = './src/main.js'
        }
    }
})
