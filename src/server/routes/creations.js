const Router = require('koa-router');
const queries = require('../db/queries/creations');

const router = new Router();
const BASE_URL = `/api/v1/creations`;

router.get(BASE_URL, async (ctx) => {
  try {
    const creations = await queries.getAllCreations();
    ctx.body = {
      status: 'success',
      data: creations
    };
  } catch (err) {
    console.log(err);
  }
})

module.exports = router;
