import React from 'react';
import PropTypes from 'prop-types';
import Timeline from './Timeline';
import Controls from './Controls';
import Time from './Time';

class MainPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { progressTime: 0 };
    this.updateProgressTime = this.updateProgressTime.bind(this);
  }
  componentWillReceiveProps(newProps) {
    this.setState({ progressTime: newProps.timelineStates.progress });
  }
  updateProgressTime(progressTime) {
    this.setState({ progressTime });
  }
  render() {
    const {
      width,
      controlStates,
      controlCallbacks,
      timelineStates,
      timelineCallbacks
    } = this.props;

    return (
      <div>
        <Timeline
          appWidth={width}
          updateProgressTime={this.updateProgressTime}
          {...timelineStates}
          {...timelineCallbacks}
        />
        <div>
          <Controls
            {...controlStates}
            {...controlCallbacks}
          />
        </div>
      </div>
    );
  }
}

export default MainPlayer;
