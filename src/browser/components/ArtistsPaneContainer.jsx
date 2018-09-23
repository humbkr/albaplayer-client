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

const ArtistsPaneWrapper = styled.div`
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
  width: 33%;
  height: 100%;
`

class ArtistsPaneContainer extends React.Component {
  // Change event handler for LibraryBrowserListHeader.
  onSortChangeHandler = (event) => {
    // Pass the new selected sort option to the dispatcher.
    this.props.onSortChange(event.target.value)
  }

  render() {
    const {
      artists,
      orderBy,
      currentPosition,
      onItemClick,
      switchPaneHandler,
      forwardedRef,
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
          <ArtistContextMenu />
          <LibraryBrowserList
            ref={forwardedRef}
            items={artists}
            itemDisplay={ArtistTeaser}
            currentPosition={currentPosition}
            onItemClick={onItemClick}
            switchPaneHandler={switchPaneHandler}
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
  onSortChange: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
  switchPaneHandler: PropTypes.func.isRequired,
  forwardedRef: PropTypes.shape().isRequired,
}

const mapStateToProps = state => ({
  artists: getArtistsList(state),
  orderBy: state.libraryBrowser.sortArtists,
  currentPosition: state.libraryBrowser.currentPositionArtists,
})
const mapDispatchToProps = dispatch => ({
  onSortChange: (sortProperty) => {
    dispatch(libraryBrowserSortArtists(sortProperty))
  },
  onItemClick: (itemId, index) => {
    dispatch(libraryBrowserSelectArtist(itemId, index))
  },
})

const ConnectedArtistsPaneContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtistsPaneContainer)

export default React.forwardRef((props, ref) => (
  <ConnectedArtistsPaneContainer {...props} forwardedRef={ref} />
))
