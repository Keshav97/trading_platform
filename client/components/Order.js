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
        <tr>
          <td>{ orderName }</td>
          <td>{ this.props.orderData.price }</td>
          <td>{ this.props.orderData.qty }</td>
          <td>{ this.props.orderData.executionReportId }</td>
        </tr>
    );
  }

}
