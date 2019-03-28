import React from 'react'
import styled, { withTheme } from 'styled-components'
import PropTypes from 'prop-types'
import Icon from './Icon'

const ActionButtonIcon = (props) => (
  <Wrapper
    className={props.className}
    disabled={props.disabled}
    onClick={props.onClick}
  >
    <Icon size={props.size ? props.size : props.theme.buttons.iconSize}>
      {props.icon}
    </Icon>
  </Wrapper>
)
ActionButtonIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  size: PropTypes.number,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  theme: PropTypes.objectOf(PropTypes.shape).isRequired,
}
ActionButtonIcon.defaultProps = {
  className: '',
  disabled: false,
  size: null,
}

export default withTheme(ActionButtonIcon)

const Wrapper = styled.button`
  padding: 10px;
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
