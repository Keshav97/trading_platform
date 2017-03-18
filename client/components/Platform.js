import React from 'react';
import { Link } from 'react-router';
import 'whatwg-fetch';


/*
This component shows the list of Classes
*/

export default class Platform extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      classes: [],
    };
  }

  componentWillMount() {
  }

  render() {
    return (
      <div>
        <h1>Trader</h1>
      </div>
    );
  }

}
