const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx) =>{
  ctx.body = {
    status: 'success',
    message: '⚒Welcome to the Creations API!⚒'
  };
})

module.exports = router;
