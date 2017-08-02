import React, { Component } from 'react';
import request from 'request-promise';



export default class Menu extends Component {
	constructor(props) {
		super(props);

		this.handleAddition = this.handleAddition.bind(this);
		this.retrieveCoins = this.retrieveCoins.bind(this);
		this.renderCoins = this.renderCoins.bind(this);
		this.renderChosenCoins = this.renderChosenCoins.bind(this);
		this.handleSearch = this.handleSearch.bind(this);

		this.state = {
			choices: [],
			currentSearch: ''
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

	handleSearch(e) {
		let searchTerm = e.target.value;

		this.setState({
			currentSearch: searchTerm
		});
	}

	retrieveCoins() {
		request(`${document.location.origin}/retrieveList`)
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
		let { currentSearch } = this.state;

		return this.state.choices
			.filter(coin => {
				let isChosen = this.props.chosen[coin.name];
				let shouldMatch = currentSearch.length > 0;
				let isMatch = !!coin.name.match(currentSearch);

				return shouldMatch ? !isChosen && isMatch : !isChosen;
			})
			.map(coin => {
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
				<input type="text" onChange={this.handleSearch} value={this.state.currentSearch} />
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
