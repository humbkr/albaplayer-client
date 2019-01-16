import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { MenuProvider as ContextMenuProvider } from 'react-contexify'

const AlbumTeaserTitle = styled.h2`
  font-size: 1em;
  font-weight: normal;
  max-height: 18px;
`

const AlbumSubInfo = styled.div`
  color: ${props => props.selected
    ? props.theme.textHighlightColor
    : props.theme.textSecondaryColor};
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
  padding: 0 15px;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;

  > div {
    display: table-cell;
    vertical-align: middle;
  }
`

const AlbumTeaser = (props) => {
  const { item, selected } = props

  let artistName = ''
  if (item.artistName) {
    artistName = item.artistName
  } else if (item.id !== '0') {
    artistName = 'Unknown artist'
  }

  return (
    <ContextMenuProvider id="album-context-menu" data={item}>
      <AlbumTeaserWrapper>
        <div>
          <AlbumTeaserTitle>{item.title}</AlbumTeaserTitle>
          <AlbumSubInfo className={selected ? 'selected' : ''}>
            {item.year && <span>{item.year}</span>}
            {item.year && ' - '}
            <AlbumTeaserArtist>{artistName}</AlbumTeaserArtist>
          </AlbumSubInfo>
        </div>
      </AlbumTeaserWrapper>
    </ContextMenuProvider>
  )
}
AlbumTeaser.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    artistName: PropTypes.string,
    year: PropTypes.string,
  }).isRequired,
  selected: PropTypes.bool,
}
AlbumTeaser.defaultProps = {
  selected: false,
}

export default AlbumTeaser
