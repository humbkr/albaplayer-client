import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import LibraryBrowserList from './LibraryBrowserList'
import AlbumTeaser from './AlbumTeaser'
import LibraryBrowserListHeader from './LibraryBrowserListHeader'
import LibraryBrowserPane from './LibraryBrowserPane'
import { libraryBrowserSelectAlbum, libraryBrowserSortAlbums } from '../actions'
import AlbumContextMenu from './AlbumContextMenu'
import { getAlbumsList } from '../selectors'

const AlbumsPaneWrapper = styled.div`
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
  width: 33%;
  height: 100%;
  border-left: 1px solid ${props => props.theme.separatorColor};
  border-right: 1px solid ${props => props.theme.separatorColor};
`

class AlbumsPaneContainer extends Component {
  // Change event handler for LibraryBrowserListHeader.
  onSortChangeHandler = (event) => {
    // Pass the new selected sort option to the dispatcher.
    this.props.onSortChange(event.target.value)
  }

  render() {
    const {
      albums,
      orderBy,
      currentPosition,
      onItemClick,
      switchPaneHandler,
      forwardedRef,
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
            switchPaneHandler={switchPaneHandler}
          />
          <AlbumContextMenu />
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
  onSortChange: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
  switchPaneHandler: PropTypes.func.isRequired,
  forwardedRef: PropTypes.shape().isRequired,
}

const mapStateToProps = state => ({
  albums: getAlbumsList(state),
  orderBy: state.libraryBrowser.sortAlbums,
  currentPosition: state.libraryBrowser.currentPositionAlbums,
})
const mapDispatchToProps = dispatch => ({
  onSortChange: (sortProperty) => {
    dispatch(libraryBrowserSortAlbums(sortProperty))
  },
  onItemClick: (itemId, index) => {
    dispatch(libraryBrowserSelectAlbum(itemId, index))
  },
})

const ConnectedAlbumsPaneContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AlbumsPaneContainer)

export default React.forwardRef((props, ref) => (
  <ConnectedAlbumsPaneContainer {...props} forwardedRef={ref} />
))
