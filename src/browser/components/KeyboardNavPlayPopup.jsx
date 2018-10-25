import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Modal from 'react-modal'

// http://reactcommunity.org/react-modal/accessibility/
Modal.setAppElement('#root')

const ModalContent = styled.div`
  > div:first-child {
    margin-bottom: 10px;
  }
`

const Action = styled.div`
  display: inline-block;
  border: 1px solid #000000;
  border-radius: 3px;
  padding: 5px;
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
  },
  overlay: {
    backgroundColor: '',
  },
}

class KeyboardNavPlayPopup extends React.Component {
  constructor(props) {
    super(props)

    this.modal = React.createRef()
  }

  afterOpenModal = () => {
    this.modal.current.focus()
  }

  handlePlayNow = (id) => {
    this.props.handlePlayNow(id)
  }

  handleAddToQueue = (id) => {
    this.props.handleAddToQueue(id)
  }

  handleKeyDown = (e) => {
    const { itemId, onClose } = this.props

    e.preventDefault()
    if (e.keyCode === 13) {
      // If Enter plays the element directly.
      this.handlePlayNow(itemId)
    } else if (e.keyCode === 32) {
      // If Space adds element to the end of the playlist.
      this.handleAddToQueue(itemId)
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
          <div>
            Press <Action>Enter</Action> again to replace playlist with current
            selection
          </div>
          <div>
            Press <Action>Space</Action> to add to the current playlist
          </div>
        </ModalContent>
      </Modal>
    )
  }
}
KeyboardNavPlayPopup.propTypes = {
  id: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  itemId: PropTypes.string.isRequired,
  handlePlayNow: PropTypes.func.isRequired,
  handleAddToQueue: PropTypes.func.isRequired,
}

export default KeyboardNavPlayPopup
