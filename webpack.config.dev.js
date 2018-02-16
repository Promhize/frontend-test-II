const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const merge = require('webpack-merge')
const common = require('./webpack.config.common.js')

module.exports = merge(common, {
  entry: [
    '@babel/polyfill',
    'react-hot-loader/patch',
    './src/setup/client.jsx',
  ],
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    hot: true,
    port: 2020,
    open: true,
    openPage: '',
    stats: {
      modules: false,
      performance: true,
      timings: true,
      warnings: true,
    },
    historyApiFallback: true,
    publicPath: '/',
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
})
