const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[hash].app.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|ttf|woff|eot)$/i,
        loader: 'file-loader?name=/media/[name].[ext]',
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader?removeTag=true',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader/url',
          'file-loader',
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /\.(jsx?|tsx?)/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      hash: true,
      title: 'Endian Labs',
    }),
  ],
  resolve: {
    modules: ['components', 'src/scenes', 'src', 'node_modules'],
    extensions: ['.jsx', '.js', '.json', '.css', '*'],
  },
}
