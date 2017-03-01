
// ******************************************************************
// ----------------------- Requires
// ******************************************************************

// ------------------- Path

const Path = require('path');
const Paths = {
  js: Path.join(__dirname, 'app/js'),
  sass: Path.join(__dirname, 'app/sass'),
  html: Path.join(__dirname, 'app/html'),
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
const jadeData = require('./app/html/data/data');




// ------------------- Plugins 
// combine plugin with controllers

var plugins = [
  new ReloadPlugin(),
  // Use this if there is Library/plugin that is being used throughout pages.
  // new Webpack.optimize.CommonsChunkPlugin({
  //   names: [ 'global/vendor' ]
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

var pages = pageController(
  // [ filename, [ order of chunk ] ]
  [
    ['index', [ 'global/config', 'global/main', 'home/main'] ],
    ['article-temp', [ 'vendor/main', 'global/config', 'global/main', 'article-temp/main'] ],
    ['pre-reg', [ 'vendor/main', 'global/config', 'global/main', 'pre-reg/main'] ],
    ['design-assets', [ 'global/config', 'global/main' ] ]

  ]
)

plugins = plugins.concat(pages);



// ******************************************************************
// ----------------------- Common Settings
// ******************************************************************


const configCommon = {
  entry: {
    'vendor/main': ['jquery-countdown'],
    'global/config': [Paths.js + '/global/config.js' /*, Paths.js + '/global/module-a.js'*/ ],
    'global/main': [Paths.js + '/global/main.js' /*, Paths.js + '/global/module-a.js'*/ ],
    'home/main': [Paths.js + '/home/main.js'],
    'article-temp/main': [Paths.js + '/article-temp/main.js'],
    'pre-reg/main': [Paths.js + '/pre-reg/main.js']
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
      Path.resolve('./images')
      // Path.resolve('./tmp')
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
      { test: /\.scss$/, loader: ExtractTextPlugin.extract("css?-url!autoprefixer?{browsers:['last 4 version']}!sass?sourceMap&includePaths[]=" + Path.resolve(__dirname, "./node_modules/compass-mixins/lib")), include: Paths.sass }
      
    ]
  },

  sassLoader: {
    // includePaths: [Path.resolve(__dirname, "./app/sass")]
    includePaths: [ Paths.images ]

  },

  plugins: plugins

};


var config;



// ******************************************************************
// ----------------------- Specific Settings
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
          filename: 'src/[name].js'
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
          path: Paths.build,
          filename: 'src/[name].js'
        },

        module: {
          loaders: [
            { test: /\.pug$/, loader: 'pug-html', include: Paths.html,
              query: {
                data: { dynamicPath: '' /*, d: jadeData*/ },
                pretty: true
              }   
            },
            { test: /\.js$/, loader: 'babel?presets[]=es2015', include: Paths.js }
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



// Issues

// How to reload page once pug data is changed.
// Save css Sprite in memory instead of tmp folder.
// Do I need [path] for this line? { test: /\.(jpg|png)$/, loader: 'file?name=[path][name].[ext]', include: Paths.images  },  This will affect to css background URL. Removed for now