import React from 'react'
import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'
import TrackInfo from './TrackInfo'
import Controls from './Controls'
import Audio from './Audio'
import Timeline from './Timeline'

const PlayerWrapper = styled.div`
  width: 100%;
`

class Player extends React.Component {
  getChildContext() {
    return {
      // For controls buttons.
      // TODO theme.
      color: '#fff',
      colorEnabled: '#f97c4b',
    }
  }

  render() {
    const {
      track,
      // Properties added by the Audio HOC.
      timelineState,
      timelineCallbacks,
      controlState,
      controlCallbacks,
    } = this.props

    return (
      <PlayerWrapper>
        <TrackInfo track={track} />
        <Timeline
          appWidth={parseInt(this.props.theme.sidebar.width, 0)}
          updateProgressTime={this.updateProgressTime}
          {...timelineState}
          {...timelineCallbacks}
        />
        <Controls {...controlState} {...controlCallbacks} />
      </PlayerWrapper>
    )
  }
}
Player.propTypes = {
  track: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    duration: PropTypes.number,
    number: PropTypes.number,
    disc: PropTypes.string,
  }),
  controlState: PropTypes.shape({
    playing: PropTypes.bool.isRequired,
    shuffle: PropTypes.bool.isRequired,
    repeat: PropTypes.number.isRequired,
    volume: PropTypes.number.isRequired,
  }).isRequired,
  controlCallbacks: PropTypes.shape({
    togglePlayPause: PropTypes.func.isRequired,
    toggleRepeat: PropTypes.func.isRequired,
    setVolume: PropTypes.func.isRequired,
    skipToPrevious: PropTypes.func.isRequired,
    skipToNext: PropTypes.func.isRequired,
  }).isRequired,
  timelineState: PropTypes.shape({
    playing: PropTypes.bool.isRequired,
    duration: PropTypes.number.isRequired,
    progress: PropTypes.number.isRequired,
  }).isRequired,
  timelineCallbacks: PropTypes.shape({
    togglePlayPause: PropTypes.func.isRequired,
    setProgress: PropTypes.func.isRequired,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  theme: PropTypes.object.isRequired,
}
Player.defaultProps = {
  track: null,
}
Player.childContextTypes = {
  color: PropTypes.string,
  colorEnabled: PropTypes.string,
}

export default Audio(withTheme(Player))