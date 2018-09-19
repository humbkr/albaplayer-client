import React from 'react'
import styled from 'styled-components'

const QueueHeaderRow = styled.li`
  display: table;
  width: 100%;
  height: ${props => props.theme.itemHeight};
  border-top: 1px solid ${props => props.theme.separatorColor};
  border-bottom: 1px solid ${props => props.theme.separatorColor};
  color: ${props => props.theme.textSecondaryColor};
  text-transform: uppercase;

  > div {
    display: table-cell;
    vertical-align: middle;
  }
`

const QueueHeaderPosition = styled.div`
  width: 60px;
  text-align: center;
`

const QueueHeaderTrackTitle = styled.div``

const NowPlayingQueueHeader = () => (
  <QueueHeaderRow>
    <QueueHeaderPosition>#</QueueHeaderPosition>
    <QueueHeaderTrackTitle>track</QueueHeaderTrackTitle>
  </QueueHeaderRow>
)

export default NowPlayingQueueHeader
