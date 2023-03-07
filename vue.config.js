const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    publicPath: '/admin',
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            config.externals = [
                {
                    'vue': 'Vue',
                    'vue-router': 'VueRouter',
                    'axios': 'axios',
                    '@tinymce/tinymce-vue': 'Editor'
                },
                function ({request}, callback) {
                    if (/^tinymce\/.+$/.test(request)) {
                        return callback(null, 'root ' + 'tinymce');
                    }
                    callback();
                }
            ]
            config.entry = './src/main-prod.js'
        } else {
            config.entry = './src/main.js'
        }
    }
})
