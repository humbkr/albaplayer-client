import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { MenuProvider as ContextMenuProvider } from 'react-contexify'
import ActionButtonIcon from 'common/components/ActionButtonIcon'

const PlaylistTrack = (props) => {
  const { item, selected, handleRemoveTrack } = props

  return (
    <ContextMenuProvider id="playlist-track-context-menu" data={item}>
      <TrackWrapper>
        <TrackFirstColumn className={selected ? 'selected' : ''}>
          <TrackPosition>{item.position}</TrackPosition>
        </TrackFirstColumn>
        <TrackSecondColumn>
          <div>{item.title}</div>
          <TrackInfo className={selected ? 'selected' : ''}>
            {item.artist.name} -
            <AlbumInfo>
              {` ${item.album.title}`}
              {item.album.year && ` (${item.album.year})`}
            </AlbumInfo>
          </TrackInfo>
        </TrackSecondColumn>
        <TrackActions>
          <ActionButtonIcon
            icon="delete"
            onClick={() => handleRemoveTrack(item.position)}
          />
        </TrackActions>
      </TrackWrapper>
    </ContextMenuProvider>
  )
}
PlaylistTrack.propTypes = {
  item: PropTypes.shape({
    position: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    duration: PropTypes.number,
  }).isRequired,
  selected: PropTypes.bool,
  handleRemoveTrack: PropTypes.func.isRequired,
}
PlaylistTrack.defaultProps = {
  selected: false,
}

export default PlaylistTrack

// Required to control the div independently.
const TrackPosition = styled.div``

const TrackActions = styled.div`
  display: none;
  vertical-align: middle;
  text-align: right;
  color: ${(props) => props.theme.textSecondaryColor};
`
const TrackWrapper = styled.div`
  display: grid;
  grid-template-columns: 60px auto 44px;
  height: ${(props) => props.theme.itemHeight};
  border-bottom: 1px solid ${(props) => props.theme.separatorColor};
  ${(props) => (props.isCurrent ? 'font-weight: bold' : '')};

  > * {
    align-self: center;
  }

  :hover {
    ${TrackActions} {
      display: block;
    }
  }
`
const TrackFirstColumn = styled.div`
  justify-self: center;
  color: ${(props) => props.theme.textSecondaryColor};
`
const TrackSecondColumn = styled.div``
const TrackInfo = styled.div`
  font-size: 0.8em;
  color: ${(props) => (props.selected
    ? props.theme.textHighlightColor
    : props.theme.textSecondaryColor)};
`
const AlbumInfo = styled.span`
  font-style: italic;
`
