import React from 'react'
import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'
import Modal from 'react-modal'
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import moment from 'moment'
import { getRandomInt } from 'common/utils/utils'
import ActionButton from 'common/components/ActionButton'

// http://reactcommunity.org/react-modal/accessibility/
Modal.setAppElement('#root')

class PlaylistAddPopup extends React.Component {
  constructor(props) {
    super(props)

    this.titleField = React.createRef()
  }

  afterOpenModal = () => {
    this.titleField.current.focus()
  }

  handleCreatePlaylist = (title) => {
    // Create a playlist object.
    const playlist = {
      id: `temp_${getRandomInt(1, 100000)}`,
      title,
      date: moment().format('YYYY-MM-DD'),
      tracks: [],
    }

    this.props.handleCreatePlaylist(playlist)
  }

  handleEditPlaylist = (title) => {
    const playlist = {
      ...this.props.playlist,
      title,
    }

    this.props.handleEditPlaylist(playlist)
  }

  // Prevent weird bug when user is pressing enter to validate the form:
  // without this the modal doesn't close even if state is correct.
  handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault()
    }
  }

  render() {
    const {
      id, isOpen, onClose, mode, playlist, theme,
    } = this.props

    const modalStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
        padding: '20px',
        width: '350px',
        backgroundColor: theme.backgroundColor,
      },
      overlay: {
        backgroundColor: '',
      },
    }

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
          onKeyDown={(e) => this.handleKeyDown(e)}
          tabIndex="0"
        >
          <Title>
            {mode === 'edit' && 'Edit playlist'}
            {mode !== 'edit' && 'Create a new playlist'}
          </Title>
          <Formik
            initialValues={{
              title: mode === 'edit' && playlist ? playlist.title : '',
            }}
            validate={(values) => {
              const errors = {}
              if (!values.title) {
                errors.title = 'This field is required.'
              }
              return errors
            }}
            onSubmit={(values, { setSubmitting }) => {
              if (mode === 'edit') {
                this.handleEditPlaylist(values.title)
              } else {
                this.handleCreatePlaylist(values.title)
              }
              setSubmitting(false)
              onClose()
            }}
          >
            {({ isSubmitting, handleSubmit }) => (
              <Form>
                <Label htmlFor="title">Title: </Label>
                <FormField
                  autoComplete="off"
                  type="text"
                  name="title"
                  innerRef={this.titleField}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      handleSubmit()
                    }
                  }}
                />
                <FormError name="title" component="span" />

                <Actions>
                  <ActionButton
                    raised
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    type="submit"
                  >
                    {mode === 'edit' && 'Edit'}
                    {mode !== 'edit' && 'Create'}
                  </ActionButton>
                  <ActionButton onClick={onClose}>Cancel</ActionButton>
                </Actions>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    )
  }
}
PlaylistAddPopup.propTypes = {
  id: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleCreatePlaylist: PropTypes.func.isRequired,
  handleEditPlaylist: PropTypes.func.isRequired,
  theme: PropTypes.objectOf(PropTypes.shape).isRequired,
  mode: PropTypes.string,
  playlist: PropTypes.objectOf(PropTypes.shape),
}
PlaylistAddPopup.defaultProps = {
  playlist: null,
  mode: 'add',
}

export default withTheme(PlaylistAddPopup)

const ModalContent = styled.div`
  > div:first-child {
    margin-bottom: 10px;
  }
  color: ${(props) => props.theme.textPrimaryColor};
`
const Title = styled.h3`
  margin-bottom: 20px;
`
const Label = styled.label`
  display: block;
  color: ${(props) => props.theme.textSecondaryColor};
`
const FormField = styled(Field)`
  font-size: 1em;
  padding: 5px 10px;
  width: 100%;
  background-color: ${(props) => props.theme.inputs.backgroundColor};
`
const FormError = styled(ErrorMessage)`
  color: ${(props) => props.theme.messages.error.color};
  font-size: 0.9em;
`
const Actions = styled.div`
  margin-top: 30px;
  text-align: right;
`
