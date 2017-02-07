
// ******************************************************************
// ----------------------- Requires
// ******************************************************************

// ------------------- Path

const Path = require('path');
const Paths = {
  js: Path.join(__dirname, 'client/'),
  sass: Path.join(__dirname, 'client/themes'),
  images: Path.join(__dirname, 'images'),
  build: Path.join(__dirname, 'build'),
  CDN: 'http://test-nxcache.nexon.net/maplestory/microsite/v-update/'
};


// ------------------- Webpack modules.

const Webpack = require('webpack');
const Merge = require('webpack-merge');
const Validate = require('webpack-validator');
const Joi = Validate.Joi
const schemaExtension = Joi.object({
  sassLoader: Joi.any(), // Let validator skips sass syntax
});
const WebpackStrip = require('webpack-strip');

// -------------------  Custom tool and page generator

const parts = require('./config/parts');
const pageController = require('./config/pageController');


// ------------------- For SASS
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// var SpritesmithPlugin = require('webpack-spritesmith');


// ------------------- For Pug ( HTML )

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReloadPlugin = require('reload-html-webpack-plugin');
// const jadeData = require('./app/html/data/data');


// ------------------- Plugins 
// combine plugin with controllers

var plugins = [
  new ReloadPlugin(),
  // Use this if there is Lib that is being used throughout pages.
  // new Webpack.optimize.CommonsChunkPlugin({
  //   names: [ 'src/global/vendor' ]
  // }),
  new Webpack.OldWatchingPlugin(),
  new ExtractTextPlugin('[name].css')

  // For CSS Sprite (Not Using Now)
  // new SpritesmithPlugin({
  //     src: {
  //         cwd: Paths.images +'/sprite',
  //         glob: '*.png'
  //     },
  //     target: {
  //         image: Path.resolve(__dirname, 'images/sprite.png'),
  //         css: Path.resolve(__dirname, 'tmp/sprite.scss')
  //     },
  //     apiOptions: {
  //       cssImageRef: "/../../images/sprite.png"
  //     }
  // })
]

// // 
// var pages = pageController(
//   // [ filename, [ order of chunk ] ]
//   [
//     ['index', [ 'src/global/config', 'src/global/main', 'src/home/main'] ],
//     ['design-assets', [ 'src/global/config', 'src/global/main', 'src/design-assets/main' ] ]
//   ]
// )

// plugins = plugins.concat(pages);



// ******************************************************************
// ----------------------- Common Settings
// ******************************************************************


const configCommon = {
  entry: {
    // 'src/global/vendor': ['jquery', 'someLibrary'],
    'app': [Paths.js + '/app.js' /*, Paths.js + '/global/module-a.js'*/ ],

  },

  externals: {
    // require("jquery") is external and available
    //  on the global var jQueryk
    "jquery": "jQuery"
  },


  // absolute path to import files in JS file. ( ex: require("./modules/banners"); require("pages/home/main.scss");  )
  resolve: {
    root: [
      Path.resolve('./client'),
      Path.resolve('./')
    ],
    // alias: {
    //   images: Paths.images
    // },
    modulesDirectories: ["web_modules", "node_modules", "spritesmith-generated"]
  },

  // resolve: {
  //   root: [
  //     Path.resolve('./app/sass')
  //   ],
  //   extensions: ['.scss']
  // },

  devtool:'source-map',
  
  module: {
    // preLoaders:[
    //   { test:/\.js$/, loader: 'jshint-loader?laxbreak = true', include: Paths.js }
    // ],
    loaders: [

      // ** To use background: url('../../images/home/hero_bg-s.jpg') in css
      { test: /\.scss$/, loader: ExtractTextPlugin.extract("css?-url!autoprefixer?{browsers:['last 4 version']}!sass?sourceMap&includePaths[]=" + Path.resolve(__dirname, "./node_modules/compass-mixins/lib")), include: Paths.sass }

      // ** To use background: url('~/images/home/hero_bg.jpg') in css
      // css?-url > this ignores URL handling. Otherwise webpack will generate error.
      // { test: /\.scss$/, loader: ExtractTextPlugin.extract("css!autoprefixer?{browsers:['last 4 version']}!resolve-url!sass?sourceMap&includePaths[]=" + Path.resolve(__dirname, "./node_modules/compass-mixins/lib")), include: Paths.sass },
      // { test: /\.(png|jpg)$/, loader: 'file-loader' }

    ]
  },

  plugins: plugins

};


var config;



// ******************************************************************
// ----------------------- Specific Settings for Dev and Build
// ******************************************************************


// Detect Which npm command was typed. "npm run [command]"
switch(process.env.npm_lifecycle_event) {
  
  case 'build':

    config = Merge(
      configCommon,
      {
        output: {
          path: Paths.build,
          publicPath: Paths.CDN,
          filename: '[name].js'
        },

        module: {
          loaders: [
            { test: /\.pug$/, loader: 'pug-html', include: Paths.html,
              query: {
                data: { dynamicPath: Paths.CDN /*, d: jadeData*/ },
                pretty: true
              }   
            },
            { test: /\.js$/, loader: 'webpack-strip?strip[]=debug,strip[]=console.log!babel?presets[]=es2015', include: Paths.js }
          ]
        }
      },
      parts.clean(Paths.build)      

    );
    break;

  default:
    
    config = Merge(
      configCommon,
      { 
        output: {
          filename: '[name].js'
        },

        module: {
          loaders: [
            {
              test: /\.(js|jsx)$/,
              loader: 'babel',
              include: Path.join(__dirname, 'client'),
              query: {
                presets:['es2015', 'stage-0', 'react']
              }
            },
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

module.exports = Validate(config, {schemaExtension: schemaExtension});

