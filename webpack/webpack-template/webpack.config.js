
// ******************************************************************
// ----------------------- Requires
// ******************************************************************

// ------------------- For General NPM Tools and Vars

const Path = require('path');
const Paths = {
  js: Path.join(__dirname, 'app/js'),
  sass: Path.join(__dirname, 'app/sass'),
  html: Path.join(__dirname, 'app/html'),
  images: Path.join(__dirname, 'images'),
  build: Path.join(__dirname, 'build'),
  CDN: 'http://test-nxcache.nexon.net/maplestory/microsite/v-update/'
};
 
const Webpack = require('webpack');
const Merge = require('webpack-merge');
const Validate = require('webpack-validator');
const Joi = require('webpack-validator').Joi
const schemaExtension = Joi.object({
  sassLoader: Joi.any(),
})
const parts = require('./config/parts');
const controller = require('./config/controller');


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
  new Webpack.optimize.CommonsChunkPlugin({
    names: [ 'src/global/main', 'src/vendor/main' ]
  }),
  new Webpack.OldWatchingPlugin(),
  new ExtractTextPlugin('[name].css')

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

for (var i in controller) {
  plugins = plugins.concat(controller[i]);
}



// ******************************************************************
// ----------------------- Common Settings
// ******************************************************************


const configCommon = {
  entry: {
    'src/vendor/main': ['jquery-countdown'],
    'src/global/config': [Paths.js + '/global/config.js' /*, Paths.js + '/global/module-a.js'*/ ],
    'src/global/main': [Paths.js + '/global/main.js' /*, Paths.js + '/global/module-a.js'*/ ],
    'src/home/main': [Paths.js + '/home/main.js'],
    'src/article-temp/main': [Paths.js + '/article-temp/main.js'],
    'src/pre-reg/main': [Paths.js + '/pre-reg/main.js']
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
      Path.resolve('./images'),
      Path.resolve('./tmp')
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
      { test: /\.js$/, loader: 'babel?presets[]=es2015', include: Paths.js } ,
      { test: /\.(jpg|png)$/, loader: 'file?name=[path][name].[ext]', include: Paths.images  },
      {
        test: /\.(jpg|png)$/,
        loader: 'url?limit=25000',
        include: Paths.images
      },
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
          filename: '[name].js'
        },

        module: {
          loaders: [
            { test: /\.pug$/, loader: 'pug-html', include: Paths.html,
              query: {
                data: { dynamicPath: Paths.CDN /*, d: jadeData*/ },
                pretty: true
              }   
            }
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
          filename: '[name].js'
        },

        module: {
          loaders: [
            { test: /\.pug$/, loader: 'pug-html', include: Paths.html,
              query: {
                data: { dynamicPath: '' /*, d: jadeData*/ },
                pretty: true
              }   
            }
          ]
        }

      },
      parts.devServer({
        // Customize host/port here if needed
        host: process.env.HOST,
        port: process.env.PORT
      })
    );

}

module.exports = Validate(config, {schemaExtension: schemaExtension});





// Issues

// How to reload page once pug data is changed.
// Save css Sprite in memory instead of tmp folder.
// Background URL Variable instead of ../../
// Be able to change the order of JS file injection to HTML
// Do I need [path] for this line? { test: /\.(jpg|png)$/, loader: 'file?name=[path][name].[ext]', include: Paths.images  },  This will affect to css background URL. Removed for now

 