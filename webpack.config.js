const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require( 'nodemon-webpack-plugin' )

module.exports = {
  entry: {
  	'ui/renderer': './src/ui/renderer.js',
  	'main': './src/main.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
      },
    ],
  },
  externals: [nodeExternals()],
  plugins: [
    new CopyPlugin([
      { from: './src/ui/index.html', to: 'ui/index.html' },
    ]),
    new NodemonPlugin({
      watch: path.resolve('./dist'),
      exec: ' electron ./dist/main.js'
    })
  ],
};