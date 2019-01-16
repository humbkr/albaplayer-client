import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import LibraryBrowserList from './LibraryBrowserList'
import ArtistTeaser from './ArtistTeaser'
import LibraryBrowserPane from './LibraryBrowserPane'
import LibraryBrowserListHeader from './LibraryBrowserListHeader'
import {
  libraryBrowserSelectArtist,
  libraryBrowserSortArtists,
} from '../actions'
import ArtistContextMenu from './ArtistContextMenu'
import { getArtistsList } from '../selectors'
import KeyboardNavPlayPopup from './KeyboardNavPlayPopup'
import { addArtist, playArtist } from '../../player/actions'

const ArtistsPaneWrapper = styled.div`
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
  width: 33%;
  height: 100%;
`

class ArtistsPaneContainer extends React.Component {
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
      artists,
      orderBy,
      currentPosition,
      currentArtist,
      onItemClick,
      forwardedRef,
      handlePlayNow,
      handleAddToQueue,
    } = this.props

    const orderByOptions = [{ value: 'name', label: 'name' }]

    return (
      <ArtistsPaneWrapper>
        <LibraryBrowserPane>
          <LibraryBrowserListHeader
            title="Artists"
            orderBy={orderBy}
            orderByOptions={orderByOptions}
            onChange={this.onSortChangeHandler}
          />
          <LibraryBrowserList
            ref={forwardedRef}
            items={artists}
            itemDisplay={ArtistTeaser}
            currentPosition={currentPosition}
            onItemClick={onItemClick}
            onKeyDown={this.onKeyDown}
          />
          <ArtistContextMenu />
          <KeyboardNavPlayPopup
            id="artists-nav-modal"
            onClose={this.closeModal}
            isOpen={this.state.modalIsOpen}
            itemId={currentArtist}
            handlePlayNow={handlePlayNow}
            handleAddToQueue={handleAddToQueue}
          />
        </LibraryBrowserPane>
      </ArtistsPaneWrapper>
    )
  }
}
ArtistsPaneContainer.propTypes = {
  artists: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  orderBy: PropTypes.string.isRequired,
  currentPosition: PropTypes.number.isRequired,
  currentArtist: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
  switchPaneHandler: PropTypes.func.isRequired,
  forwardedRef: PropTypes.shape().isRequired,
  handlePlayNow: PropTypes.func.isRequired,
  handleAddToQueue: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  artists: getArtistsList(state),
  orderBy: state.libraryBrowser.sortArtists,
  currentPosition: state.libraryBrowser.currentPositionArtists,
  currentArtist: state.libraryBrowser.selectedArtists,
})
const mapDispatchToProps = dispatch => ({
  onSortChange: (sortProperty) => {
    dispatch(libraryBrowserSortArtists(sortProperty))
  },
  onItemClick: (itemId, index) => {
    dispatch(libraryBrowserSelectArtist(itemId, index))
  },
  handlePlayNow: (artistId) => {
    dispatch(playArtist(artistId))
  },
  handleAddToQueue: (artistId) => {
    dispatch(addArtist(artistId))
  },
})

const ConnectedArtistsPaneContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtistsPaneContainer)

export default React.forwardRef((props, ref) => (
  <ConnectedArtistsPaneContainer {...props} forwardedRef={ref} />
))
