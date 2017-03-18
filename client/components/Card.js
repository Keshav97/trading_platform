import React from 'react';
import { Link } from 'react-router';
import 'whatwg-fetch';
import io from 'socket.io-client';


let socket = io(`http://emsapi.eu-west-2.elasticbeanstalk.com/`);


/*
This component shows the list of Classes
*/

export default class Card extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      marketData: {},
      lastPrice: 0.00,
      color: "blue-grey"
    };
  }

  componentDidMount() {
    this.props.socket.on("onMarketData", (marketData) => {
      if (marketData.symbol === this.props.stockName) {
        if (marketData.type === "TRADE") {
          if (marketData.lastPrice > this.state.lastPrice) {
            this.setState({
              color: "green"
            })
          }
          else {
            this.setState({
              color: "red"
            })
          }
          this.setState({
            lastPrice: marketData.lastPrice
          })
        }
        this.setState({
          marketData: marketData
        })
      }
    })
  }

  render() {
    return (
        <div className={"card " + this.state.color +  " darken-1"}>
          <div className="card-content white-text">
            <span className="card-title">{this.props.stockName}</span>
            <h1>{ this.state.lastPrice }</h1>
            <p>Time: { this.state.marketData.time }</p>
            <p>Type: { this.state.marketData.type }</p>
            <p>Bid: { this.state.marketData.bid }</p>
            <p>Ask: { this.state.marketData.ask }</p>

            <button className="waves-effect waves-light btn">Buy</button>
            <button className="waves-effect waves-light btn">Sell</button>
          </div>
        </div>
    );
  }

}
