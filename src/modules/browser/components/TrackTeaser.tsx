import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { MenuProvider as ContextMenuProvider } from 'react-contexify'
import Track from 'types/Track'

const TrackTeaser: FunctionComponent<{
  item: Track
}> = ({ item }) => (
  <ContextMenuProvider id="track-context-menu" data={item}>
    <TrackWrapper>
      <TrackTeaserNumber>{item.number}</TrackTeaserNumber>
      <TrackTeaserName>{item.title}</TrackTeaserName>
    </TrackWrapper>
  </ContextMenuProvider>
)

export default TrackTeaser

const TrackTeaserNumber = styled.div`
  display: table-cell;
  width: 40px;
  text-align: center;
  vertical-align: middle;
  font-size: 0.8em;
`
const TrackTeaserName = styled.h2`
  display: table-cell;
  font-size: 1em;
  font-weight: normal;
  vertical-align: middle;
`
const TrackWrapper = styled.div`
  display: table;
  width: 100%;
  height: ${(props) => props.theme.itemHeight};
  padding: 0 15px 0 0;
  cursor: pointer;
`
