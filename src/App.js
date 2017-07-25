import React, { Component } from 'react';
import { Col, Row } from 'react-materialize';
import './App.css';
import Menu from './components/Menu.js';

class App extends Component {
	constructor(props) {
		super(props);

		this.addChoice = this.addChoice.bind(this);
		this.renderChoices = this.renderChoices.bind(this);

		this.state = {
			coins: {},
			loaded: false
		};
	}

	componentDidUpdate(prevProps, prevState) {
		if (Object.keys(this.state.coins).length !== Object.keys(prevState.coins).length) {
			let oldScript = document.querySelector('[data-id=cmcloader]');
			oldScript && oldScript.remove();

			let head = document.getElementsByTagName('head')[0];
			let script = document.createElement('script');

			script.type = 'text/javascript';
			script.src = 'https://files.coinmarketcap.com/static/widget/currency.js';
			script['data-id'] = 'cmcloader';

			head.appendChild(script);
		}
	}

	componentDidMount() {
		let coins;

		try {
			coins = JSON.parse(localStorage.coins);
		} catch(e) {
			console.log('seems like your localStorage.coins Object might be invalid JSON. hmmm🤔');
		}

		if (coins) {
			this.setState({
				coins
			});
		}
	}

	addChoice(coin) {
		let coins = Object.assign({[coin.name]: coin}, this.state.coins);
		localStorage.coins = JSON.stringify(coins);

		this.setState({
			coins,
			loaded: false
		});

	}

	renderChoices() {
		let coins = Object.keys(this.state.coins).map((coinName) => {
			let props = {
				'data-base': 'USD',
				'data-currency': coinName,
				key: `widget-${coinName}`
			};

			if (props.name !== 'bitcoin') {
				props['data-secondary'] = 'BTC';
			}

			return <div
				className="coinmarketcap-currency-widget"
				{...props}
			></div>;
		});

		return coins;
	}

	render() {
		return (
			<div className="App">
				<Row>
					<Menu onChoice={this.addChoice} />
					<Col m={9}>
						<div className="coin-grid">
							{!Object.keys(this.state.coins).length &&
								<p>Add some coins by clicking them on the left :)</p>
							}
							{this.renderChoices()}
						</div>
					</Col>
				</Row>
			</div>
		);
	}
}

export default App;
