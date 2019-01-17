import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Icon from './Icon'

const ActionButtonWrapper = styled.button`
  padding: 10px;
  font-size: ${(props) => props.theme.buttons.fontSize};
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  text-align: center;
  vertical-align: middle;
  transition: 0.2s ease-out;
  background-color: transparent;
  color: inherit;

  :disabled {
    cursor: default;
    color: ${(props) => props.theme.buttons.colorDisabled};
  }

  > * {
    display: inline-block;
    vertical-align: middle;
    color: inherit;
  }
`

const ActionButtonIcon = (props) => (
  <ActionButtonWrapper
    className={props.className}
    disabled={props.disabled}
    onClick={props.onClick}
  >
    <Icon>{props.icon}</Icon>
  </ActionButtonWrapper>
)
ActionButtonIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
}
ActionButtonIcon.defaultProps = {
  className: '',
  disabled: false,
}

export default ActionButtonIcon
