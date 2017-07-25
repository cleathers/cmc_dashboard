import React, { Component } from 'react';
import { Card, Col } from 'react-materialize';
import request from 'async-request';



export default class Menu extends Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
		this.retrieveCoins = this.retrieveCoins.bind(this);
		this.renderCoins = this.renderCoins.bind(this);

		this.state = {
			choices: []
		};
	}

	componentDidMount() {
		this.retrieveCoins();
	}

	handleClick(coin, event) {
		this.props.onChoice(coin);
	}

	async retrieveCoins() {
		let res = await request('http://localhost:3000/retrieveList');
		let coins = JSON.parse(res.body);

		this.setState({
			choices: coins
		});
	}

	renderCoins() {
		return this.state.choices.map(coin => {
			return coin.name && <li key={`list-item-${coin.name}`}>
				<Card className='blue-grey darken-1'
					onClick={this.handleClick.bind(this, coin)}>
					<h3>
						<img src={coin.image} alt={`${coin.name} logo`}/>
						<span>{coin.name}</span>
					</h3>
				</Card>
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
