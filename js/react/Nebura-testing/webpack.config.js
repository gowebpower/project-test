// ******************************************************************
// ----------------------- Requires
// ******************************************************************

// ------------------- Path

const path = require('path');
const PATHS = {
  app: path.join(__dirname, 'client'),
  build: path.join(__dirname, 'build'),
  CDN: 'http://test-nxcache.nexon.net/nabura/assets/images'
};


// ------------------- Webpack modules.

const webpack = require('webpack');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');


// ------------------- For SASS
var ExtractTextPlugin = require("extract-text-webpack-plugin");


// ------------------- For Pug ( HTML )

const HtmlWebpackPlugin = require('html-webpack-plugin');




var config = {};

const configCommon = {
  
  // Entry accepts a path or an object of entries.
  // We'll be using the latter form given it's
  // convenient with more complex configurations.
  //
  // Entries have to resolve to files! It relies on Node.js
  // convention by default so if a directory contains *index.js*,
  // it will resolve to that.
  entry: {
    app: PATHS.app + '/app',
  },

  // outpthis is the path for building production ver later
  output: {
    path: PATHS.build, 
    filename: '[name].js',
  },
  plugins: [

    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }),

    // without options as argument, webpack inject app.js with basic html markup in the memory.
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: 'body',
      template: PATHS.app + '/index.html'
    }),
    
  ],
 
  // extensions: allow imports jsx without .jsx ex) 'import Button from './Button' ( from Button.jsx. Normally it will look for Button.js )
  // modules: Enable to use absolute path to import files in JS file and sass file ( ex: import Something from 'components'; no more relative path)
  resolve: {
    extensions: ['.js', '.jsx'],
    // webpack 2 way  ref: http://moduscreate.com/es6-es2015-import-no-relative-path-webpack/
    modules: [
      path.resolve('./client'),
      path.resolve('./'),
      path.resolve('./client/themes'),
      path.resolve('./node_modules')
    ]
  },

  module: {
    loaders: [
      // js
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: PATHS.app,
        query: {

          // ref: http://egorsmirnov.me/2016/04/11/react-and-es6-part6.html
          presets: ["react", "es2015", "stage-0"]
        }
      },
      // CSS
      { 
        test: /\.scss$/,
        include: PATHS.app,
        loader: ExtractTextPlugin.extract( "css-loader?-url!sass-loader!autoprefixer-loader?{browsers:['last 4 version']}!sass-loader?sourceMap&includePaths[]=" + path.resolve(__dirname, "./node_modules/compass-mixins/lib") )
      }
    ]
  }

}
 



// Detect Which npm command was typed. "npm run [command]"
switch(process.env.npm_lifecycle_event) {

  case 'build':
    config = Merge(
      configCommon,
      {
        // Build config goes here
      },
      parts.clean(PATHS.build)      

    );
    break;
    
  default:
    
    config = merge(
      configCommon,
      {
        // Develop config goes here
      },
      parts.devServer({
        // Customize host/port here if needed
        host: process.env.HOST,
        port: 9090
      })
    );

}


module.exports = config;