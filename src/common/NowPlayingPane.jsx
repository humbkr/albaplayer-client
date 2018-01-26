import React from 'react';
import styled from 'styled-components';
import Queue from '../queue/components/Queue';
import NowPlaying from './NowPlaying';

const NowPlayingPaneWrapper = styled.div`
  width: 100%;
  padding: 30px 50px;
`;

const NowPlayingQueue = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px 0;
`;

const NowPlayingPane = () => (
  <NowPlayingPaneWrapper>
    <NowPlaying />
    <NowPlayingQueue>
      <h2>Queue</h2>
      <Queue />
    </NowPlayingQueue>
  </NowPlayingPaneWrapper>
);

export default NowPlayingPane;
