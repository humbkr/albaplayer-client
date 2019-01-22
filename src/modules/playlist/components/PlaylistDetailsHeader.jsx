import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 60px 40% auto;
  width: 100%;
  height: ${(props) => props.theme.itemHeight};
  border-top: 1px solid ${(props) => props.theme.separatorColor};
  border-bottom: 1px solid ${(props) => props.theme.separatorColor};
  color: ${(props) => props.theme.textSecondaryColor};
  text-transform: uppercase;

  > div {
    align-self: center;
  }
`
const TrackPosition = styled.div`
  text-align: center;
`

const PlaylistDetailsHeader = () => (
  <Wrapper>
    <TrackPosition>#</TrackPosition>
    <div>track</div>
  </Wrapper>
)

export default PlaylistDetailsHeader
