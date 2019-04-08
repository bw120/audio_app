const path = require('path');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const sass = require("node-sass");
const sassUtils = require("node-sass-utils")(sass);
const sassVars = require(__dirname + "/src/config.js");

// Credit: https://itnext.io/sharing-variables-between-js-and-sass-using-webpack-sass-loader-713f51fa7fa0
const convertStringToSassDimension = function(result) {
    // Only attempt to convert strings
    if (typeof result !== "string") {
        return result;
    }
    const cssUnits = ["rem", "em", "vh", "vw", "vmin", "vmax", "ex", "%", "px", "cm", "mm", "in", "pt", "pc", "ch"];
    const parts = result.match(/[a-zA-Z]+|[0-9]+/g);
    const value = parts[0];
    const unit = parts[parts.length - 1];
    if (cssUnits.indexOf(unit) !== -1) {
        result = new sassUtils.SassDimension(parseInt(value, 10), unit);
    }
    return result;
};

// convert values from JS config to Sass Vars
const jsToSassVars = {
    "get($keys)": function(keys) {
        keys = keys.getValue().split(".");
        let result = sassVars;
        let i;
        for (i = 0; i < keys.length; i++) {
            result = result[keys[i]];
            if (typeof result === "string") {
                result = convertStringToSassDimension(result);
            } else if (typeof result === "object") {
                Object.keys(result).forEach(function(key) {
                    const value = result[key];
                    result[key] = convertStringToSassDimension(value);
                });
            }
        }
        result = sassUtils.castToSass(result);
        return result;
    }
};

module.exports = (env, argv) => {

    const isDevelopment = (argv.mode === 'development') ? true : false;

    return {
        entry: {
            'ui/renderer': './src/ui/renderer.js',
            'main': './src/main.js',
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist')
        },
        target: "electron-renderer",
        node: {
          __dirname: false,
          __filename: false
        },
        module: {
            rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                },
            }, {
                test: /\.module\.s(a|c)ss$/,
                loader: [
                    isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader, {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[name]__[local]___[hash:base64:5]',
                            camelCase: true,
                            sourceMap: isDevelopment
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: isDevelopment,
                            functions: jsToSassVars
                        }
                    }
                ]
            }, {
                test: /\.s(a|c)ss$/,
                exclude: /\.module.(s(a|c)ss)$/,
                loader: [
                    isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader', {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: isDevelopment,
                            functions: jsToSassVars
                        }
                    }
                ]
            }],
        },
        resolve: {
            extensions: ['.js', '.jsx', '.scss']
        },
        externals: [nodeExternals()],
        plugins: [
            new NodemonPlugin({
                watch: path.resolve('./dist'),
                exec: 'electron ./dist/main.js'
            }),
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[id].css'
            }),
            new HtmlWebpackPlugin({
                excludeChunks: ['main'],
                filename: 'ui/index.html',
                template: 'src/ui/index.html'
            })
        ],
    }
};
