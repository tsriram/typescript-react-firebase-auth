var path = require('path');
var webpack = require('webpack');

// Webpack plugins
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var base = path.join(__dirname, '..');
var ENV = process.env.NODE_ENV || 'dev';

module.exports = {
    context: base,
    cache: true,
    entry: {
        webpackdev: 'webpack-dev-server/client?http://localhost:3000',
        app: './src/index.tsx'
    },
    output: {
        path: path.join(__dirname, '..', 'dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[id].chunk.js',
        publicPath: '/'
    },
    resolve: {
        modules: [
            path.join(__dirname, 'src'),
            'node_modules'
        ],
        extensions: ['.js', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['awesome-typescript-loader']
            },
            {
                test: /\.css$/i,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader']
                })
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'app/index.html',
            inject: true
        }),
        new ExtractTextPlugin('[name].css'),
    ]
}
