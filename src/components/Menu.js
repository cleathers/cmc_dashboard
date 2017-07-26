import React, { Component } from 'react';
import { Card, Col } from 'react-materialize';
import request from 'async-request';



export default class Menu extends Component {
	constructor(props) {
		super(props);

		this.handleAddition = this.handleAddition.bind(this);
		this.retrieveCoins = this.retrieveCoins.bind(this);
		this.renderCoins = this.renderCoins.bind(this);
		this.renderChosenCoins = this.renderChosenCoins.bind(this);

		this.state = {
			choices: []
		};
	}

	componentDidMount() {
		this.retrieveCoins();
	}

	handleAddition(coin) {
		this.props.onAdd(coin);
	}

	handleRemoval(coin) {
		this.props.onRemoval(coin);
	}

	async retrieveCoins() {
		let res = await request('http://localhost:3000/retrieveList');
		let coins = JSON.parse(res.body);

		this.setState({
			choices: coins
		});
	}

	renderChosenCoins() {
		return this.state.choices
			.filter(coin => !!this.props.chosen[coin.name])
			.map(coin => {
				return coin.name && <li
					onClick={this.handleRemoval.bind(this, coin)}
					key={`list-item-${coin.name}`}>
						<h3>
							<img src={coin.image} alt={`${coin.name} logo`}/>
						</h3>
				</li>;
			});
	}

	renderCoins() {
		return this.state.choices
			.filter(coin => !this.props.chosen[coin.name])
			.map(coin => {
				let className = 'deep-purple darken-4';

				return coin.name && <li key={`list-item-${coin.name}`}>
					<Card className={className}
						onClick={this.handleAddition.bind(this, coin)}>
						<h3>
							<img src={coin.image} alt={`${coin.name} logo`}/>
							<span>{coin.name}</span>
						</h3>
					</Card>
				</li>;
			});
	}

	render() {
		let chosenKeys = Object.keys(this.props.chosen);
		return <Col m={3}>
			{!!chosenKeys.length &&
				<span>Click to remove choices</span>
			}
			<ul className="chosen-coin-list">
				{this.renderChosenCoins()}
			</ul>
			<span>Add cryptos below</span>
			<ul className="coin-list">
				{this.renderCoins()}
			</ul>
		</Col>
	}
}

Menu.defaultProps = {
	chosen: {}
};
