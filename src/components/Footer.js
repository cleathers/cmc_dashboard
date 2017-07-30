import React, { Component } from 'react';

export default class Footer extends Component {
	render() {
		return <footer className="page-footer grey lighten-4">
			<div className="footer-copyright">
				<a><img
					alt="ethereum logo"
					src="https://files.coinmarketcap.com/static/img/coins/32x32/ethereum.png" />0x167df50a9f1d7e94a95876d9ad132b084456c307</a>
				<a><img
					alt="bitcoin logo"
					src="https://files.coinmarketcap.com/static/img/coins/32x32/bitcoin.png" />13FSTpxNNnbtRbQwkNzgbbudm2EyZ9iKqa</a>
				<a><img
					alt="litecoin logo"
					src="https://files.coinmarketcap.com/static/img/coins/32x32/litecoin.png" />LbUtP4T6zHZHVYBs9GYb5iQ9se1MM75Zox</a>
			</div>
		</footer>
	}
}
