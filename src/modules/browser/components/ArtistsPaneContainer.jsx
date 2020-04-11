import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import KeyboardNavPlayPopup from 'common/components/KeyboardNavPlayPopup'
import { playArtist, addArtist } from 'modules/player/redux'
import LibraryBrowserList from 'modules/browser/components/LibraryBrowserList'
import ArtistTeaser from './ArtistTeaser'
import LibraryBrowserPane from './LibraryBrowserPane'
import LibraryBrowserListHeader from './LibraryBrowserListHeader'
import ArtistContextMenu from './ArtistContextMenu'
import {
  getArtistsList,
  libraryBrowserSortArtists,
  selectArtist,
} from '../redux'

function ArtistsPaneContainer({ switchPaneHandler, forwardedRef }) {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const artists = useSelector((state) => getArtistsList(state))
  const orderBy = useSelector((state) => state.libraryBrowser.sortArtists)
  const currentPosition = useSelector(
    (state) => state.libraryBrowser.currentPositionArtists
  )
  const currentArtist = useSelector(
    (state) => state.libraryBrowser.selectedArtists
  )
  const dispatch = useDispatch()

  const orderByOptions = [{ value: 'name', label: 'name' }]

  // Change event handler for LibraryBrowserListHeader.
  const onSortChangeHandler = (event) => {
    dispatch(libraryBrowserSortArtists(event.target.value))
  }

  const onItemClick = (itemId, index) => {
    dispatch(selectArtist({ artistId: itemId, index }))
  }

  const handlePlayNow = (artistId) => {
    dispatch(playArtist(artistId))
  }

  const handleAddToQueue = (artistId) => {
    dispatch(addArtist(artistId))
  }

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      setModalIsOpen(true)
    } else {
      switchPaneHandler(e)
    }
  }

  return (
    <ArtistsPaneWrapper>
      <LibraryBrowserPane>
        <LibraryBrowserListHeader
          title="Artists"
          orderBy={orderBy}
          orderByOptions={orderByOptions}
          onChange={onSortChangeHandler}
        />
        <LibraryBrowserList
          ref={forwardedRef}
          items={artists}
          itemDisplay={ArtistTeaser}
          currentPosition={currentPosition}
          onItemClick={onItemClick}
          onKeyDown={onKeyDown}
        />
        <ArtistContextMenu />
        <KeyboardNavPlayPopup
          id="artists-nav-modal"
          onClose={() => setModalIsOpen(false)}
          isOpen={modalIsOpen}
          itemId={currentArtist}
          handlePlayNow={handlePlayNow}
          handleAddToQueue={handleAddToQueue}
        />
      </LibraryBrowserPane>
    </ArtistsPaneWrapper>
  )
}
ArtistsPaneContainer.propTypes = {
  switchPaneHandler: PropTypes.func.isRequired,
  forwardedRef: PropTypes.shape().isRequired,
}

export default React.forwardRef((props, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <ArtistsPaneContainer {...props} forwardedRef={ref} />
))

const ArtistsPaneWrapper = styled.div`
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
  width: 33%;
  height: 100%;
`
