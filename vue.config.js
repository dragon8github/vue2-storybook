const path = require('path')

const resolve = dir => path.join(__dirname, dir)


module.exports = {
    configureWebpack: config => {
        // 开启 source-map 方便调试
        if (process.env.NODE_ENV === 'development') {
            config.devtool = 'source-map'
        }

        // 环境变量
        config.resolve = {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                '@': resolve('src'),
            },
        }
        
        config.resolveLoader = {
            // （必须）配置使用本地的 loader
            modules: ['node_modules','./loader/'],
        }
    },
    // webpack 链式扩展
    chainWebpack: config => {
        const autoInferRule = config.module.rule('autoInfer')
        autoInferRule.uses.clear()
        autoInferRule
            .test(/\.vue$/)
            .use('autoInfer-loader')
            .loader('autoInfer-loader')
            .options({ name: 'hello loader' })
            .end()
    },
    // 本地环境代理地址
    devServer: {
        port: 3333,
        proxy: {
            '/api': {
                target: 'http://19.104.53.58/dls-map/visual/',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': '/',
                },
            },
        },
    },
    css: {
        // 开发环境可以看到css源文件
        sourceMap: process.env.NODE_ENV === 'production' ? false : true,
        loaderOptions: {
            sass: {
                // fixbug: sass 的 @use "sass:math"; 语法
                prependData: `
                @use "@/scss/functions.scss" as *;
                `,
            },
        },
    },
}
