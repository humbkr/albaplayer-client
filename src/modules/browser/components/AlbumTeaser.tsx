import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { MenuProvider as ContextMenuProvider } from 'react-contexify'

const AlbumTeaser: FunctionComponent<{
  item: any
  selected?: boolean
}> = ({ item, selected = false }) => (
  <ContextMenuProvider id="album-context-menu" data={item}>
    <AlbumTeaserWrapper>
      <div>
        <AlbumTeaserTitle>{item.title}</AlbumTeaserTitle>
        <AlbumSubInfo className={selected ? 'selected' : ''}>
          {item.year && <span>{item.year}</span>}
          {item.year && ' - '}
          <AlbumTeaserArtist>{item.artist?.name}</AlbumTeaserArtist>
        </AlbumSubInfo>
      </div>
    </AlbumTeaserWrapper>
  </ContextMenuProvider>
)

export default AlbumTeaser

const AlbumTeaserTitle = styled.h2`
  font-size: 1em;
  font-weight: normal;
  max-height: 18px;
`
const AlbumSubInfo = styled.div`
  font-size: 0.8em;
  margin-top: 5px;
`
const AlbumTeaserArtist = styled.span`
  font-style: italic;
`
const AlbumTeaserWrapper = styled.div`
  display: table;
  width: 100%;
  height: ${(props) => props.theme.itemHeight};
  padding: 0 15px;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;

  > div {
    display: table-cell;
    vertical-align: middle;
  }
`
