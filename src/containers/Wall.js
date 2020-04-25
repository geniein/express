import React from 'react';
import { Home } from 'containers';

class Wall extends React.Component {
    render() {
        return (
            <div>
                {this.props.params.username}
            </div>
        )
    }
}

export default Wall;