import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import KeyboardNavPlayPopup from 'common/components/KeyboardNavPlayPopup'
import { addTrack, playTrack } from 'modules/player/redux'
import LibraryBrowserList from './LibraryBrowserList'
import TrackTeaser from './TrackTeaser'
import LibraryBrowserListHeader from './LibraryBrowserListHeader'
import TrackContextMenu from './TrackContextMenu'
import LibraryBrowserPane from './LibraryBrowserPane'
import {
  getTracksList,
  libraryBrowserSortTracks,
  libraryBrowserSelectTrack,
} from '../redux'

function TracksPaneContainer({ switchPaneHandler, forwardedRef }) {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const tracks = useSelector((state) => getTracksList(state))
  const orderBy = useSelector((state) => state.libraryBrowser.sortTracks)
  const currentPosition = useSelector(
    (state) => state.libraryBrowser.currentPositionTracks
  )
  const currentTrack = useSelector(
    (state) => state.libraryBrowser.selectedTracks
  )
  const dispatch = useDispatch()

  const orderByOptions = [
    { value: 'title', label: 'title' },
    { value: 'number', label: 'track number' },
    { value: 'albumId', label: 'album' },
    { value: 'artistId', label: 'artist' },
  ]

  // Change event handler for LibraryBrowserListHeader.
  const onSortChangeHandler = (event) => {
    dispatch(libraryBrowserSortTracks(event.target.value))
  }

  const onItemClick = (itemId, index) => {
    dispatch(libraryBrowserSelectTrack(itemId, index))
  }

  const handlePlayNow = (trackId) => {
    dispatch(playTrack(trackId))
  }

  const handleAddToQueue = (trackId) => {
    dispatch(addTrack(trackId))
  }

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      setModalIsOpen(true)
    } else {
      switchPaneHandler(e)
    }
  }

  return (
    <TracksPaneWrapper>
      <LibraryBrowserPane>
        <LibraryBrowserListHeader
          title="Tracks"
          orderBy={orderBy}
          orderByOptions={orderByOptions}
          onChange={onSortChangeHandler}
        />
        {tracks.length > 1 && (
          <LibraryBrowserList
            ref={forwardedRef}
            items={tracks}
            itemDisplay={TrackTeaser}
            currentPosition={currentPosition}
            onItemClick={onItemClick}
            onKeyDown={onKeyDown}
          />
        )}
        {tracks.length === 1 && <NoTracks>Select an artist or album</NoTracks>}
        <TrackContextMenu />
        <KeyboardNavPlayPopup
          id="tracks-nav-modal"
          onClose={() => setModalIsOpen(false)}
          isOpen={modalIsOpen}
          itemId={currentTrack}
          handlePlayNow={handlePlayNow}
          handleAddToQueue={handleAddToQueue}
        />
      </LibraryBrowserPane>
    </TracksPaneWrapper>
  )
}
TracksPaneContainer.propTypes = {
  switchPaneHandler: PropTypes.func.isRequired,
  forwardedRef: PropTypes.shape().isRequired,
}

export default React.forwardRef((props, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <TracksPaneContainer {...props} forwardedRef={ref} />
))

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
