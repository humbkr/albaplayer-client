import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Modal from 'react-modal'
import ActionButton from '../../../common/components/ActionButton'

// http://reactcommunity.org/react-modal/accessibility/
Modal.setAppElement('#root')

const ModalContent = styled.div`
  > div:first-child {
    margin-bottom: 10px;
  }
`

const Title = styled.h3``

const Input = styled.input`
  font-size: 1em;
  padding: 5px 10px;
`

const Actions = styled.div`
  margin-top: 30px;
  text-align: right;
`

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
    padding: '20px 10px 20px 20px',
    width: '300px',
  },
  overlay: {
    backgroundColor: '',
  },
}

class PlaylistAddPopup extends React.Component {
  constructor(props) {
    super(props)

    this.modal = React.createRef()
  }

  afterOpenModal = () => {
    this.modal.current.focus()
  }

  handleAddPlaylist = (title) => {
    this.props.handleAddPlaylist(title)
  }

  handleKeyDown = (e) => {
    const { itemId, onClose } = this.props

    e.preventDefault()
    if (e.keyCode === 13) {
      // If Enter adds element to the end of the playlist.
      this.handleAddPlaylist(itemId)
    } else if (e.keyCode === 32) {
      // If Space plays the element directly.
      this.handlePlayNow(itemId)
    }
    // Else just close the popup and do nothing else.
    onClose()
  }

  render() {
    const { id, isOpen, onClose } = this.props

    return (
      <Modal
        id={id}
        style={modalStyles}
        isOpen={isOpen}
        onRequestClose={onClose}
        onAfterOpen={this.afterOpenModal}
      >
        <ModalContent
          role="button"
          ref={this.modal}
          tabIndex="0"
          onKeyDown={this.handleKeyDown}
        >
          <Title>Create a new playlist</Title>
          <form>
            <label htmlFor="add-playlist-title">Title: </label>
            <Input id="add-playlist-title" type="text" />
            <Actions>
              <ActionButton raised onClick={() => console.log('TODO')}>
                Create
              </ActionButton>
              <ActionButton onClick={onClose}>Cancel</ActionButton>
            </Actions>
          </form>
        </ModalContent>
      </Modal>
    )
  }
}
PlaylistAddPopup.propTypes = {
  id: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleAddPlaylist: PropTypes.func.isRequired,
}

export default PlaylistAddPopup
