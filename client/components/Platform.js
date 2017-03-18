import React from 'react';
import { Link } from 'react-router';
import 'whatwg-fetch';
import io from 'socket.io-client';


import Card from './Card';
import IQ from './IQ';


let socket = io(`http://emsapi.eu-west-2.elasticbeanstalk.com/`);


/*
This component shows the list of Classes
*/

export default class Platform extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stocks: ["AAPL", "AMD", "BAC", "BMY", "C", "CSCO", "CYH", "FB", "FCX",
       "GE", "INTC", "MDLZ", "MSFT", "WMT", "MU", "INTC", "PFE", "VZ", "WMT", "XOM"],
      socket
    };
  }

  componentDidMount() {
    socket.on(`connect`, () => {
      console.log("Connected");
    })

    socket.emit("subscribe", this.state.stocks);
  }

  render() {

    let stockCards = [];
    for (let i=0; i<this.state.stocks.length; i++) {
      stockCards.push(<Card stockName={ this.state.stocks[i] }
        socket={ this.state.socket }/>)
    }

    return (
      <div>
        <nav>
          <div className="nav-wrapper container">
            <a href="#" className="brand-logo center">Trading Epiphany</a>
          </div>
        </nav>
        <div className="container">
          <IQ socket={ this.state.socket } />
          {stockCards}
        </div>
      </div>
    );
  }

}
