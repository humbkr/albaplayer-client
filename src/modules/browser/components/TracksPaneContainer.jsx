import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import LibraryBrowserList from './LibraryBrowserList'
import TrackTeaser from './TrackTeaser'
import LibraryBrowserListHeader from './LibraryBrowserListHeader'
import TrackContextMenu from './TrackContextMenu'
import LibraryBrowserPane from './LibraryBrowserPane'
import KeyboardNavPlayPopup from './KeyboardNavPlayPopup'
import { actions, selectors } from '../duck'
import { addTrack, playTrack } from '../../player/actions'

const TracksPaneWrapper = styled.div`
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
  width: 34%;
  height: 100%;
`

const NoTracks = styled.div`
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  font-style: italic;
  color: ${(props) => props.theme.textSecondaryColor};
`

class TracksPaneContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modalIsOpen: false,
    }
  }

  // Change event handler for LibraryBrowserListHeader.
  onSortChangeHandler = (event) => {
    // Pass the new selected sort option to the dispatcher.
    this.props.onSortChange(event.target.value)
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
      tracks,
      orderBy,
      currentPosition,
      currentTrack,
      onItemClick,
      forwardedRef,
      handlePlayNow,
      handleAddToQueue,
    } = this.props

    const orderByOptions = [
      { value: 'title', label: 'title' },
      { value: 'number', label: 'track number' },
      { value: 'albumId', label: 'album' },
      { value: 'artistId', label: 'artist' },
    ]

    return (
      <TracksPaneWrapper>
        <LibraryBrowserPane>
          <LibraryBrowserListHeader
            title="Tracks"
            orderBy={orderBy}
            orderByOptions={orderByOptions}
            onChange={this.onSortChangeHandler}
          />
          {tracks.length > 1 && (
            <LibraryBrowserList
              ref={forwardedRef}
              items={tracks}
              itemDisplay={TrackTeaser}
              currentPosition={currentPosition}
              onItemClick={onItemClick}
              onKeyDown={this.onKeyDown}
            />
          )}
          {tracks.length === 1 && (
            <NoTracks>Select an artist or album</NoTracks>
          )}
          <TrackContextMenu />
          <KeyboardNavPlayPopup
            id="tracks-nav-modal"
            onClose={this.closeModal}
            isOpen={this.state.modalIsOpen}
            itemId={currentTrack}
            handlePlayNow={handlePlayNow}
            handleAddToQueue={handleAddToQueue}
          />
        </LibraryBrowserPane>
      </TracksPaneWrapper>
    )
  }
}
TracksPaneContainer.propTypes = {
  tracks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  orderBy: PropTypes.string.isRequired,
  currentPosition: PropTypes.number.isRequired,
  currentTrack: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
  switchPaneHandler: PropTypes.func.isRequired,
  forwardedRef: PropTypes.shape().isRequired,
  handlePlayNow: PropTypes.func.isRequired,
  handleAddToQueue: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  tracks: selectors.getTracksList(state),
  orderBy: state.libraryBrowser.sortTracks,
  currentPosition: state.libraryBrowser.currentPositionTracks,
  currentTrack: state.libraryBrowser.selectedTracks,
})
const mapDispatchToProps = (dispatch) => ({
  onSortChange: (sortProperty) => {
    dispatch(actions.libraryBrowserSortTracks(sortProperty))
  },
  onItemClick: (itemId, index) => {
    dispatch(actions.libraryBrowserSelectTrack(itemId, index))
  },
  handlePlayNow: (trackId) => {
    dispatch(playTrack(trackId))
  },
  handleAddToQueue: (trackId) => {
    dispatch(addTrack(trackId))
  },
})

const ConnectedTracksPaneContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TracksPaneContainer)

export default React.forwardRef((props, ref) => (
  <ConnectedTracksPaneContainer {...props} forwardedRef={ref} />
))
