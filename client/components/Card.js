import React from 'react';
import { Link } from 'react-router';
import 'whatwg-fetch';


/*
This component shows the list of Classes
*/

import Graph from './Graph';


export default class Card extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      marketData: {},
      lastPrice: 0.00,
      color: "blue-grey",
      quantity: 1,
      values: []
    };

    this.createOrder = this.createOrder.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
  }

  componentDidMount() {
    this.props.socket.on("onMarketData", (marketData) => {
      if (marketData.symbol === this.props.stockName) {
        if (marketData.type === "TRADE") {
          let values = this.state.values;

          if (values.length < 10) {
            values.push([(values.length+1)*10, parseFloat(marketData.lastPrice)])
            this.setState({
              values
            })
          }
          else {
            values.slice(0, 1);
            values.push([(values.length+1)*10, parseFloat(marketData.lastPrice)]);
            this.setState({
              values
            })
          }

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

  createOrder(e, type) {
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
      buySell: type,
      qty: this.state.quantity
    })
  }

  updateInputValue(evt) {
    this.setState({
      quantity: evt.target.value
    });
  }

  render() {
    return (
        <div className={"card stockCard " + this.state.color +  " darken-1"}>
          <div className="card-content white-text">
            <div className="row">
              <div className="col s6">
                <span className="card-title">{this.props.stockName}</span>
                <h1>{ this.state.lastPrice }</h1>
                <p>Type: { this.state.marketData.type }</p>
                <p>Bid: { this.state.marketData.bid }</p>
                <p>Ask: { this.state.marketData.ask }</p>
                <input placeholder="Quantity" type="text" className="validate"
                   onChange={this.updateInputValue} value={this.state.quantity} />
              </div>
              <div className="col s6">
                <Graph stockName={this.props.stockName} values={this.state.values}/>
              </div>
            </div>
          </div>
          <div className="card-action">
            <a onClick={(evt) => this.createOrder(evt, "BUY")}>Buy</a>
            <a onClick={(evt) => this.createOrder(evt, "SELL")}>Sell</a>
          </div>
        </div>
    );
  }

}
