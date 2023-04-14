const common = require('./webpack.common.config.js')
const { merge } = require('webpack-merge')

const path = require('path')
const glob = require('glob')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')

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
        }),
        new ImageMinimizerPlugin({
            minimizer: {
                implementation: ImageMinimizerPlugin.imageminMinify,
                options: {
                    // Lossless optimization with custom option
                    // Feel free to experiment with options for better result for you
                    plugins: [
                        ['imagemin-mozjpeg', { quality: 40 }],
                        ['imagemin-pngquant', {
                            quality: [0.65, 0.90],
                            speed: 4
                        }],
                        ['imagemin-gifsicle', { interlaced: true }],
                        [
                            'imagemin-svgo',
                            {
                                plugins: [
                                    {
                                        name: 'preset-default',
                                        params: {
                                            overrides: {
                                                removeViewBox: false,
                                                addAttributesToSVGElement: {
                                                    params: {
                                                        attributes: [
                                                            { xmlns: 'http://www.w3.org/2000/svg' },
                                                        ],
                                                    },
                                                },
                                            },
                                        },
                                    },
                                ],
                            },
                        ],
                    ],
                },
            },
            // TRANSFORM PNG AND JPG TO WEBP
            generator: [
              {
                type: 'asset',
                preset: 'webp-custom-name',
                implementation: ImageMinimizerPlugin.imageminGenerate,
                options: {
                  plugins: ['imagemin-webp']
                }
              }
            ]
        }),
      ],
      splitChunks: {
          chunks: 'all',
          maxSize: Infinity,
          minSize: 0,
          cacheGroups: {
              node_modules: {
                  test: /[\\/]node_modules[\\/]/,
                  name(module) {
                      const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                      return packageName;
                  },
              },
          }
      }
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
        },
        {
          // THIS RULE IS FOR SASS FILES
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        },
        {
          // THIS RULE IS FOR IMAGES
          test: /\.(png|jpg|svg)$/,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 10 * 1024,
            }
          },
          generator: {
            filename: './images/[name].[contenthash:6][ext]'
          },
          // HERE'S ANOTHER WAY TO MINIMIZE IMAGES
          // use: [
          //   {
          //     loader: 'image-webpack-loader',
          //     options: {
          //       mozjpeg: {
          //         quality: 40
          //       },
          //       pngquant: {
          //         quality: [0.65, 0.9],
          //         speed: 4
          //       }
          //     }
          //   }
          // ]
        }
      ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:6].css'
        }),
        // Using purge css to remove unused css of bundle
        new PurgeCSSPlugin({
          paths: glob.sync(
            `${path.join(__dirname, '../src')}/**/*`,
            { nodir: true }
          )
        })
    ]
})
