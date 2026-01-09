const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: 'development',
  // entry: './src/index.js',
  entry: './src/handwritten-snabbdom.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  plugins: [new HtmlWebpackPlugin({ template: './index.html' })],
  devServer: {
    port: 3000,
  },
};

