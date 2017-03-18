import React from 'react';
import { Link } from 'react-router';
import 'whatwg-fetch';


/*
This component shows the list of Classes
*/

export default class Order extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stocks: {}
    };
  }

  render() {

    let orderName = this.props.orderData.clientOrderId.split("|")[0];

    return (
        <div className="card blue-grey white-text">
          <div className="card-content">
            <span className="card-title">{ orderName }</span>
            <p>{ this.props.orderData.price }</p>
            <p>{ this.props.orderData.qty }</p>
            <p>{ this.props.orderData.executionReportId }</p>
          </div>
        </div>
    );
  }

}
