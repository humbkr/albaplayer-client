import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { menuProvider } from 'react-contexify'
import { libraryBrowserSelectAlbum } from '../actions'

const AlbumTeaserTitle = styled.h2`
  font-size: 1em;
  font-weight: normal;
  max-height: 18px;
`

const AlbumSubInfo = styled.div`
  color: ${props => props.theme.textSecondaryColor};
  font-size: 0.8em;
  margin-top: 5px;
`

const AlbumTeaserArtist = styled.span`
  font-style: italic;
`

const AlbumTeaserWrapper = styled.div`
  display: table;
  width: 100%;
  height: ${props => props.theme.itemHeight};
  ${props => props.selected ? `background-color: ${props.theme.highlight}` : ''};
  padding: 0 15px;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;

  > div {
    display: table-cell;
    vertical-align: middle;
  }
`

// Needs to be declared as a stateful component so menuProvider can work.
// eslint-disable-next-line react/prefer-stateless-function
class AlbumTeaser extends Component {
  render() {
    const {
      item, index, onClick, selectedAlbums,
    } = this.props
    const selected = selectedAlbums === item.id ? { selected: true } : {}

    let artistName = ''
    if (item.artistName) {
      artistName = item.artistName
    } else if (item.id !== '0') {
      artistName = 'Unknown artist'
    }

    return (
      <AlbumTeaserWrapper onClick={() => onClick(item.id, index)} {...selected}>
        <div>
          <AlbumTeaserTitle>{item.title}</AlbumTeaserTitle>
          <AlbumSubInfo>
            {item.year && <span>{item.year}</span>}
            {item.year && ' - '}
            <AlbumTeaserArtist>{artistName}</AlbumTeaserArtist>
          </AlbumSubInfo>
        </div>
      </AlbumTeaserWrapper>
    )
  }
}
AlbumTeaser.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    artistName: PropTypes.string,
    year: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  selectedAlbums: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  selectedAlbums: state.libraryBrowser.selectedAlbums,
})
const mapDispatchToProps = dispatch => ({
  onClick: (albumId, index) => {
    dispatch(libraryBrowserSelectAlbum(albumId, index))
  },
})

// Bind the context menu event.
const addContextMenu = menuProvider('album-context-menu')

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(addContextMenu(AlbumTeaser))
