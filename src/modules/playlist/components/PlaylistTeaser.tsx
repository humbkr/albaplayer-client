import React from 'react'
import styled from 'styled-components'
import { MenuProvider as ContextMenuProvider } from 'react-contexify'
import Playlist from '../types/Playlist'

const PlaylistTeaser = ({ playlist }: { playlist: Playlist }) => (
  <ContextMenuProvider id="playlist-context-menu" data={playlist}>
    <Wrapper>
      <div>{playlist.title}</div>
    </Wrapper>
  </ContextMenuProvider>
)

export default PlaylistTeaser

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: ${(props) => props.theme.itemHeight};
  padding-left: 15px;
  cursor: pointer;
  border-bottom: 1px solid ${(props) => props.theme.separatorColor};
`
