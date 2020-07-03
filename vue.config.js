var webpack = require('webpack');

const isDebug = process.env.NODE_ENV !== 'production';

module.exports = {
    publicPath: './',
    filenameHashing: isDebug,
    productionSourceMap: isDebug,
    css: {
        loaderOptions: {
            // 给 less-loader 传递选项
            less: {
                lessOptions: {
                    javascriptEnabled: true,
                },
            },
        },
    },
    // 需要合并的webpack配置
    configureWebpack: {
        // 文件打包拆解
        optimization: {},
        // 其他插件
        plugins: [
            // 定义部分全局变量，打包时候会被替换
            new webpack.DefinePlugin({
                env_isDebug: isDebug,
            }),
        ],
    },
    // 链式修改webpack配置
    chainWebpack: config => {
        // cur文件 Loader
        config.module
            .rule('cur')
            .test(/\.cur$/)
            .use('file-loader')
            .loader('file-loader')
            .end();
    },
    // 需要babel转义的第三方库
    transpileDependencies: [/view-design/],
    // 开发用代理服务配置
    devServer: {
        port: 9000,
        proxy: {
            // 本地
            '/proxy1': {
                target: 'http://localhost:8010',
                // changeOrigin: true,
                pathRewrite: { '^/proxy1': '' },
            },
        },
    },
};
