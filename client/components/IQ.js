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
      let orders = clone(this.state.orders);
      // if (orderMsg.clientOrderId in this.state.orders) {
      if (orderMsg.type === "ExecutionReport") {
        let old = orders[orderMsg.clientOrderId];
        let oldQty = parseInt(orders[orderMsg.clientOrderId].qty);

        console.log(parseFloat(orderMsg.price));
        console.log(oldQty + parseInt(orderMsg.qty));
        console.log(old.totalPrice);
        let pl = parseFloat(orderMsg.price) * (oldQty + parseInt(orderMsg.qty)) - old.totalPrice;
        console.log("P&L", pl);

        orders[orderMsg.clientOrderId] = {
          price: orderMsg.price,
          qty: parseInt(orderMsg.qty) + oldQty,
          executionReportId: orderMsg.executionReportId,
          clientOrderId: orderMsg.clientOrderId,
          buySell: orders[orderMsg.clientOrderId].buySell,
          pl: Math.round(pl * 100) / 100,
          totalPrice: (old.totalPrice + parseInt(orderMsg.qty) * parseFloat(orderMsg.price))
        }
      }
      else {
        orders[orderMsg.clientOrderId] = {
          price: orderMsg.price,
          qty: 0,
          executionReportId: orderMsg.executionReportId,
          clientOrderId: orderMsg.clientOrderId,
          buySell: orderMsg.buySell,
          totalPrice: 0,
          pl: 0
        }
      }

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
            <table>
              <thead>
                <th>Stock</th>
                <th>Type</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>P&L</th>
                <th>Execution Report Id</th>
              </thead>

              <tbody>
                { orders }
              </tbody>

            </table>
          </div>
        </div>
    );
  }

}
