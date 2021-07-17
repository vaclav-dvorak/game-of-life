const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const serverConfig = {
  target: 'node',
  mode: 'production',
  entry: {
    server: './server.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'server.js',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        include: /server.js$/,
      }),
    ],
  },
  ignoreWarnings: [
    {
      module: /node_modules\/express\/lib\/view\.js/,
      message: /the request of a dependency is an expression/,
    },
  ],
}

const clientConfig = {
  mode: 'production',
  entry: {
    game: './static/js/game.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].[contenthash].js',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Conway's Game of life",
      template: 'index.html.tpl',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        include: /\.js$/,
      }),
    ],
  },
}

module.exports = [serverConfig, clientConfig]
