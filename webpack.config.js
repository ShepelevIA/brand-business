const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');

module.exports = {
  mode: 'development',
  // mode: 'production',
  entry: {
    index: './src/index.js',
  },
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/files', to: 'files' },
        { from: 'src/img', to: 'img' },
        { from: 'src/form.html', to: 'form.html' },
      ]
    })
  ],
  // optimization: {
  //   minimize: true,
  //   minimizer: [
  //     new HtmlMinimizerPlugin(),
  //   ],
  // },
};
