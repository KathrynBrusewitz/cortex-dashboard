import React, { Component } from "react";
import { Avatar as AntAvatar } from 'antd';

// {...this.props} is needed to accept other possible props e.g. onClick events

// Accepts either a name or initials

class Avatar extends Component {
  render() {
    let initials = 'Admin';

    const style = {
      backgroundColor: '#a5a5a5',
      verticalAlign: 'middle',
      ...this.props.style,
    };

    if (this.props.name) {
      initials = this.props.name.split(' ').map(x => x[0]).join('');
    }

    if (this.props.initials) {
      initials = this.props.initials;
    }

    return (
      <AntAvatar {...this.props} style={style} shape="square">
        {initials}
      </AntAvatar>
    );
  }
}

export default Avatar;
