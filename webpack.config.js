/**
 * Created by DNS on 20.09.2017.
 */

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractLess = new ExtractTextPlugin({
    filename: "[name].css"//, .[contenthash]
    //disable: process.env.NODE_ENV === "development"
});
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: __dirname + '/frontend',

    entry: {
        'index': './index.js',
    },
    output: {
        path: __dirname + '/public',
        filename: "./[name].js"
    },

    devtool: 'cheap-inline-module-source-map',

    plugins: [
        new ExtractTextPlugin('[name].css', {allChunks: true}),
        extractLess,
        new HtmlWebpackPlugin({filename: 'index.html',chunks: ['index'],template: './index.pug'})
    ],
    resolve:{
        modules:['node-modules'],
        extensions:['.js', '.styl', '.pug']
    },
    resolveLoader:{
        modules:['node_modules'],
        moduleExtensions: ['-loader'],
        extensions: ['.js']
    },

    module: {

        rules: [{
            test: /\.pug$/,
            use: {
            loader: 'pug',
            options: {
                    pretty: true
                }
            }
        }, {
            test: /\.less$/,
            use: extractLess.extract({
                use: [{
                    loader: "css"
                }, {
                    loader: "less"
                }],
            })
        }, {
            test: /\.(png|ipg|svg|ttf|eot|woff|woff2)$/,
            loader: 'file?name=[path][name].[ext]'
        }]
    }
};