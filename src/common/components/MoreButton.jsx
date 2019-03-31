import React from 'react'
import PropTypes from 'prop-types'
import ActionButtonIcon from './ActionButtonIcon'

class MoreButton extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      menuIsOpen: false,
    }
  }

  toggleMenu = () => {
    this.setState((prevState) => ({ menuIsOpen: !prevState.menuIsOpen }))
  }

  render() {
    const { size } = this.props

    return (
      <ActionButtonIcon icon="more_vert" size={size} onClick={this.toggleMenu}>
        <div>TEST</div>
      </ActionButtonIcon>
    )
  }
}
MoreButton.propTypes = {
  size: PropTypes.number,
}
MoreButton.defaultProps = {
  size: null,
}

export default MoreButton
