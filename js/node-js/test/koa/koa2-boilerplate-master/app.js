import Koa from 'koa'
import Router from 'koa-router'
var router = new Router();



const app = new Koa()


router.get('/', async function (ctx){
    // You can use `await` in here
    ctx.body = "This is home";
    console.log("This is home...")
});
 
router.get('/about', async function (ctx){
    // You can use `await` in here
    ctx.body = "this is about";
    console.log("this is about")
});



app.use(router.routes());
app.listen(3000, () => console.log('server started 3000'))

export default app

