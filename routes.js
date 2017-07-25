const Router = require('koa-router');
const request = require('async-request');
const cheerio = require('cheerio');

let router = new Router();

router.get('/retrieveList', async (ctx) => {
	let res = await request('http://coinmarketcap.com');
	let $ = cheerio.load(res.body);
	let coins = $('#currencies tbody tr .currency-name').toArray();

	let coinList = coins.map(($coin, idx) => {
		return $coin.children.reduce((targets, childEl) => {
			if (childEl.type === 'tag' && childEl.name === 'img') {
				targets.image = childEl.attribs.src;
			}

			if (childEl.type === 'tag' && childEl.name === 'a') {
				let href = childEl.attribs.href;
				let indexOfName = href.indexOf('/', 1); // ignore leading slash
				let parsedOutName = href.slice(indexOfName).replace(/\//g,'');

				targets.name = parsedOutName;
			}

			return targets;
		}, {});
	});

	ctx.body = coinList;
});

module.exports = router;
