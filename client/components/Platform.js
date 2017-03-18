import React from 'react';
import { Link } from 'react-router';
import 'whatwg-fetch';
import io from 'socket.io-client';


let socket = io(`http://emsapi.eu-west-2.elasticbeanstalk.com/`);


/*
This component shows the list of Classes
*/

export default class Platform extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      marketData: []
    };
  }

  componentWillMount() {
    socket.on(`connect`, () => {
      console.log("Connected");
    })

    socket.emit("subscribe", ["AAPL"])

    socket.on("onMarketData", (marketData) => {
      console.log(marketData);
    })
  }

  render() {
    return (
      <div>
        <h1>Trader</h1>
      </div>
    );
  }

}
