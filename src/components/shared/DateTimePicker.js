import React, { Component } from 'react';
import { DatePicker } from 'antd';

// function onChange(value, dateString) {
//   console.log('Selected Time: ', value);
//   console.log('Formatted Selected Time: ', dateString);
// }

// function onOk(value) {
//   console.log('onOk: ', value);
// }

class DateTimePicker extends Component {
  render() {
    return(
      <DatePicker.RangePicker
        {...this.props}
        showTime={{ format: 'HH:mm' }}
        format="MM-DD-YYYY HH:mm"
        placeholder={['Start Time', 'End Time']}
      />
    );
  }
}

export default DateTimePicker;