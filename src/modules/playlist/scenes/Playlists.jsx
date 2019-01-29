import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import PlaylistDetailPane from '../components/PlaylistDetailsPane'
import PlaylistListPane from '../components/PlaylistListPane'

class Playlists extends React.Component {
  constructor(props) {
    super(props)

    this.playlistListPane = React.createRef()
    this.playlistDetailPane = React.createRef()
  }

  componentDidMount() {
    // Give focus to the search bar.
    // eslint-disable-next-line react/no-find-dom-node
    ReactDOM.findDOMNode(this.playlistListPane.current).focus()
  }

  handleSwitchPaneList = (e) => {
    if (e.keyCode === 39) {
      // eslint-disable-next-line react/no-find-dom-node
      ReactDOM.findDOMNode(this.playlistDetailPane.current).focus()
    }
  }

  handleSwitchPaneDetails = (e) => {
    if (e.keyCode === 37) {
      // eslint-disable-next-line react/no-find-dom-node
      ReactDOM.findDOMNode(this.playlistListPane.current).focus()
    }
  }

  render() {
    return (
      <Wrapper>
        <PlaylistListPane
          ref={this.playlistListPane}
          switchPaneHandler={this.handleSwitchPaneList}
        />
        <PlaylistDetailPane
          ref={this.playlistDetailPane}
          switchPaneHandler={this.handleSwitchPaneDetails}
        />
      </Wrapper>
    )
  }
}

export default Playlists

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
`
