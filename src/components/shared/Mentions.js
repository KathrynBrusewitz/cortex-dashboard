import React, { Component } from 'react';
import { Mention } from 'antd';

const { toString, toContentState } = Mention;

function onChange(contentState) {
  console.log(toString(contentState));
}

function onSelect(suggestion) {
  console.log('onSelect', suggestion);
}

class Mentions extends Component {
  render() {
    return(
      <Mention
        style={{ width: '100%' }}
        onChange={onChange}
        placeholder="Use @ to mention writers"
        defaultValue={toContentState('')}
        suggestions={['Grey Matters', 'Kathryn Brusewitz', 'Corey Mandell', 'Troy Cosentino', 'Sonia Skarbek']}
        onSelect={onSelect}
      />
    );
  }
}

export default Mentions;
