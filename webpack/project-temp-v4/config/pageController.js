const HtmlWebpackPlugin = require('html-webpack-plugin');
const parts = require('./parts');



module.exports = function( pages ){

  var pages = pages;

  pages = pages.map(function(page, i){

    var filename = page[0] +'.html';
    var template = page[0] +'.pug';
    var chunks = page[1];
    
    return new HtmlWebpackPlugin({
      filename: filename,
      inject: 'body',
      template: 'app/html/pages/' + template,
      chunks: chunks,
      chunksSortMode: parts.chunksSort(chunks)
    });

    // new HtmlWebpackPlugin({
    //     filename: 'index.html',
    //     inject: 'body',
    //     template: 'app/html/pages/index.pug',
    //     chunks: [ 'src/global/config', 'src/global/main', 'src/home/main'],
    //     chunksSortMode: parts.chunksSort([ 'src/global/config', 'src/global/main', 'src/home/main' ])
    //   })

  });

  return pages;

}
