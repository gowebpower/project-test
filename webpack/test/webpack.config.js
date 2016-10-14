
// ******************************************************************
// ----------------------- Requires
// ******************************************************************

// ------------------- For General Tool

const Path = require('path');
const configPath = {
  app: Path.join(__dirname, 'app/js'),
  build: Path.join(__dirname, 'build')
};

const Webpack = require('webpack');
const Merge = require('webpack-merge');
const Validate = require('webpack-validator');
const Joi = require('webpack-validator').Joi
const schemaExtension = Joi.object({
  sassLoader: Joi.any(),
})
const parts = require('./config/parts');



// ------------------- For SASS
var ExtractTextPlugin = require("extract-text-webpack-plugin");


// ------------------- For Pug ( HTML )

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReloadPlugin = require('reload-html-webpack-plugin');
const jadeData = require('./app/html/data/data');



// ******************************************************************
// ----------------------- Common Settings
// ******************************************************************


const configCommon = {
  entry: {
    // vendor: [ 'some vendor' ],
    'src/global/main': [configPath.app + '/global/main.js', configPath.app + '/global/module-a.js' ],
    'src/home/main': [configPath.app + '/home/main.js']

  },

  output: {
    path: configPath.build,
    // publicPath: '/build/',
    filename: '[name].js'
  },

  externals: {
    // require("jquery") is external and available
    //  on the global var jQuery
    "jquery": "jQuery"
  },


  // absolute path in require in js and import in sass. 
  resolve: {
    root: [
      Path.resolve('./app/js'),
      Path.resolve('./app/sass'),
      Path.resolve('./app/img')
    ]
  },

  // resolve: {
  //   root: [
  //     Path.resolve('./app/sass')
  //   ],
  //   extensions: ['.scss']
  // },

  devtool:'source-map',
  module: {
    preLoaders:[
      { test:/\.js$/, loader: 'jshint-loader', exclude: /node_modules/ }
    ],
    loaders: [
      { test: /\.js$/, loader: 'babel?presets[]=es2015', exclude: /node_modules/ } ,
      { test: /\.scss$/, loader: ExtractTextPlugin.extract("css!resolve-url!sass?includePaths[]=" + Path.resolve(__dirname, "./node_modules/compass-mixins/lib"))},
      { test: /\.pug$/, loader: 'pug-html-loader', exclude: ['/node_modules/'], 
        query: {
          data: jadeData,
          pretty: true
        }   
      }
    ]
  },

  sassLoader: {
    includePaths: [Path.resolve(__dirname, "./app/sass")]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: 'body',
      template: 'app/html/index.pug',
      chunks: ['src/global/main', 'src/home/main']
    }),
    // new HtmlWebpackPlugin({
    //   filename: 'about.html',
    //   inject: 'body',
    //   template: 'app/pug/about.pug',
    //   chunks: ['src/global/main', 'src/about/main']
    // }),
    new ReloadPlugin(),
    new Webpack.optimize.CommonsChunkPlugin(
      /* chunkName= */"src/global/main", /* filename= */"src/global/main.js"
    ),
    new ExtractTextPlugin('[name].css')
  ]
};


var config;



// ******************************************************************
// ----------------------- Specific Settings
// ******************************************************************


// Detect how npm is run and branch based on that
switch(process.env.npm_lifecycle_event) {
  case 'build':
    config = Merge(configCommon, {});
    break;
  default:
    
    config = Merge(
      configCommon,
      parts.devServer({
        // Customize host/port here if needed
        host: process.env.HOST,
        port: process.env.PORT
      })
    );

}

module.exports = Validate(config, {schemaExtension: schemaExtension});