import React from 'react';
import { Link } from 'react-router';
import 'whatwg-fetch';


import Order from './Order';


export default class IQ extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      orders: {}
    };
  }

  componentDidMount() {
    function clone(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    }

    this.props.socket.on("onOrderMessage", (orderMsg) => {
      console.log("Order Message");

      let orders = clone(this.state.orders);
      orders[orderMsg.clientOrderId] = orderMsg

      this.setState({
        orders
      });
    })
  }



  render() {
    let orders = []

    for (var property in this.state.orders) {
        if (this.state.orders.hasOwnProperty(property)) {
          orders.push(<Order orderData={ this.state.orders[property] } />)
        }
    }

    return (
        <div className="card blue-grey white-text">
          <div className="card-content">
            <span className="card-title">Orders</span>
            <p>{ orders }</p>
          </div>
        </div>
    );
  }

}
