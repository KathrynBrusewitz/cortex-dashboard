import React, { Component } from 'react';
import { Button } from 'antd';

class StatefulComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>StatefulComponent</h1>
        <Button>Do Nothing</Button>
      </div>
    );
  }
}

export default StatefulComponent;
