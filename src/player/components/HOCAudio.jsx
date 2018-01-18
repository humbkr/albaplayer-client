import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {
  playerSetDuration,
  playerSetProgress, playerSetVolume,
  playerTogglePlay, playerTogglePlayingState, playNextSong, playPreviousSong
} from "../actions";
import {
  PLAYING_STATE_CYCLE,
  PLAYING_STATE_REPEAT,
  PLAYING_STATE_SHUFFLE
} from "../reducers";

const HOCAudio = (Audio) => {
  class HOCAudioComponent extends React.Component {

    constructor(props) {
      super(props);

      // bind methods
      this.playNext = props.autoPlay; // A boolean to determine whether to play the next song or not
      this.loadSrc = this.loadSrc.bind(this);
      this.togglePlayPause = this.togglePlayPause.bind(this);
      this.onCanPlay = this.onCanPlay.bind(this);
      this.onEnded = this.onEnded.bind(this);
      this.onPlay = this.onPlay.bind(this);
      this.onPause = this.onPause.bind(this);
      // this.onTimeUpdate = this.onTimeUpdate.bind(this);
      this.setVolume = this.setVolume.bind(this);
      this.setProgress = this.setProgress.bind(this);
      this.skipToNext = this.skipToNext.bind(this);
      this.skipToPrevious = this.skipToPrevious.bind(this);
      this.togglePlayingState = this.togglePlayingState.bind(this);
      this.playEventHandler = this.playEventHandler.bind(this);
      this.pauseEventHandler = this.pauseEventHandler.bind(this);
      this.skipToNextEventHandler = this.skipToNextEventHandler.bind(this);
      this.skipToPreviousEventHandler = this.skipToPreviousEventHandler.bind(this);
    }

    onCanPlay() {
      console.log('audio oncanplay');
      this.playNext = this.props.playing;
      const dispatch = this.props.dispatch;
      dispatch(playerSetDuration(this.audioElement.duration));

      /*this.setState({
        duration: this.audioElement.duration
      });*/
    }

    onPlay() {
      console.log('audio onplay');
      this.playNext = true;
      const dispatch = this.props.dispatch;
      dispatch(playerTogglePlay(true));

      /*this.intervalId = setInterval(() => {
        dispatch(playerSetProgress(this.audioElement.currentTime));
      }, 900);*/

      /*this.setState({ playing: true });
      this.intervalId = setInterval(() => {
        this.setState({ progress: this.audioElement.currentTime });
      }, 900);*/
    }

    onPause() {
      console.log('audio onpause');
      const dispatch = this.props.dispatch;
      dispatch(playerTogglePlay(false));

      /*this.setState({ playing: false });*/
      this._clearInterval();
    }

    onEnded() {
      console.log('audio onended');
      if (this.playNext) {
        this.handleEndedProgress();
      }
    }

    // onTimeUpdate(e) {
    //   this.setState({ progress: this.audioElement.currentTime });
    //   console.log(e.target.currentTime);
    // }

    handleEndedProgress() {
      const dispatch = this.props.dispatch;
      this.playNext = true;
      switch (this.props.playingState) {
        case PLAYING_STATE_CYCLE: {
          this.skipToNext();
          break;
        }
        case PLAYING_STATE_REPEAT: {
          dispatch(playerSetProgress(0));
          /*this.setState({ progress: 0 });*/

          this.audioElement.currentTime = 0;
          this.togglePlayPause();
          break;
        }
        case PLAYING_STATE_SHUFFLE: {
          //TODO
          const ss = this.state.shuffleState;
          const currentSongIndex = ss.drawPile.indexOf(this.state.currentPlaylistPos);
          const newDrawPile = ss.drawPile;
          const newDiscardPile = ss.discardPile;
          if (currentSongIndex !== -1) {
            newDrawPile.splice(currentSongIndex, 1);
            newDiscardPile.push(this.state.currentPlaylistPos);
          }
          const index = Math.floor(Math.random() * ss.drawPile.length);
          const sliced = newDrawPile.slice(index, index + 1);
          this.setState({
            currentPlaylistPos: sliced[0],
            shuffleState: {
              size: ss.size,
              drawPile: newDrawPile,
              discardPile: newDiscardPile
            }
          });
          if (newDiscardPile.length === ss.size) {
            const shiftedElement = newDiscardPile.shift();
            newDrawPile.push(shiftedElement);
            this.setState({
              shuffleState: {
                size: ss.size,
                drawPile: newDrawPile,
                discardPile: newDiscardPile
              }
            });
          }
          this.loadSrc();
          break;
        }
        default: {
          // console.log('onend BUG!!!');
          break;
        }
      }
    }

    setVolume(volume) {
      // console.log(`volume is set to ${volume}`);
      this.audioElement.volume = volume;

      const dispatch = this.props.dispatch;
      dispatch(playerSetVolume(volume));
      /*this.setState({ volume });*/
    }

    setProgress(newProgress) {
      let progress = newProgress;
      const duration = this.audioElement.duration;
      if (progress > duration) {
        progress = duration;
      }
      this.audioElement.currentTime = progress;
      const dispatch = this.props.dispatch;
      dispatch(playerSetProgress(progress));

      /*this.setState({ progress });*/
      // console.log(`progress is set to ${progress}`);
    }

    /*
     * Clear the interval used to track the song progress.
     */
    _clearInterval() {
      // console.log('interval cleared');
      if (this.intervalId !== null) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    }

    //TODO
    loadSrc() {
      console.log('load src');
      const dispatch = this.props.dispatch;
      const track = this.props.track;

      if (track && track.src !== undefined) {
        this.audioElement.src = track.src;
        this.audioElement.load();
        if (this.playNext) {
          this.audioElement.play();
        }
        dispatch(playerSetProgress(0));

        /*this.setState({ progress: 0 });*/
        this._clearInterval();
      }
    }

    togglePlayPause() {
      console.log('toggle playpause');
      const dispatch = this.props.dispatch;
      const track = this.props.track;
      if (!track) {
        console.log(this.props.track);
        dispatch(playNextSong());
        console.log(this.props.track);
        return;
      }

      const playing = this.props.playing;
      if (playing) {
        dispatch(playerTogglePlay(true));
        this.audioElement.pause();
      } else if (this.audioElement.currentTime === this.audioElement.duration) {
        this.handleEndedProgress();
      } else {
        dispatch(playerTogglePlay(true));
        this.audioElement.play();
      }
    }

    //TODO
    skipToNext() {
      console.log('skip to next');
      const dispatch = this.props.dispatch;
      dispatch(playNextSong());
      this.loadSrc();
    }

    //TODO
    skipToPrevious() {
      console.log('skip to next');
      const dispatch = this.props.dispatch;
      dispatch(playPreviousSong());
      this.loadSrc();
    }
    //TODO
    togglePlayingState() {
      const dispatch = this.props.dispatch;
      dispatch(playerTogglePlayingState());
      /*this.setState({
        playingState: this.setCycleNumPos(this.state.playingState, 1, 3)
      });*/
    }

    playEventHandler() {
      this.audioElement.play();
    }
    pauseEventHandler() {
      this.audioElement.pause();
    }
    skipToNextEventHandler() {
      this.skipToNext();
    }
    skipToPreviousEventHandler() {
      this.skipToPrevious();
    }

    componentDidMount() {
      console.log('Audio mounted!');
      // set audio element event listeners
      this.audioElement = document.createElement('audio');
      this.audioElement.addEventListener('canplay', this.onCanPlay);
      this.audioElement.addEventListener('ended', this.onEnded);
      this.audioElement.addEventListener('play', this.onPlay);
      this.audioElement.addEventListener('pause', this.onPause);
      this.audioElement.addEventListener('volumechange', this.onVolumeChange);

      this.loadSrc();
      const dispatch = this.props.dispatch;
      dispatch(playerSetVolume(this.audioElement.volume));
      /*this.setState({ volume: this.audioElement.volume });*/

      ReactDOM.findDOMNode(this).addEventListener('audio-play', this.playEventHandler);
      ReactDOM.findDOMNode(this).addEventListener('audio-pause', this.pauseEventHandler);
      ReactDOM.findDOMNode(this).addEventListener('audio-skip-to-next', this.skipToNextEventHandler);
      ReactDOM.findDOMNode(this).addEventListener('audio-skip-to-previous', this.skipToPreviousEventHandler);
    }

    componentWillUnmount() {
      this._clearInterval();
      this.audioElement.removeEventListener('canplay', this.onCanPlay);
      this.audioElement.removeEventListener('ended', this.onEnded);
      this.audioElement.removeEventListener('play', this.onPlay);
      this.audioElement.removeEventListener('pause', this.onPause);
      this.audioElement.removeEventListener('volumechange', this.onVolumeChange);
      this.audioElement = null;

      ReactDOM.findDOMNode(this).removeEventListener('audio-play', this.playEventHandler);
      ReactDOM.findDOMNode(this).removeEventListener('audio-pause', this.pauseEventHandler);
      ReactDOM.findDOMNode(this).removeEventListener('audio-skip-to-next', this.skipToNextEventHandler);
      ReactDOM.findDOMNode(this).removeEventListener('audio-skip-to-previous', this.skipToPreviousEventHandler);
    }

    componentDidUpdate(prevProps, prevState) {
      console.log('HOCAudio updated!');
      //console.log(this.props.track);
      //ReactDOM.findDOMNode(this.audioComponent).dispatchEvent(new Event('audio-play'));
    }

    render() {
      const track = this.props.track;

      console.log('in HOCAudio render');
      console.log(track);
      let songTitle = '';
      let songArtist = '';
      let cover = '';
      if (track) {
        songTitle = (track.title) ? track.title : 'Unknown title';
        songArtist = (track.artist) ? track.artist.name : 'Unknown artist';
        cover = (track.cover) ? track.cover : null;
      }

      // Generate all the AudioPlayer component props calculated here.
      // Other props are passed via mapStateToProps to AudioPlayer.
      const newProps = Object.assign({}, {
        songInfo: {
          title: songTitle,
          artist: songArtist,
          cover: cover
        },
        controlCallbacks: {
          setVolume: this.setVolume,
          togglePlayPause: this.togglePlayPause,
          togglePlayingState: this.togglePlayingState,
          skipToNext: this.skipToNext,
          skipToPrevious: this.skipToPrevious
        },
        timelineCallbacks: {
          setProgress: this.setProgress,
          togglePlayPause: this.togglePlayPause
        },
        children: this.props.children
      }, this.props);

      console.log(newProps);

      return <Audio {...newProps} />;
    }
  }

  const mapStateToProps = state => {
    return {
      playing: state.player.playing,
      playingState: state.player.playingState,
      track: state.player.track,
      controlStates: {
        playing: state.player.playing,
        playingState: state.player.playingState,
        volume: state.player.volume
      },
      timelineStates: {
        playing: state.player.playing,
        progress: state.player.progress,
        duration: state.player.duration
      },
    }
  };

  return connect(mapStateToProps)(HOCAudioComponent);
};
HOCAudio.propTypes = {
  dispatch: PropTypes.func.isRequired,
  playing: PropTypes.bool.isRequired,
  playingState: PropTypes.number,
  track: PropTypes.objectOf(PropTypes.shape({
    title: PropTypes.string,
    src: PropTypes.string.isRequired,
    cover: PropTypes.string,
    artist: PropTypes.objectOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }))
  })).isRequired
};


export default HOCAudio;
