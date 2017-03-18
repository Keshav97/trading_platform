import React from 'react';
import { Link } from 'react-router';
import 'whatwg-fetch';


/*
This component shows the list of Classes
*/

export default class Graph extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
		var data = [];
		this.update();
  }

  update() {
    let idName = "#" + this.props.stockName;

    var plot = $.plot(idName, [ this.props.values ], {
			series: {
				shadowSize: 0	// Drawing is faster without shadows
			},
			yaxis: {
			},
			xaxis: {
				show: false
			}
		});

    plot.setData([ this.props.values ]);
    // Since the axes don't change, we don't need to call plot.setupGrid()
    plot.draw();
  }

  render() {
    this.update();

    return (
        <div id={this.props.stockName}>
        </div>
    );
  }

}
