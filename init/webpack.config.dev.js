'use strict'

let path = require('path')
let webpack = require('webpack')

console.log(__dirname)

module.exports = {
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    modulesDirectories: [
      path.join(__dirname, 'src'),
      'node_modules',
      'node_modules/component-archetype/node_modules'
    ]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        loader: require.resolve('babel-loader'),
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.png$/,
        loader: require.resolve('url-loader') + '?limit=100000'
      }
    ]
  }
}
