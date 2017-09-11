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

router.get(`${BASE_URL}/:id`, async (ctx) => {
  try {
    const creation = await queries.getSingleCreation(ctx.params.id);
    if (creation.length) {
      ctx.body = {
        status: 'success',
        data: creation
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That creation does not exist.'
      };
    }
  } catch (err) {
    console.log(err);
  }
})

module.exports = router;
