const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isDev = process.env.NODE_ENV === 'development'


module.exports = {

    entry: path.join(__dirname, '../src/index.tsx'),
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'static/js/[name].[chunkhash:8].js',
        clean: true,
        publicPath: '/'
    },
    module: {
        rules: [
            {
                include: [path.resolve(__dirname, '../src'),], //只对项目src文件的ts,tsx进行loader解析
                test: /.(ts|tsx)$/,
                enforce: 'pre',
                use: ['thread-loader', 'babel-loader'] //开启多线程也是需要启动时间,大约600ms左右,所以适合规模比较大的项目。
            },
            {
                include: [path.resolve(__dirname, '../src'),], //只对项目src文件的ts,tsx进行loader解析
                test: /.sass$/,
                enforce: 'pre',
                use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader','sass-loader']
            },
            {
                include: [path.resolve(__dirname, '../src'),], //只对项目src文件的ts,tsx进行loader解析
                test: /.css$/,
                enforce: 'pre',
                use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            },
            {
                include: [path.resolve(__dirname, '../src'),], //只对项目src文件的ts,tsx进行loader解析
                test: /.less$/,
                enforce: 'pre',
                use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
            },
            {
                test: /.(png|jpg|jpeg|svg|gif)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024  //小于10k转base64
                    }
                },
                generator: {
                    filename: 'static/images/[name].[contenthash:8][ext]'
                }
            },
            {
                test: /.(woff2?|eot|ttf|otf)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024
                    }
                },
                generator: {
                    filename: 'static/fonts/[name].[contenthash:8][ext]'
                }
            },
            {
                test: /.(mp4|webm|ogg|mp3|wav|flac|acc)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024
                    }
                },
                generator: {
                    filename: 'static/fonts/[name].[contenthash:8][ext]'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.tsx', '.ts'],
        modules: [path.resolve(__dirname, '../node_modules')], // 查找第三方模块只在本项目的node_modules中查找
        alias: {
            "@": path.join(__dirname, '../src')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            inject: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
    ],
    cache: {
        type: 'filesystem'
    },

}