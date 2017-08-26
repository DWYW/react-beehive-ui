var config = require('../config')
var autoprefixer = require('autoprefixer')
var path = require('path')
var webpack = require('webpack')
const pxtorem = require('postcss-pxtorem')

var projectRoot = path.resolve(__dirname, '../')


var assetsSubDirectory = process.env.NODE_ENV === 'production' ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory
// check env & config/index.js to decide whether to enable CSS source maps for the
// various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
var env = process.env.NODE_ENV
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd

var autoprefixerConfig = {
   browsers: [
      "> 1%",
      "last 4 versions",
      'Android >= 3.2',
      'Firefox >= 20',
      'iOS 7'
   ],
   cascade: true,
   remove: true
}

var pxtoremConfig = {
   rootValue: 100,
   propWhiteList: []
}

module.exports = {
   entry: {
      react:["react", "prop-types", "react-router", "react-redux", "redux"],
      moment: ["moment"],
      app: './src/entry.js'
   },
   output: {
      path: config.build.assetsRoot,
      publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
      filename: '[name].js',
      chunkFilename: '[name].[chunkhash:5].chunk.js'
   },
   resolve: {
      extensions: ['.web.js', '.js', '.jsx', '.json'],
      enforceExtension: false,
      modules: [path.join(__dirname, '../node_modules')],
      alias: {
         'src': path.resolve(__dirname, '../src'),
         'assets': path.resolve(__dirname, '../src/assets'),
         'components': path.resolve(__dirname, '../src/components'),
         'common': path.resolve(__dirname, '../src/common'),
         'i18n': path.resolve(__dirname, '../src/i18n'),
         'mobileUI': path.resolve(__dirname, '../src/mobileUI'),
         'beehive': path.resolve(__dirname, '../src/beehive')
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
         }, {
            test: /\.less$/,
            use:["style-loader", "css-loader",
               {
                  loader: "postcss-loader",
                  options: {
                     plugins: [
                        autoprefixer(autoprefixerConfig),
                        pxtorem(pxtoremConfig)
                     ]
                  }
               }, "less-loader"]
         }, {
            test: /\.(css|scss|sass)$/,
            use:["style-loader", "css-loader",
               {
                  loader: "postcss-loader",
                  options: {
                     plugins: [
                        autoprefixer(autoprefixerConfig),
                        pxtorem(pxtoremConfig)
                     ]
                  }
               }, "sass-loader"]
         }
      ]
   },
   plugins: [
      new webpack.optimize.CommonsChunkPlugin({
         names: ["react", "moment"],
         minChunks: Infinity
      })
   ]
}
