import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { ContextMenuProvider } from 'react-contexify'

const QueueItemWrapper = styled.li`
  display: table;
  table-layout: fixed;
  width: 100%;
  border-bottom: 1px solid ${props => props.theme.separatorColor};

  ${props => (props.isCurrent ? 'font-weight: bold' : '')};

  :hover {
    background-color: ${props => props.theme.highlight};
  }
`

const QueueItemPosition = styled.div`
  display: table-cell;
  width: 60px;
  text-align: center;
  vertical-align: middle;
  color: ${props => props.theme.textSecondaryColor};
`

const QueueItemTrackTitle = styled.div`
  display: table-cell;
  vertical-align: middle;
`

const NowPlayingQueueItem = (props) => {
  const { item, itemHeight, current } = props

  return (
    <ContextMenuProvider id="queue-item-context-menu" data={item}>
      <QueueItemWrapper
        style={{ height: itemHeight }}
        isCurrent={current + 1 === item.position}
      >
        <QueueItemPosition>{item.position}</QueueItemPosition>
        <QueueItemTrackTitle>{item.title}</QueueItemTrackTitle>
      </QueueItemWrapper>
    </ContextMenuProvider>
  )
}
NowPlayingQueueItem.propTypes = {
  item: PropTypes.shape({
    position: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    duration: PropTypes.number,
  }).isRequired,
  itemHeight: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
}

export default NowPlayingQueueItem
