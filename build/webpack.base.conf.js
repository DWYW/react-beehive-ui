var config = require('../config')
var path = require('path')

var projectRoot = path.resolve(__dirname, '../')

var assetsSubDirectory = process.env.NODE_ENV === 'production' ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory
// check env & config/index.js to decide whether to enable CSS source maps for the
// various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
var env = process.env.NODE_ENV
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd

module.exports = {
   entry: {
      app: './src/entry.js'
   },
   output: {
      path: config.build.assetsRoot,
      publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
      filename: '[name].js'
   },
   resolve: {
      extensions: ['.js', '.jsx', '.json'],
      enforceExtension: false,
      modules: [path.join(__dirname, '../node_modules')],
      alias: {
         'src': path.resolve(__dirname, '../src'),
         'assets': path.resolve(__dirname, '../src/assets'),
         'components': path.resolve(__dirname, '../src/components')
      }
   },
   resolveLoader: {
      modules: [path.join(__dirname, '../node_modules')]
   },
   module: {
      rules: [

         {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            use: [{
               loader: 'url-loader',
               options: {
                  limit: 10000,
                  name: path.posix.join(assetsSubDirectory, 'img/[name].[hash:7].[ext]')
               }
            }]
         }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            use: [{
               loader:'url-loader',
               options:{
                  limit: 1000,
                  name: path.posix.join(assetsSubDirectory, 'fonts/[name].[hash:7].[ext]')
               }
            }]
         }, {
            test: /\.(js|jsx)?$/,
            use: ['babel-loader'],
            include: path.join(projectRoot, 'src'),
            exclude: /node_modules/
         }
      ]
   }
}