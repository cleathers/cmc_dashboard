import React, { Component } from 'react';
import { Card } from 'react-materialize';
import request from 'request-promise';



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

	retrieveCoins() {
		let res = request(`${document.location.href}retrieveList`)
			.then((body) => {
				let coins = JSON.parse(body);

				this.setState({
					choices: coins
				});
			});
	}

	renderChosenCoins() {
		return this.state.choices
			.filter(coin => !!this.props.chosen[coin.name])
			.map(coin => {
				return coin.name && <li
					onClick={this.handleRemoval.bind(this, coin)}
					key={`list-item-${coin.name}`}>
						<img src={coin.image} alt={`${coin.name} logo`}/>
				</li>;
			});
	}

	renderCoins() {
		return this.state.choices
			.filter(coin => !this.props.chosen[coin.name])
			.map(coin => {
				let className = 'green lighten-5';

				return coin.name && <li
					onClick={this.handleAddition.bind(this, coin)}
					className="collection-item"
					key={`list-item-${coin.name}`}>
							<img src={coin.image} alt={`${coin.name} logo`}/>
							<span>{coin.name}</span>
				</li>;
			});
	}

	render() {
		let chosenKeys = Object.keys(this.props.chosen);
		return <div className={"menu" + (!chosenKeys.length ? ' no-choices' : '')}>
			<div className='chosen-coin-list'>
				{!!chosenKeys.length &&
					<span>Click logo to remove</span>
				}
				<ul>
					{this.renderChosenCoins()}
				</ul>
			</div>
			<div className="coin-list">
				<span>Add cryptos below</span>
				<ul className="collection">
					{this.renderCoins()}
				</ul>
			</div>
		</div>
	}
}

Menu.defaultProps = {
	chosen: {}
};
