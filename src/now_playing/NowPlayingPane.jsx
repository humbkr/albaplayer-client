import React from 'react';
import styled from 'styled-components';
import NowPlayingQueue from './NowPlayingQueue';
import NowPlaying from './NowPlaying';

const NowPlayingPaneWrapper = styled.div`
  padding: 30px 50px;
`;

const NowPlayingQueueWrapper = styled.div`
  width: 100%;
  padding: 30px 0;
  
  > h2 {
    margin-bottom: 20px;
  }
`;

const NowPlayingPane = () => (
  <NowPlayingPaneWrapper>
    <NowPlaying />
    <NowPlayingQueueWrapper>
      <NowPlayingQueue />
    </NowPlayingQueueWrapper>
  </NowPlayingPaneWrapper>
);

export default NowPlayingPane;
