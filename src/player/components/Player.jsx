import React, { Component } from 'react';
import { withTheme } from 'styled-components'
import AudioPlayer from './AudioPlayer';


// This component is meant to be a wrapper around the AudioPlayer component,
// so the latter can be used independently of redux.
class Player extends Component {
  render() {
    return (
      <AudioPlayer
        autoPlay={true}
        fullPlayer={true}
        width={parseInt(this.props.theme.sidebar.width, 0)}
      />
    );
  }
}

export default withTheme(Player);
