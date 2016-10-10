
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  app: path.join(__dirname, 'app/js'),
  build: path.join(__dirname, 'build')
};


module.exports = {
  entry: {
    
    page1: [PATHS.app + '/b.js'],
    page2: [PATHS.app, PATHS.app + '/b.js']

  },

  output: {
    path: PATHS.build,
    filename: '[name].js'
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack demo'
    })
  ],

  devtool:'source-map',
  module: {
    preLoaders:[
      { test:/\.js$/, loader: 'jshint-loader', exclude: /node_modules/ }
    ],
    loaders: [
      { test: /\.js$/, loader: 'babel?presets[]=es2015', exclude: /node_modules/ } ,
      { test: /\.css$/, loaders: ['style-loader', 'css-loader']},
      { test: /\.html$/, loader: 'raw'}
    ]
  }
};