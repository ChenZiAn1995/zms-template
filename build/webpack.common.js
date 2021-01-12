const webpack = require('webpack')
const path = require("path");
const paths = require("./paths")

// 引入vue-loader解析器,用于解析Vue文件
const {VueLoaderPlugin} = require("vue-loader");
// 引入Html解析
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { ModuleFederationPlugin } = require("webpack").container;

const deps = require("../package.json").dependencies;
const {component, page, remotes, projectName, filename}=require('./federation')

// 引入配置文件
let env = require('../config/prod.env')
if (process.env.NODE_ENV === 'uat') {
  env = require('../config/uat.env')
} else if (process.env.NODE_ENV === 'test') {
  env = require('../config/test.env')
} else if (process.env.NODE_ENV === 'dev') {
  env = require('../config/dev.env')
} else if (process.env.NODE_ENV === 'dev2') {
  env = require('../config/dev2.env')
} else if (process.env.NODE_ENV === 'local') {
  env = require('../config/local.env')
}

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

    // 存放配置对象，方便项目引用
    new webpack.DefinePlugin({
      // 定义...
      'process.env': JSON.stringify(env)
    }),

    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate',
      // favicon: paths.src + '/images/favicon.png',
      // template file
      template: paths.base + '/index.html', // paths.src + '/template.html',
      filename: 'index.html', // output file
      chunks: ["main"],
    }),

    new VueLoaderPlugin(),

    // 每次构建时清除构建文件夹
    new CleanWebpackPlugin(),

    // 复制静态文件
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
        },
      ],
    }),

    new ModuleFederationPlugin({
      name: projectName,
      filename: filename,
      remotes:[...remotes],
      exposes: {
        ...component,
        ...page
      },
      shared: {...deps}
    }),
  ],

  module: {
    rules: [
      // JavaScript: Use Babel to transpile JavaScript files
      { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] },

      {
        test: /\.vue$/,
        loader: "vue-loader",
      },

      // Styles: Inject CSS into the head with source maps
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 1 },
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },

      // Images: Copy image files to build folder
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },

      // Fonts and SVGs: Inline files
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },
    ]
  },
  resolve: {
    alias: {
      '@': "/src",
      // vue: "@vue/runtime-dom",
    },
    extensions: ["*", ".js", ".vue", ".json"],
  },
}

