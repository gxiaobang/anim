/**
 * webpack配置
 * by gxiaobang
 */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const path = require('path');
const rootPath = path.resolve(__dirname);
const srcPath = path.resolve(rootPath, 'src');
const distPath = path.resolve(rootPath, 'dist');
const port = 4000;

module.exports = {
  entry: {
    demo: [path.resolve(srcPath, 'demo.js')]
  },
  output: {
    path: distPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.sass', '.scss']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(rootPath, './demo.html')
    }),
    new OpenBrowserPlugin({
      url: `http://localhost:${port}`
    })
  ],
  devServer: {
    host: '0.0.0.0',
    port: port
  }
};