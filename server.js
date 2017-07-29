console.log(`initializing server...`);

const Koa = require('koa');
const app = new Koa();
const router = require('./routes');
const logger = require('koa-logger');
const mount = require('koa-mount');

app.use(logger());


app.use(mount(router.routes()));

const PUBLIC_DIR = process.env.PUBLIC_DIR || __dirname + '/build';
app.use(mount('/', require('koa-static')(PUBLIC_DIR)))

const PORT = process.env.PORT || 8080;

app.listen(PORT);
console.log(`server listening on port ${PORT}`);
