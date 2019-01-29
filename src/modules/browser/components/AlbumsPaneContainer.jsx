import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import LibraryBrowserList from './LibraryBrowserList'
import AlbumTeaser from './AlbumTeaser'
import LibraryBrowserListHeader from './LibraryBrowserListHeader'
import LibraryBrowserPane from './LibraryBrowserPane'
import AlbumContextMenu from './AlbumContextMenu'
import KeyboardNavPlayPopup from '../../../common/components/KeyboardNavPlayPopup'
import { actions, selectors } from '../duck'
import { operations as playerOperations } from '../../player/duck'

const AlbumsPaneWrapper = styled.div`
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
  width: 33%;
  height: 100%;
  border-left: 1px solid ${(props) => props.theme.separatorColor};
  border-right: 1px solid ${(props) => props.theme.separatorColor};
`

class AlbumsPaneContainer extends Component {
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
      albums,
      orderBy,
      currentPosition,
      currentAlbum,
      onItemClick,
      forwardedRef,
      handlePlayNow,
      handleAddToQueue,
    } = this.props

    const orderByOptions = [
      { value: 'title', label: 'title' },
      { value: 'year', label: 'year' },
      { value: 'artistName', label: 'artist' },
    ]

    return (
      <AlbumsPaneWrapper>
        <LibraryBrowserPane>
          <LibraryBrowserListHeader
            title="Albums"
            orderBy={orderBy}
            orderByOptions={orderByOptions}
            onChange={this.onSortChangeHandler}
          />
          <LibraryBrowserList
            ref={forwardedRef}
            items={albums}
            itemDisplay={AlbumTeaser}
            currentPosition={currentPosition}
            onItemClick={onItemClick}
            onKeyDown={this.onKeyDown}
          />
          <AlbumContextMenu />
          <KeyboardNavPlayPopup
            id="albums-nav-modal"
            onClose={this.closeModal}
            isOpen={this.state.modalIsOpen}
            itemId={currentAlbum}
            handlePlayNow={handlePlayNow}
            handleAddToQueue={handleAddToQueue}
          />
        </LibraryBrowserPane>
      </AlbumsPaneWrapper>
    )
  }
}
AlbumsPaneContainer.propTypes = {
  albums: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      year: PropTypes.string,
      artistName: PropTypes.string,
    })
  ).isRequired,
  orderBy: PropTypes.string.isRequired,
  currentPosition: PropTypes.number.isRequired,
  currentAlbum: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
  switchPaneHandler: PropTypes.func.isRequired,
  forwardedRef: PropTypes.shape().isRequired,
  handlePlayNow: PropTypes.func.isRequired,
  handleAddToQueue: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  albums: selectors.getAlbumsList(state),
  orderBy: state.libraryBrowser.sortAlbums,
  currentPosition: state.libraryBrowser.currentPositionAlbums,
  currentAlbum: state.libraryBrowser.selectedAlbums,
})
const mapDispatchToProps = (dispatch) => ({
  onSortChange: (sortProperty) => {
    dispatch(actions.libraryBrowserSortAlbums(sortProperty))
  },
  onItemClick: (itemId, index) => {
    dispatch(actions.libraryBrowserSelectAlbum(itemId, index))
  },
  handlePlayNow: (albumId) => {
    dispatch(playerOperations.playAlbum(albumId))
  },
  handleAddToQueue: (albumId) => {
    dispatch(playerOperations.addAlbum(albumId))
  },
})

const ConnectedAlbumsPaneContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AlbumsPaneContainer)

export default React.forwardRef((props, ref) => (
  <ConnectedAlbumsPaneContainer {...props} forwardedRef={ref} />
))
