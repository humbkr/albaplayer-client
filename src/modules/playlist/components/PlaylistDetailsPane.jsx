import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import connect from 'react-redux/es/connect/connect'
import PlaylistTrackList from './PlaylistTrackList'
import ListItem from './ListItem'
import ActionButtonIcon from '../../../common/components/ActionButtonIcon'
import { actions } from '../duck'
import { operations as playerOperations } from '../../player/duck'
import PlaylistTrackContextMenu from './PlaylistTrackContextMenu'
import KeyboardNavPlayPopup from '../../../common/components/KeyboardNavPlayPopup'

class PlaylistDetailsPane extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      modalIsOpen: false,
    }
  }

  removeTrack = (trackId) => {
    const { item, playlistRemoveTrack } = this.props

    playlistRemoveTrack(item.id, trackId)
  }

  onKeyDown = (e) => {
    const { switchPaneHandler } = this.props

    if (e.keyCode === 13) {
      this.openModal()
    } else {
      switchPaneHandler(e)
    }
  }

  openModal = () => {
    this.setState({ modalIsOpen: true })
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false })
  }

  render() {
    const {
      item,
      currentPosition,
      currentTrackId,
      deletePlaylist,
      playlistPlay,
      playlistAddToQueue,
      playlistSelectTrack,
      playlistUpdateTracklist,
      forwardedRef,
      handleTrackPlayNow,
      handleTrackAddToQueue,
    } = this.props

    // If no playlist is selected, display nothing.
    if (!item) {
      return null
    }

    return (
      <Wrapper>
        <List>
          <Header>
            <Info>
              <Title>{item.title}</Title>
              <Subtitle>
                {item.date} - {item.tracks.length} track(s)
              </Subtitle>
            </Info>
            <Actions>
              <PlaylistActionButtons
                icon="play_arrow"
                size={30}
                onClick={() => playlistPlay(item.id)}
              />
              <PlaylistActionButtons
                icon="playlist_add"
                size={30}
                onClick={() => playlistAddToQueue(item.id)}
              />
              <PlaylistActionButtons
                icon="delete"
                size={25}
                onClick={() => {
                  if (
                    window.confirm(
                      'Are you sure you wish to delete this playlist?'
                    )
                  ) {
                    deletePlaylist(item)
                  }
                }}
              />
            </Actions>
          </Header>
          <PlaylistTrackList
            playlistId={item.id}
            items={item.tracks}
            currentPosition={currentPosition}
            onItemClick={playlistSelectTrack}
            handleRemoveTrack={this.removeTrack}
            onTrackListUpdate={playlistUpdateTracklist}
            onKeyDown={this.onKeyDown}
            ref={forwardedRef}
          />
          <KeyboardNavPlayPopup
            id="playlist-tracks-nav-modal"
            isOpen={this.state.modalIsOpen}
            onClose={this.closeModal}
            itemId={currentTrackId}
            handlePlayNow={handleTrackPlayNow}
            handleAddToQueue={handleTrackAddToQueue}
          />
        </List>
        <PlaylistTrackContextMenu />
      </Wrapper>
    )
  }
}
PlaylistDetailsPane.propTypes = {
  item: PropTypes.objectOf(PropTypes.shape),
  currentPosition: PropTypes.number.isRequired,
  currentTrackId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  deletePlaylist: PropTypes.func.isRequired,
  playlistPlay: PropTypes.func.isRequired,
  playlistAddToQueue: PropTypes.func.isRequired,
  playlistSelectTrack: PropTypes.func.isRequired,
  playlistRemoveTrack: PropTypes.func.isRequired,
  playlistUpdateTracklist: PropTypes.func.isRequired,
  handleTrackAddToQueue: PropTypes.func.isRequired,
  handleTrackPlayNow: PropTypes.func.isRequired,
  switchPaneHandler: PropTypes.func.isRequired,
  forwardedRef: PropTypes.shape().isRequired,
}
PlaylistDetailsPane.defaultProps = {
  item: null,
}

const mapStateToProps = (state) => ({
  item: state.playlist.currentPlaylist.playlist,
  currentPosition: state.playlist.currentTrack.position,
  currentTrackId: state.playlist.currentTrack.id,
})
const mapDispatchToProps = (dispatch) => ({
  deletePlaylist: (playlist) => {
    dispatch(actions.playlistDeletePlaylist(playlist))
  },
  playlistAddToQueue: (playlistId) => {
    dispatch(playerOperations.addPlaylist(playlistId))
  },
  playlistPlay: (playlistId) => {
    dispatch(playerOperations.playPlaylist(playlistId))
  },
  playlistSelectTrack: (trackId, index) => {
    dispatch(actions.playlistSelectTrack(trackId, index))
  },
  playlistRemoveTrack: (playlistId, trackPosition) => {
    dispatch(actions.playlistRemoveTrack(playlistId, trackPosition))
  },
  playlistUpdateTracklist: (playlistId, newTrackList) => {
    dispatch(actions.playlistUpdateTracks(playlistId, newTrackList))
  },
  handleTrackPlayNow: (trackId) => {
    dispatch(playerOperations.playTrack(trackId))
  },
  handleTrackAddToQueue: (trackId) => {
    dispatch(playerOperations.addTrack(trackId))
  },
})

const ConnectedPlaylistDetailsPane = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistDetailsPane)

export default React.forwardRef((props, ref) => (
  <ConnectedPlaylistDetailsPane {...props} forwardedRef={ref} />
))

const Wrapper = styled.div`
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
  width: 66%;
  height: 100%;

  :focus-within {
    // Can't find a way to manage that directly in the
    // ListItem component.
    ${ListItem}.selected {
      ${(props) => `background-color: ${props.theme.highlightFocus}`};
    }
    ${ListItem} .selected {
      ${(props) => `color: ${props.theme.textHighlightFocusColor}`};
    }
  }
`
const List = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${(props) => props.theme.itemHeight};
  border-bottom: 1px solid ${(props) => props.theme.separatorColor};
`
const Actions = styled.div`
  display: inline-block;
`
const PlaylistActionButtons = styled(ActionButtonIcon)`
  color: ${(props) => props.theme.buttons.color};

  :hover {
    color: ${(props) => props.theme.buttons.colorHover};
  }
`
const Info = styled.div`
  display: inline-block;
  padding-left: 15px;
`
const Title = styled.h1`
  font-size: 1.3em;
`
const Subtitle = styled.p`
  font-size: 0.8em;
  margin-top: 2px;
  font-weight: normal;
  color: ${(props) => props.theme.textSecondaryColor};
`
