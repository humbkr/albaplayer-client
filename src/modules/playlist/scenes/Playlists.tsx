import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import PlaylistDetailPane from 'modules/playlist/components/PlaylistDetailsPane'
import PlaylistListPane from '../components/PlaylistListPane'

const Playlists = () => {
  const playlistListPane = useRef<HTMLElement>(null)
  const playlistDetailPane = useRef<HTMLElement>(null)

  useEffect(() => {
    // Give focus to the search bar.
    // @ts-ignore
    // eslint-disable-next-line react/no-find-dom-node
    ReactDOM.findDOMNode(playlistListPane.current).focus()
  }, [])

  const handleSwitchPaneList = (e: React.KeyboardEvent) => {
    if (e.keyCode === 39) {
      // @ts-ignore
      // eslint-disable-next-line react/no-find-dom-node
      ReactDOM.findDOMNode(playlistDetailPane.current).focus()
    }
  }

  const handleSwitchPaneDetails = (e: React.KeyboardEvent) => {
    if (e.keyCode === 37) {
      // @ts-ignore
      // eslint-disable-next-line react/no-find-dom-node
      ReactDOM.findDOMNode(playlistListPane.current).focus()
    }
  }

  return (
    <Wrapper>
      <PlaylistListPane
        ref={playlistListPane}
        switchPaneHandler={handleSwitchPaneList}
      />
      <PlaylistDetailPane
        ref={playlistDetailPane}
        switchPaneHandler={handleSwitchPaneDetails}
      />
    </Wrapper>
  )
}

export default Playlists

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
`
