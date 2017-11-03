const path = require('path');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postcssUrl = require('postcss-url');
const CompressionPlugin = require("compression-webpack-plugin");

const { NoEmitOnErrorsPlugin, LoaderOptionsPlugin } = require('webpack');
const { CommonsChunkPlugin } = require('webpack').optimize;

const nodeModules = path.join(process.cwd(), 'node_modules');
const entryPoints = ["inline","polyfills","sw-register","scripts","styles","vendor","main"];
const baseHref = "wordpress";
const deployUrl = "";
const loader = require('./loader');




module.exports = {
    "devServer": {
        "headers": {
            'Access-Control-Allow-Origin': '*'
        }
    },
    "devtool": "source-map",
    "resolve": {
        "extensions": [
            ".js"
        ],
        "modules": [
            "./node_modules"
        ]
    },
    "resolveLoader": {
        "modules": [
            "./node_modules"
        ]
    },
    "entry": {
        "main": [
            "./src\\main.js"
        ],
        "scripts": loader.scripts,
        "styles": loader.styles
    },
    "output": {
        "path": path.join(process.cwd(), "dist"),
        "filename": "[name].bundle.js",
        "chunkFilename": "[id].chunk.js"
    },
    "module": {
        "rules": [
            {
                "enforce": "pre",
                "test": /\.js$/,
                "exclude": [
                    /\/node_modules\//
                ],
                "loaders": [
                    {
                        loader: 'babel-loader',
                        query: {
                          presets: ['es2015']
                        }
                    },
                    "source-map-loader"
                ]
            },
            {
                "test": /\.json$/,
                "loader": "json-loader"
            },
            {
                "test": /\.html$/,
                "loaders": [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true
                        }
                    }
                ]
            },
            {
                "test": /\.(eot|svg)$/,
                "loader": "file-loader?name=[name].[hash:20].[ext]"
            },
            {
                "test": /\.(jpg|png|gif|otf|ttf|woff|woff2|cur|ani)$/,
                "loader": "url-loader?name=[name].[hash:20].[ext]&limit=10000"
            },
            {
                "exclude": loader.ejects,
                "test": /\.css$/,
                "loaders": [
                    "exports-loader?module.exports.toString()",
                    "css-loader?{\"sourceMap\":false,\"importLoaders\":1}",
                    "postcss-loader"
                ]
            },
            {
                "exclude": loader.ejects,
                "test": /\.scss$|\.sass$/,
                "loaders": [
                    "exports-loader?module.exports.toString()",
                    "css-loader?{\"sourceMap\":false,\"importLoaders\":1}",
                    "postcss-loader",
                    "sass-loader"
                ]
            },
            {
                "exclude": loader.ejects,
                "test": /\.less$/,
                "loaders": [
                    "exports-loader?module.exports.toString()",
                    "css-loader?{\"sourceMap\":false,\"importLoaders\":1}",
                    "postcss-loader",
                    "less-loader"
                ]
            },
            {
                "exclude": loader.ejects,
                "test": /\.styl$/,
                "loaders": [
                    "exports-loader?module.exports.toString()",
                    "css-loader?{\"sourceMap\":false,\"importLoaders\":1}",
                    "postcss-loader",
                    "stylus-loader?{\"sourceMap\":false,\"paths\":[]}"
                ]
            },
            {
                "include": loader.ejects,
                "test": /\.css$/,
                "loaders": ExtractTextPlugin.extract({
                    "use": [
                        "css-loader?{\"sourceMap\":false,\"importLoaders\":1}",
                        "postcss-loader"
                    ],
                    "fallback": "style-loader",
                    "publicPath": ""
                })
            },
            {
                "include": loader.ejects,
                "test": /\.scss$|\.sass$/,
                "loaders": ExtractTextPlugin.extract({
                    "use": [
                        "css-loader?{\"sourceMap\":false,\"importLoaders\":1}",
                        "postcss-loader",
                        "sass-loader"
                    ],
                    "fallback": "style-loader",
                    "publicPath": ""
                })
            },
            {
                "include": loader.ejects,
                "test": /\.less$/,
                "loaders": ExtractTextPlugin.extract({
                    "use": [
                        "css-loader?{\"sourceMap\":false,\"importLoaders\":1}",
                        "postcss-loader",
                        "less-loader"
                    ],
                    "fallback": "style-loader",
                    "publicPath": ""
                })
            },
            {
                "include": loader.ejects,
                "test": /\.styl$/,
                "loaders": ExtractTextPlugin.extract({
                    "use": [
                        "css-loader?{\"sourceMap\":false,\"importLoaders\":1}",
                        "postcss-loader",
                        "stylus-loader?{\"sourceMap\":false,\"paths\":[]}"
                    ],
                    "fallback": "style-loader",
                    "publicPath": ""
                })
            }
        ]
    },
    "plugins": [
        new NoEmitOnErrorsPlugin(),
        new ProgressPlugin(),
        new HtmlWebpackPlugin({
            "template": "./src\\index.html",
            "filename": "./index.html",
            "hash": false,
            "inject": true,
            "compile": true,
            "favicon": false,
            "minify": false,
            "cache": true,
            "showErrors": true,
            "chunks": "all",
            "excludeChunks": [],
            "title": "Webpack App",
            "xhtml": true,
            "chunksSortMode": function sort(left, right) {
                let leftIndex = entryPoints.indexOf(left.names[0]);
                let rightindex = entryPoints.indexOf(right.names[0]);
                if (leftIndex > rightindex) {
                    return 1;
                }
                else if (leftIndex < rightindex) {
                    return -1;
                }
                else {
                    return 0;
                }
            }
        }),
        new CommonsChunkPlugin({
            "name": "inline",
            "minChunks": null
        }),
        new CommonsChunkPlugin({
            "name": "vendor",
            "minChunks": (module) => module.resource && module.resource.startsWith(nodeModules),
            "chunks": [
                "main"
            ]
        }),
        new ExtractTextPlugin({
            "filename": "[name].bundle.css",
            "disable": true
        }),
        new LoaderOptionsPlugin({
            "sourceMap": false,
            "options": {
                "postcss": [
                    autoprefixer(),
                    postcssUrl({"url": (URL) => {
                        // Only convert root relative URLs, which CSS-Loader won't process into require().
                        console.log(URL);
                        if (!URL.startsWith('/') || URL.startsWith('//')) {
                            return URL;
                        }
                        if (deployUrl.match(/:\/\//)) {
                            // If deployUrl contains a scheme, ignore baseHref use deployUrl as is.
                            return `${deployUrl.replace(/\/$/, '')}${URL}`;
                        }
                        else if (baseHref.match(/:\/\//)) {
                            // If baseHref contains a scheme, include it as is.
                            return baseHref.replace(/\/$/, '') +
                                `/${deployUrl}/${URL}`.replace(/\/\/+/g, '/');
                        }
                        else {
                            // Join together base-href, deploy-url and the original URL.
                            // Also dedupe multiple slashes into single ones.
                            return `/${baseHref}/${deployUrl}/${URL}`.replace(/\/\/+/g, '/');
                        }
                    }})
                ],
                "sassLoader": {
                    "sourceMap": false,
                    "includePaths": []
                },
                "lessLoader": {
                    "sourceMap": false
                },
                "context": ""
            }
        }),
        new CompressionPlugin({
            "asset": "[path].gz[query]",
            "algorithm": "gzip",
            "test": /\.js$|\.css$|\.html$/,
            "threshold": 10240,
            "minRatio": 0.8
        })
    ],
    "node": {
        "fs": "empty",
        "global": true,
        "crypto": "empty",
        "tls": "empty",
        "net": "empty",
        "process": true,
        "module": false,
        "clearImmediate": false,
        "setImmediate": false
    }
};
