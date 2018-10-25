import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  playerToggleRepeat,
  playerToggleShuffle,
  playerSetVolume,
  playerSetProgress,
  playerTogglePlayPause,
} from '../actionsPlayer'
import { setNextTrack, setPreviousTrack } from '../actions'

const Audio = (Player) => {
  class HOCAudio extends React.Component {
    componentDidMount() {
      // Create an html5 audio element.
      this.audioElement = document.createElement('audio')

      // Add event listeners.
      this.audioElement.addEventListener('ended', this.props.onTrackEnded)
    }

    componentDidUpdate(prevProps) {
      // Manage the current track being player in audio element.
      if (prevProps.track !== this.props.track) {
        // Clear progress update interval.
        this.clearInterval()
        this.loadTrack()
      }
    }

    componentWillUnmount() {
      this.clearInterval()
      this.audioElement.removeEventListener('ended', this.props.onTrackEnded)
      this.audioElement = null
    }

    onPlay = () => {
      // Console.log('on play');
      this.audioElement.play()
      this.props.onPlayPausePress(true)
      this.intervalId = setInterval(() => {
        this.props.onProgressChange(this.audioElement.currentTime)
      }, 900)
    }

    onPause = () => {
      // Console.log('on pause');
      this.audioElement.pause()
      this.props.onPlayPausePress(false)
      this.clearInterval()
    }

    /*
     * Loads a track in the html5 player.
     */
    loadTrack = () => {
      if (this.props.track) {
        // Load track source.
        this.audioElement.src = this.props.track.src

        if (this.props.playing) {
          // Start playing.
          this.onPlay()
        }
      }
    }

    /* Handlers managing the html5 audio player from sub components */
    handlePlayPause = () => {
      if (this.props.playing) {
        this.onPause()
      } else {
        this.onPlay()
      }
    }

    handleSetProgress = (newProgress) => {
      let progress = newProgress
      const duration = this.audioElement.duration
      if (progress > duration) {
        progress = duration
      }

      // Console.log("handleSetProgress set progress to: " + progress)
      this.audioElement.currentTime = progress
      this.props.onProgressChange(progress)
    }

    handleSetVolume = (newVolume) => {
      this.audioElement.volume = newVolume
      this.props.onVolumeChange(newVolume)
    }

    clearInterval() {
      // Console.log('interval cleared');
      if (this.intervalId !== null) {
        clearInterval(this.intervalId)
        this.intervalId = null
      }
    }

    render() {
      // Compute all the data that will be needed by the wrapped component.
      const timelineState = {
        playing: this.props.playing,
        duration:
          this.props.track && this.audioElement
            ? this.audioElement.duration
            : 0,
        progress: this.props.progress,
      }
      const timelineCallbacks = {
        togglePlayPause: this.handlePlayPause,
        setProgress: this.handleSetProgress,
      }
      const controlState = {
        playing: this.props.playing,
        shuffle: this.props.shuffle,
        repeat: this.props.repeat,
        volume: this.props.volume,
      }
      const controlCallbacks = {
        togglePlayPause: this.handlePlayPause,
        skipToPrevious: this.props.onPrevPress,
        skipToNext: this.props.onNextPress,
        toggleShuffle: this.props.onShufflePress,
        toggleRepeat: this.props.onRepeatPress,
        setVolume: this.handleSetVolume,
      }

      const newProps = {
        track: this.props.track,
        timelineState,
        timelineCallbacks,
        controlState,
        controlCallbacks,
      }

      return <Player {...newProps} />
    }
  }
  HOCAudio.propTypes = {
    track: PropTypes.shape({
      id: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
    }),
    playing: PropTypes.bool.isRequired,
    shuffle: PropTypes.bool.isRequired,
    repeat: PropTypes.number.isRequired,
    volume: PropTypes.number.isRequired,
    progress: PropTypes.number.isRequired,
    onPlayPausePress: PropTypes.func.isRequired,
    onTrackEnded: PropTypes.func.isRequired,
    onPrevPress: PropTypes.func.isRequired,
    onNextPress: PropTypes.func.isRequired,
    onShufflePress: PropTypes.func.isRequired,
    onRepeatPress: PropTypes.func.isRequired,
    onVolumeChange: PropTypes.func.isRequired,
    onProgressChange: PropTypes.func.isRequired,
  }
  HOCAudio.defaultProps = {
    track: null,
  }

  const mapStateToProps = state => ({
    track: state.player.track,
    playing: state.player.playing,
    shuffle: state.player.shuffle,
    repeat: state.player.repeat,
    volume: state.player.volume,
    progress: state.player.progress,
  })
  const mapDispatchToProps = dispatch => ({
    onPlayPausePress: (value) => {
      dispatch(playerTogglePlayPause(value))
    },
    onTrackEnded: () => {
      dispatch(setNextTrack())
    },
    onPrevPress: () => {
      dispatch(setPreviousTrack())
    },
    onNextPress: () => {
      dispatch(setNextTrack())
    },
    onShufflePress: () => {
      dispatch(playerToggleShuffle())
    },
    onRepeatPress: () => {
      dispatch(playerToggleRepeat())
    },
    onVolumeChange: (volume) => {
      dispatch(playerSetVolume(volume))
    },
    onProgressChange: (currentTime) => {
      dispatch(playerSetProgress(currentTime))
    },
  })

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(HOCAudio)
}

export default Audio
