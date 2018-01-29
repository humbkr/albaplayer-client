import React from 'react';
import styled from 'styled-components';
import Queue from '../player/components/Queue';
import NowPlaying from './NowPlaying';

const NowPlayingPaneWrapper = styled.div`
  width: 100%;
  padding: 30px 50px;
`;

const NowPlayingQueue = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px 0;
  
  > h2 {
    margin-bottom: 20px;
  }
`;

const NowPlayingPane = () => (
  <NowPlayingPaneWrapper>
    <NowPlaying />
    <NowPlayingQueue>
      <Queue />
    </NowPlayingQueue>
  </NowPlayingPaneWrapper>
);

export default NowPlayingPane;
