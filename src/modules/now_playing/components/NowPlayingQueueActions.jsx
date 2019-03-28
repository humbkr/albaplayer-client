import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ActionButton from '../../../common/components/ActionButton'
import { actions } from '../../player/duck'

const NowPlayingQueueActions = (props) => (
  <QueueActionsWrapper>
    <ActionButton onClick={props.clearQueue} icon="close">
      Clear
    </ActionButton>
  </QueueActionsWrapper>
)
NowPlayingQueueActions.propTypes = {
  clearQueue: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  clearQueue: () => {
    dispatch(actions.queueClear())
  },
})

export default connect(
  null,
  mapDispatchToProps
)(NowPlayingQueueActions)

const QueueActionsWrapper = styled.div`
  float: right;
`
