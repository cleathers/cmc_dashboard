import React, { Component } from 'react';
import { Card, Col } from 'react-materialize';
import axios from 'axios';
import cheerio from 'cheerio';
import $ from 'jquery';



export default class Menu extends Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
		this.retrieveCoins = this.retrieveCoins.bind(this);
		this.renderCoins = this.renderCoins.bind(this);

		this.state = {
			choices: [
				'litecoin',
				'wagerr'
			]
		};
	}

	componentDidMount() {
		this.retrieveCoins();
	}

	handleClick(coin, event) {
		this.props.onChoice(coin);
	}

	retrieveCoins() {
		$.ajax({
			method: 'GET',
			crossDomain: true,
			url: 'http://localhost:3000/retrieveList'
		})
		.then((coins) => {
			this.setState({
				choices: coins
			});
		});
	}

	renderCoins() {
		return this.state.choices.map(coin => {
			return coin.name && <li key={`list-item-${coin.name}`}>
				<Card className='blue-grey darken-1'
					onClick={this.handleClick.bind(this, coin)}
					title={coin.name}/>
			</li>;
		});
	}

	render() {
		return <Col m={3}>
			<ul className="coin-list">
				{this.renderCoins()}
			</ul>
		</Col>
	}
}
