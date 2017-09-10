const Router = require('koa-router');
const queries = require('../db/queries/creation');

const router = new Router();
const BASE_URL = `/api/v1/creations`;

module.exports = router;
