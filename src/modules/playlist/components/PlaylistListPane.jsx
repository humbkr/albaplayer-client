import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import PlaylistsListHeader from './PlaylistListHeader'
import PlaylistTeaser from './PlaylistTeaser'
import PlaylistAddPopup from './PlaylistAddPopup'

const Wrapper = styled.div`
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
  width: 34%;
  height: 100%;
  border-right: 1px solid ${(props) => props.theme.separatorColor};
`

class PlaylistListPane extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      modalIsOpen: true,
    }
  }

  openModal = () => {
    this.setState({ modalIsOpen: true })
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false })
  }

  render() {
    const {
      items, onClick, selected, onAddPlaylist,
    } = this.props

    const playlists = items.map((item) => {
      const isSelected = !!(selected && item.id === selected.id)

      return (
        <PlaylistTeaser
          key={item.id}
          item={item}
          selected={isSelected}
          onClick={onClick}
        />
      )
    })

    return (
      <Wrapper>
        <PlaylistsListHeader onAddClick={this.openModal} />
        <div>{playlists}</div>
        <PlaylistAddPopup
          id="playlist-add-modal"
          onClose={this.closeModal}
          isOpen={this.state.modalIsOpen}
          handleAddPlaylist={onAddPlaylist}
        />
      </Wrapper>
    )
  }
}
PlaylistListPane.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape).isRequired,
  onClick: PropTypes.func.isRequired,
  onAddPlaylist: PropTypes.func.isRequired,
  selected: PropTypes.objectOf(PropTypes.shape),
}
PlaylistListPane.defaultProps = {
  selected: null,
}

export default PlaylistListPane
