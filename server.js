console.log(`initializing server...`);

const Koa = require('koa');
const app = new Koa();
const router = require('./routes');
const logger = require('koa-logger');

app.use(logger());

const PUBLIC_DIR = process.env.PUBLIC_DIR || __dirname + '/public';
app.use(require('koa-static')(PUBLIC_DIR))

app.use(router.routes());

const PORT = 8080;

app.listen(PORT);
console.log(`server listening on port ${PORT}`);
