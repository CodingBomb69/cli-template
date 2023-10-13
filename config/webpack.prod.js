const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const PurgeCSSPlugin = require('purgecss-webpack-plugin')
const globAll = require('glob-all')
const glob = require('glob')
const CompressionPlugin  = require('compression-webpack-plugin')

module.exports = merge(baseConfig, {
    mode: 'production',   // 生产模式,会开启tree-shaking和压缩代码,以及其他优化
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../public'),
                    to: path.resolve(__dirname, '../dist'),
                    filter: source => {
                        return !source.includes('index.html') //忽略了index.html,因为html-webpack-plugin会以public下的index.html为模板生成一个index.html到dist文件下,所以不需要再复制该文件了。
                    }
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:8].css'
        }),
        new PurgeCSSPlugin({
            // 检测src下所有tsx文件和public下index.html中使用的类名和id和标签名称
            // 只打包这些文件中用到的样式
            paths: globAll.sync([
                `${path.join(__dirname, '../src')}/**/*.tsx`,
                path.join(__dirname, '../public/index.html')
            ]),
            safelist: {
                standard: [/^ant-/], // 过滤以ant-开头的类名，哪怕没用到也不删除
            }
        }),
        new CompressionPlugin({
            test:/.(js|css)$/,
            filename:'[path][base].gz',
            algorithm:'gzip', // 压缩格式,默认是gzip
            threshold: 10240, // 只有大小大于该值的资源会被处理。默认值是 10k
            minRatio: 0.8 // 压缩率,默认值是 0.8
        })
    ],
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),  //压缩css
            new TerserPlugin({
                parallel: true, // 开启多线程压缩js
                terserOptions: {
                    compress: {
                        pure_funcs: ['console.log'] // 删除console.log
                    }
                }
            })
        ],
        splitChunks: {
            cacheGroups: {
                vendors: {  //node_modules
                    test: /node_modules/,
                    name: 'vendors',
                    minChunks: 1,
                    chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
                    minSize: 0,
                    priority: 1 //优先级1
                },
                commons: {
                    name: 'commons',
                    minChunks: 2,
                    chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
                    minSize: 0,
                }
            }
        }
    }
})