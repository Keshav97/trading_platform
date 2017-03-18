import React from 'react';
import { Link } from 'react-router';
import 'whatwg-fetch';


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

    this.createOrder = this.createOrder.bind(this);
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

  createOrder(e) {
    e.preventDefault();

    function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for(let i=0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    this.props.socket.emit("submitOrder", {
      type: "NewOrder",
      clientOrderId: (this.props.stockName + "|" + makeid()),
      symbol: this.props.stockName,
      buySell: "BUY",
      qty: 1
    })
    console.log("Ordered");
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

            <button className="btn" onClick={this.createOrder}>Buy</button>
          </div>
        </div>
    );
  }

}
