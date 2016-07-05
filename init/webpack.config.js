const path = require('path')
const join = path.join
const resolve = path.resolve
const webpack = require('webpack')

const commons = new webpack.optimize.CommonsChunkPlugin({
  name: 'vendor',
})

module.exports = env => ({
  entry: {
    app: (env.dev && [
      'react-hot-loader/patch',
      'eventsource-polyfill', // necessary for hot reloading with IE
      'webpack-hot-middleware/client',
      './index',
    ]) || (env.prod && [
      './index',
    ]),
    vendor: ['babel-polyfill', 'react', 'react-dom'],
  },
  output: {
    filename: 'bundle-[name].js',
    path: resolve(__dirname, 'dist'),
    pathinfo: !env.prod,
    publicPath: '/static/',
  },
  plugins: (env.dev && [
    commons,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ]) || (env.prod && [
    commons,
    new webpack.optimize.OccurrenceOrderPlugin(),
    // global process.env.NODE_ENV available at build time
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    // don't use -p flag if doing this
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
      },
      compressor: {
        warnings: false,
      },
    }),
  ]),
  context: resolve(__dirname, 'src'),
  devtool: env.prod ? 'cheap-module-source-map' : 'cheap-eval-source-map',
  bail: env.prod,
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        loader: 'babel-loader',
        include: join(__dirname, 'src'),
      },
      {
        test: /\.png$/,
        loader: 'url-loader?limit=100000',
      },
    ],
  },
})
