const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
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
        }
    },
    pages: {
        index: {
            entry: process.env.NODE_ENV === 'production' ? 'src/main-prod.js' : 'src/main.js',
            title: '后台管理 - 卧卷'
        }
    }
})
