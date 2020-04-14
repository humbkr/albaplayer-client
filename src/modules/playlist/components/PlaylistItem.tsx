import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { MenuProvider as ContextMenuProvider } from 'react-contexify'
import ActionButtonIcon from 'common/components/ActionButtonIcon'
import PlaylistItemType from '../types/PlaylistItem'

const PlaylistItem: FunctionComponent<{
  item: PlaylistItemType
  selected: boolean
  handleRemoveTrack: (position: number) => void
}> = ({ item, handleRemoveTrack, selected = false }) => {
  const { track, position } = item

  return (
    <ContextMenuProvider id="playlist-track-context-menu" data={item}>
      <TrackWrapper>
        <TrackFirstColumn className={selected ? 'selected' : ''}>
          <div>{position}</div>
        </TrackFirstColumn>
        <TrackSecondColumn>
          <div>{track.title}</div>
          <TrackInfo className={selected ? 'selected' : ''}>
            {track.artist?.name} -
            <AlbumInfo>
              {` ${track.album?.title}`}
              {track.album?.year && ` (${track.album?.year})`}
            </AlbumInfo>
          </TrackInfo>
        </TrackSecondColumn>
        <TrackActions>
          <ActionButtonIcon
            icon="delete"
            onClick={() => handleRemoveTrack(position)}
          />
        </TrackActions>
      </TrackWrapper>
    </ContextMenuProvider>
  )
}

export default PlaylistItem

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
`
const AlbumInfo = styled.span`
  font-style: italic;
`
