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
      marketData: {}
    };
  }

  componentDidMount() {
    this.props.socket.on("onMarketData", (marketData) => {
      if (marketData.symbol === this.props.stockName) {
        this.setState({
          marketData: marketData
        })
      }
    })
  }

  render() {
    return (
      <div>
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span class="card-title">{this.props.stockName}</span>
            <p>Time: { this.state.marketData.time }</p>
            <p>Type: { this.state.marketData.type }</p>
            <p>Trade: { this.state.marketData.time }</p>
            <p>Bid: { this.state.marketData.bid }</p>
            <p>Ask: { this.state.marketData.ask }</p>
          </div>
        </div>
      </div>
    );
  }

}
