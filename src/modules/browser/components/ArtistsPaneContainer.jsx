import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import LibraryBrowserList from './LibraryBrowserList'
import ArtistTeaser from './ArtistTeaser'
import LibraryBrowserPane from './LibraryBrowserPane'
import LibraryBrowserListHeader from './LibraryBrowserListHeader'
import ArtistContextMenu from './ArtistContextMenu'
import KeyboardNavPlayPopup from '../../../common/components/KeyboardNavPlayPopup'
import { actions, selectors } from '../duck'
import { operations as playerOperations } from '../../player/duck'

function ArtistsPaneContainer({ switchPaneHandler, forwardedRef }) {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const artists = useSelector((state) => selectors.getArtistsList(state))
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
    dispatch(actions.libraryBrowserSortArtists(event.target.value))
  }

  const onItemClick = (itemId, index) => {
    dispatch(actions.libraryBrowserSelectArtist(itemId, index))
  }

  const handlePlayNow = (artistId) => {
    dispatch(playerOperations.playArtist(artistId))
  }

  const handleAddToQueue = (artistId) => {
    dispatch(playerOperations.addArtist(artistId))
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
  <ArtistsPaneContainer {...props} forwardedRef={ref} />
))

const ArtistsPaneWrapper = styled.div`
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
  width: 33%;
  height: 100%;
`
