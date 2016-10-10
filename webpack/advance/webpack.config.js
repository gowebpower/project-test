
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');



const parts = require('./config/parts');


const PATHS = {
  app: path.join(__dirname, 'app/js'),
  build: path.join(__dirname, 'build')
};


const configCommon = {
  entry: {

    page1: PATHS.app

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


var config;

// Detect how npm is run and branch based on that
switch(process.env.npm_lifecycle_event) {
  case 'build':
    config = merge(configCommon, {});
    break;
  default:
    
    config = merge(
      configCommon,
      parts.devServer({
        // Customize host/port here if needed
        host: process.env.HOST,
        port: process.env.PORT
      })
    );

}

module.exports = validate(config);
