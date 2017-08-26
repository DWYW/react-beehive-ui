var baseWebpackConfig = require('./webpack.base.conf')
var config = require('../config')
var FriendlyErrors = require('friendly-errors-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function(name) {
      baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
   })
//add fetch
Object.keys(baseWebpackConfig.entry).forEach(function(name) {
      baseWebpackConfig.entry[name] = ['whatwg-fetch'].concat(baseWebpackConfig.entry[name])
   })

module.exports = merge(baseWebpackConfig, {
   module: {
      rules: [{
         test: /\.(js|jsx)?$/,
         enforce: 'pre',
         use: [{
            loader: 'eslint-loader',
            options: {
               configFile: './.eslint.js'
            }
         }],
         include: path.resolve(__dirname, '../src'),
         exclude: /node_modules/
      }]
   },
   // eval-source-map is faster for development
   devtool: 'eval-source-map',
   plugins: [
      new webpack.DefinePlugin({
         'process.env': config.dev.env
      }),
      // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      // https://github.com/ampedandwired/html-webpack-plugin
      new HtmlWebpackPlugin({
         filename: 'index.html',
         template: 'index.html',
         inject: true
      }),
      new FriendlyErrors()
   ]
})