// ******************************************************************
// ----------------------- Imports
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


// ------------------- For HTML

const HtmlWebpackPlugin = require('html-webpack-plugin');




// ******************************************************************
// ----------------------- Common Settings
// ******************************************************************


const configCommon = {
  
  // Entry accepts a path or an object of entries.
  // We'll be using the latter form given it's
  // convenient with more complex configurations.
  //
  // Entries have to resolve to files! It relies on Node.js
  // convention by default so if a directory contains *index.js*,
  // it will resolve to that.
  entry: {
    vendor: [
      'react',
      'react-dom',
      'react-foundation',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'react-addons-css-transition-group',
      'axios',
      'babel-polyfill' // need this in order to use promise in ie 10
    ],
    app: PATHS.app + '/app',
  },

  plugins: [

    // Use this if there is Lib that is being used throughout pages.
    new webpack.optimize.CommonsChunkPlugin({
      names: [ 'vendor' ]
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
      }
    ]
  }

}
 



// ******************************************************************
// ----------------------- Specific Settings for Dev and Production Build
// ******************************************************************


var config = {};


// Detect Which npm command was typed. "npm run [command]"
switch(process.env.npm_lifecycle_event) {

  case 'build':
    config = merge(
      configCommon,
      {
        
        // Specify how js file is going to be named. Path will be used for Production Build
        output: {
          path: PATHS.build, 
          filename: 'js/[name].js',
        },
        plugins: [

          new ExtractTextPlugin({
            filename: 'css/[name].css',
            allChunks: true
          }),
          
          // #1 Recommendation for build from React doc
          new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
          }),
          
          // #2 Recommendation for build from React doc
          new webpack.optimize.UglifyJsPlugin({
            comments: false, // remove comments
            compress: {
              unused: true,
              dead_code: true, // big one--strip code that will never execute
              warnings: false, // good for prod apps so users can't peek behind curtain
              drop_debugger: true,
              conditionals: true,
              evaluate: true,
              drop_console: true, // strips console statements
              sequences: true,
              booleans: true,
            }
          })
          
        ],

        module: {
          loaders: [
            // CSS
            { 
              test: /\.scss$/,
              include: PATHS.app,
              //loader: "style-loader!css-loader?-url!sass-loader!autoprefixer-loader?{browsers:['last 4 version']}!sass-loader?sourceMap&includePaths[]=" + path.resolve(__dirname, "./node_modules/compass-mixins/lib")
              loader: ExtractTextPlugin.extract( "css-loader?-url!sass-loader!autoprefixer-loader?{browsers:['last 4 version']}!sass-loader?sourceMap&includePaths[]=" + path.resolve(__dirname, "./node_modules/compass-mixins/lib") )
            }
          ]
        }


      },
      parts.clean(PATHS.build)      

    );

    break;
    
  default:
    
    config = merge(
      configCommon,
      {

        // Specify how js file is going to be named. Path will be used for Production Build
        output: {
          filename: 'js/[name].js',
        },
        module: {
          loaders: [
            // CSS
            { 
              test: /\.scss$/,
              include: PATHS.app,
              loader: "style-loader!css-loader?-url!sass-loader!autoprefixer-loader?{browsers:['last 4 version']}!sass-loader?sourceMap&includePaths[]=" + path.resolve(__dirname, "./node_modules/compass-mixins/lib")
              // loader: ExtractTextPlugin.extract( "css-loader?-url!sass-loader!autoprefixer-loader?{browsers:['last 4 version']}!sass-loader?sourceMap&includePaths[]=" + path.resolve(__dirname, "./node_modules/compass-mixins/lib") )
            }
          ]
        }
      },
      parts.devServer({
        // Customize host/port here if needed
        host: process.env.HOST,
        port: 9090
      })
    );

}


module.exports = config;