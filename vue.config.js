const webpack = require('webpack');

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
                // less编译附加变量文件
                prependData(loaderContext) {
                    const { resourcePath } = loaderContext;

                    // 只对vue文件添加custom.less变量文件
                    if (/(.vue)$/gi.test(resourcePath)) {
                        return "@import '@/assets/styles/custom.less';";
                    } else {
                        return '';
                    }
                },
            },
        },
    },
    // 需要合并的webpack配置
    configureWebpack: {
        // 添加新的loader
        module: {
            rules: [
                { test: /\.cur$/, use: 'file-loader' },
                {
                    test: /\.md$/,
                    use: [
                        {
                            loader: 'vue-loader',
                        },
                        {
                            loader: require.resolve('./packages/markdown-loader'),
                        },
                    ],
                },
            ],
        },
        // 文件打包拆解
        optimization: {},
        // 其他插件
        plugins: [
            // 定义部分全局变量，打包时候会被替换
            new webpack.DefinePlugin({
                envIsDebug: isDebug,
            }),
        ],
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
