var path = require('path');
var webpack = require('webpack');

// Webpack plugins
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var base = path.join(__dirname, '..');
var ENV = process.env.NODE_ENV;

if(!ENV) {
    console.error('ENV not defined');
    process.exit(1);
}

module.exports = {
    context: base,
    cache: true,
    entry: {
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
                    use: {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    }
                })
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production")
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                drop_console: true,
                drop_debugger: true
            }
        }),
        new ExtractTextPlugin('[name].css'),
    ]
}
