import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { MenuProvider as ContextMenuProvider } from 'react-contexify'
import Artist from '../../../types/Artist'

const ArtistTeaser: FunctionComponent<{
  item: Artist
}> = ({ item }) => (
  <ContextMenuProvider id="artist-context-menu" data={item}>
    <ArtistTeaserWrapper>
      <ArtistTeaserName>{item.name}</ArtistTeaserName>
    </ArtistTeaserWrapper>
  </ContextMenuProvider>
)

export default ArtistTeaser

const ArtistTeaserName = styled.h2`
  display: table-cell;
  vertical-align: middle;
  font-size: 1em;
  font-weight: normal;
`
const ArtistTeaserWrapper = styled.div`
  display: table;
  width: 100%;
  height: ${(props) => props.theme.itemHeight};
  padding: 0 15px;
  cursor: pointer;
`
