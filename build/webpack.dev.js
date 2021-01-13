const paths = require('./paths')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
// 引入基础配置并合并到dev配置中
const common = require('./webpack.common.js')

module.exports = merge(common, {
  // 设置webpack模式
  mode: 'development',
  devtool: "source-map",
  optimization: {
    minimize: false,
  },

  devServer: {
    historyApiFallback: true, // 当使用vue-router的history模式时需开启
    contentBase: paths.build, // 告诉服务器内容的来源
    // open: true, // 是否开启新窗口
    compress: true,
    // hot: true, // 是否启用HMR模块热更新
    port: 6600,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
    },
  },

  plugins: [
    // Only update what has changed on hot reload
    new webpack.HotModuleReplacementPlugin(),
  ],
})

