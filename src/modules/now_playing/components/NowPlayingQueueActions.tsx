import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import ActionButton from 'common/components/ActionButton'
import { queueClear } from 'modules/player/redux'

const NowPlayingQueueActions = () => {
  const dispatch = useDispatch()

  return (
    <QueueActionsWrapper>
      <ActionButton onClick={() => dispatch(queueClear())} icon="close">
        Clear
      </ActionButton>
    </QueueActionsWrapper>
  )
}

export default NowPlayingQueueActions

const QueueActionsWrapper = styled.div`
  float: right;
`
