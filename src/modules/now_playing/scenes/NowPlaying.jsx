import React from 'react'
import styled from 'styled-components'
import NowPlayingQueue from '../components/NowPlayingQueue'
import NowPlayingHeader from '../components/NowPlayingHeader'

const NowPlaying = () => (
  <NowPlayingWrapper>
    <NowPlayingHeader />
    <NowPlayingQueueWrapper>
      <NowPlayingQueue />
    </NowPlayingQueueWrapper>
  </NowPlayingWrapper>
)

export default NowPlaying

const NowPlayingWrapper = styled.div`
  padding: 30px 50px;
  max-width: 1160px;
  min-width: 800px;
  margin: 0 auto;
`

const NowPlayingQueueWrapper = styled.div`
  width: 100%;
  padding: 30px 0;

  > h2 {
    margin-bottom: 20px;
  }
`
