const common = require('./webpack.common.config.js')
const path = require('path')
const { merge } = require('webpack-merge') 

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    port: '3000',
    static: {
      directory: path.resolve(__dirname, '..')
    },
    devMiddleware: {
      index: 'index.html',
      writeToDisk: true
    },
    client: {
      overlay: true
    },
    liveReload: false
  }
})