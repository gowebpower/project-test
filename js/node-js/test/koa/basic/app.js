require("babel-register");
 

var koa = require('koa');
var app = new koa();
app.experimental = true;
var Router = require('koa-router');
var router = new Router();

app.use(async function (ctx, next) {
  ctx.body = 'Hello world';
});


app.use(router.routes())
app.use(router.allowedMethods());

app.listen(3000);
console.log("listening on 3000");

