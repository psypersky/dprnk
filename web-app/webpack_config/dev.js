const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: ['babel-polyfill', path.resolve(__dirname, '../src/main.js')],
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'client_bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'es2016', 'es2017', 'stage-0', 'react'],
        },
      },
      {
        // scss styles are loaded with modules local scope
        test: /\.scss$/,
        loader: 'style-loader!css-loader?modules&localIdentName=' +
        '[local]---[hash:base64:5]!sass-loader!postcss-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: true,
    }),
  ],
  devtool: 'cheap-module-eval-source-map',
};
