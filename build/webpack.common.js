const webpack = require('webpack')
const path = require("path");
const paths = require("./paths")

// 引入vue-loader解析器,用于解析Vue文件
const { VueLoaderPlugin } = require("vue-loader");
// 引入Html解析
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  // devtool: "source-map",
  // optimization: {
  //   minimize: false,
  // },
  target: "web",
  // Where webpack looks to start building the bundle
  entry: [paths.base + '/index.js'],

  // Where webpack outputs the assets and bundles
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: "auto",
  },

  // Customize the webpack build process
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html', // 自定义 HTML 模板
    }),

    new VueLoaderPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".vue", ".json"],
  },
}
