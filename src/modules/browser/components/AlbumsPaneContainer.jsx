import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import KeyboardNavPlayPopup from 'common/components/KeyboardNavPlayPopup'
import { addAlbum, playAlbum } from 'modules/player/redux'
import LibraryBrowserList from 'modules/browser/components/LibraryBrowserList'
import AlbumTeaser from './AlbumTeaser'
import LibraryBrowserListHeader from './LibraryBrowserListHeader'
import LibraryBrowserPane from './LibraryBrowserPane'
import AlbumContextMenu from './AlbumContextMenu'
import { getAlbumsList, libraryBrowserSortAlbums, selectAlbum } from '../redux'

function AlbumsPaneContainer({ switchPaneHandler, forwardedRef }) {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const albums = useSelector((state) => getAlbumsList(state))
  const orderBy = useSelector((state) => state.libraryBrowser.sortAlbums)
  const currentPosition = useSelector(
    (state) => state.libraryBrowser.currentPositionAlbums
  )
  const currentAlbum = useSelector(
    (state) => state.libraryBrowser.selectedAlbums
  )
  const dispatch = useDispatch()

  const orderByOptions = [
    { value: 'title', label: 'title' },
    { value: 'year', label: 'year' },
    { value: 'artistName', label: 'artist' },
  ]

  // Change event handler for LibraryBrowserListHeader.
  const onSortChangeHandler = (event) => {
    dispatch(libraryBrowserSortAlbums(event.target.value))
  }

  const onItemClick = (itemId, index) => {
    dispatch(selectAlbum({ albumId: itemId, index }))
  }

  const handlePlayNow = (albumId) => {
    dispatch(playAlbum(albumId))
  }

  const handleAddToQueue = (albumId) => {
    dispatch(addAlbum(albumId))
  }

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      setModalIsOpen(true)
    } else {
      switchPaneHandler(e)
    }
  }

  return (
    <AlbumsPaneWrapper>
      <LibraryBrowserPane>
        <LibraryBrowserListHeader
          title="Albums"
          orderBy={orderBy}
          orderByOptions={orderByOptions}
          onChange={onSortChangeHandler}
        />
        <LibraryBrowserList
          ref={forwardedRef}
          items={albums}
          itemDisplay={AlbumTeaser}
          currentPosition={currentPosition}
          onItemClick={onItemClick}
          onKeyDown={onKeyDown}
        />
        <AlbumContextMenu />
        <KeyboardNavPlayPopup
          id="albums-nav-modal"
          onClose={() => setModalIsOpen(false)}
          isOpen={modalIsOpen}
          itemId={currentAlbum}
          handlePlayNow={handlePlayNow}
          handleAddToQueue={handleAddToQueue}
        />
      </LibraryBrowserPane>
    </AlbumsPaneWrapper>
  )
}
AlbumsPaneContainer.propTypes = {
  switchPaneHandler: PropTypes.func.isRequired,
  forwardedRef: PropTypes.shape().isRequired,
}

export default React.forwardRef((props, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <AlbumsPaneContainer {...props} forwardedRef={ref} />
))

const AlbumsPaneWrapper = styled.div`
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
  width: 33%;
  height: 100%;
  border-left: 1px solid ${(props) => props.theme.separatorColor};
  border-right: 1px solid ${(props) => props.theme.separatorColor};
`
