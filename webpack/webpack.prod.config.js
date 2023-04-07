const common = require('./webpack.common.config.js')
const { merge } = require('webpack-merge') 

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: 'js/[name].[contenthash:6].js'
    },
    optimization: {
      minimize: true,
      minimizer: [
        '...',
        new CssMinimizerPlugin({
          minimizerOptions: {
            preset: [
              'default',
              {
                discardComments: { removeAll: true }
              }
            ]
          }
        })
      ]
    },
    module: {
      rules: [
        {
          //  THIS RULE IS FOR SIMPLE CSS WITHOUT CSS MODULES
          test: /\.css$/,
          exclude: /\.module\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader'
          ]
        },
        {
          // THIS RULE IS FOR CSS MODULES
          test: /\.css$/,
          include: /\.module\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[hash:base64]'
                }
              }
            }
          ]
        },
        {
          // THIS RULE IS FOR LESS FILES
          test: /\.less$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'less-loader'
          ]
        }
      ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:6].css'
        })
    ]
})
