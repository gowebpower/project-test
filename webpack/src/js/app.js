/*jshint esversion: 6 */
require('../css/style.css');
require(['./app2.js'], function(app2){

  document.body.appendChild(app2[0]);


});

 
class Testing {
    constructor (id, x, y) {
        this.id = id;
        this.move(x, y);
    }
    move (x, y) {
        this.x = x;
        this.y = y;
    }
}

console.log(__filename);