import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from "prop-types"
import { connect } from 'react-redux'
import Queue from '../queue/components/Queue'


const NowPlayingPaneWrapper = styled.div`
  width: 100%;
`;

const NowPlayingQueue = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px 50px;
  //background-color: cadetblue;
`;

class NowPlayingPane extends Component {
  render() {
    return (
      <NowPlayingPaneWrapper>
        <NowPlayingQueue>
          <h2>Current playlist</h2>
          <Queue/>
        </NowPlayingQueue>
      </NowPlayingPaneWrapper>
    );
  }
}
NowPlayingPane.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(NowPlayingPane);
