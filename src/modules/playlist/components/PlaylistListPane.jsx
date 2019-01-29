import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PlaylistsListHeader from './PlaylistListHeader'
import PlaylistAddPopup from './PlaylistAddPopup'
import PlaylistList from './PlaylistList'
import { actions, selectors } from '../duck'
import PlaylistContextMenu from './PlaylistContextMenu'
import ListItem from './ListItem'
import KeyboardNavPlayPopup from '../../../common/components/KeyboardNavPlayPopup'
import { operations } from '../../player/duck'

// Playlist edition must be accessible to the children of this component.
const EditPlaylistContext = React.createContext()

class PlaylistListPane extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      modalPlayerIsOpen: false,
      modalPlaylistIsOpen: false,
      modalPlaylistMode: null,
    }
  }

  onKeyDown = (e) => {
    const { switchPaneHandler } = this.props

    if (e.keyCode === 13) {
      this.openPlayerModal()
    } else {
      switchPaneHandler(e)
    }
  }

  openPlayerModal = () => {
    this.setState({ modalPlayerIsOpen: true })
  }

  closePlayerModal = () => {
    this.setState({ modalPlayerIsOpen: false })
  }

  /**
   * @param mode string
   *   edit|add
   */
  openPlaylistModal = (mode) => {
    this.setState({ modalPlaylistIsOpen: true, modalPlaylistMode: mode })
  }

  closePlaylistModal = () => {
    this.setState({ modalPlaylistIsOpen: false })
  }

  render() {
    const {
      playlists,
      selectPlaylist,
      createPlaylist,
      editPlaylist,
      selected,
      currentPosition,
      forwardedRef,
      handleAddToQueue,
      handlePlayNow,
    } = this.props

    return (
      <Wrapper>
        <EditPlaylistContext.Provider value={this.openPlaylistModal}>
          <List>
            <PlaylistsListHeader onAddClick={() => this.openPlaylistModal()} />
            <PlaylistList
              items={playlists}
              selected={selected}
              currentPosition={currentPosition}
              onItemClick={selectPlaylist}
              onKeyDown={this.onKeyDown}
              onEditPlaylist={this.openPlaylistModal}
              ref={forwardedRef}
            />
            <PlaylistAddPopup
              id="playlist-add-modal"
              onClose={() => this.closePlaylistModal()}
              isOpen={this.state.modalPlaylistIsOpen}
              mode={this.state.modalPlaylistMode}
              playlist={selected}
              handleCreatePlaylist={createPlaylist}
              handleEditPlaylist={editPlaylist}
            />
            <KeyboardNavPlayPopup
              id="playlists-nav-modal"
              isOpen={this.state.modalPlayerIsOpen}
              onClose={this.closePlayerModal}
              itemId={selected ? selected.id : null}
              handlePlayNow={handlePlayNow}
              handleAddToQueue={handleAddToQueue}
            />
          </List>
          <PlaylistContextMenu />
        </EditPlaylistContext.Provider>
      </Wrapper>
    )
  }
}
PlaylistListPane.propTypes = {
  playlists: PropTypes.arrayOf(PropTypes.shape).isRequired,
  selected: PropTypes.objectOf(PropTypes.shape),
  currentPosition: PropTypes.number.isRequired,
  selectPlaylist: PropTypes.func.isRequired,
  createPlaylist: PropTypes.func.isRequired,
  editPlaylist: PropTypes.func.isRequired,
  handlePlayNow: PropTypes.func.isRequired,
  handleAddToQueue: PropTypes.func.isRequired,
  switchPaneHandler: PropTypes.func.isRequired,
  forwardedRef: PropTypes.shape().isRequired,
}
PlaylistListPane.defaultProps = {
  selected: null,
}

const mapStateToProps = (state) => ({
  selected: state.playlist.currentPlaylist.playlist,
  currentPosition: state.playlist.currentPlaylist.position,
  playlists: selectors.getPlaylists(state),
})
const mapDispatchToProps = (dispatch) => ({
  selectPlaylist: (playlist, index) => {
    dispatch(actions.playlistSelectPlaylist(playlist, index))
  },
  createPlaylist: (title) => {
    dispatch(actions.playlistCreatePlaylist(title))
  },
  editPlaylist: (playlist) => {
    dispatch(actions.playlistUpdateInfo(playlist))
  },
  handlePlayNow: (playlistId) => {
    dispatch(operations.playPlaylist(playlistId))
  },
  handleAddToQueue: (playlistId) => {
    dispatch(operations.addPlaylist(playlistId))
  },
})

const ConnectedPlaylistListPane = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistListPane)

export default React.forwardRef((props, ref) => (
  <ConnectedPlaylistListPane {...props} forwardedRef={ref} />
))

export { EditPlaylistContext }

const Wrapper = styled.div`
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
  width: 34%;
  height: 100%;
  border-right: 1px solid ${(props) => props.theme.separatorColor};

  :focus-within {
    // Can't find a way to manage that directly in the
    // ListItem component.
    ${ListItem}.selected {
      ${(props) => `background-color: ${props.theme.highlightFocus}`};
    }
  }
`
const List = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`
