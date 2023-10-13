const { merge } = require('webpack-merge')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()
const prodConfig = require('./webpack.prod.js')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer') // 引入分析打包结果插件


module.exports = smp.wrap(merge(prodConfig, {
    plugins:[
        new BundleAnalyzerPlugin()
    ]
}))