const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'main.js',
    clean: true,
  },
  target: 'web',
  devServer: {
    port: 3000,
    static: {
      directory: path.resolve(__dirname, 'public'),
    },
    hot: true,
    historyApiFallback: true,
    allowedHosts: 'all',
    client: {
      overlay: true,
    },
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader, 'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        title: '2048',
        template: path.join(__dirname, 'src', 'index.html'),
      },
    ),
    new MiniCssExtractPlugin(),
  ],

};
