import React, { Component } from "react";
import { Avatar as AntAvatar } from 'antd';

// {...this.props} is needed to accept other possible props e.g. onClick events

// Accepts either a name or initials

class Avatar extends Component {
  render() {
    let initials = 'GM';

    const style = {
      verticalAlign: 'middle',
      backgroundColor: '#87d068',
      ...this.props.style,
    };

    if (this.props.name) {
      initials = this.props.name.split(' ').map(x => x[0]).join('');
    }

    if (this.props.initials) {
      initials = this.props.initials;
    }

    return (
      <AntAvatar shape={this.props.shape || "square"} size={this.props.size || "default" } {...this.props} style={style}>
        {initials}
      </AntAvatar>
    );
  }
}

export default Avatar;
