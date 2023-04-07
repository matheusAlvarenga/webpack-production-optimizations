const common = require('./webpack.common.config.js')
const path = require('path')
const { merge } = require('webpack-merge') 

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: 'main.js'
  },
  devServer: {
    port: '3000',
    static: {
      directory: path.resolve(__dirname, '../dist')
    },
    devMiddleware: {
      index: 'index.html',
      writeToDisk: true
    },
    client: {
      overlay: true
    },
    liveReload: false
  },
  module: {
    rules: [
      {
        //  THIS RULE IS FOR SIMPLE CSS WITHOUT CSS MODULES
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        // THIS RULE IS FOR CSS MODULES
        test: /\.css$/,
        include: /\.module\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                // THIS MAKE THE CSS MODULES CLASSES READABLE IN DEV MODE
                localIdentName: '[local]--[md4:hash:7]'
              }
            }
          }
        ]
      },
      {
        // THIS RULE IS FOR LESS FILES
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        // THIS RULE IS FOR SASS FILES
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
})
