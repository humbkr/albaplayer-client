import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Icon from './Icon'

const ActionButtonWrapper = styled.button`
  padding: 0 ${props => props.theme.buttons.sidePadding};
  font-size: ${props => props.theme.buttons.fontSize};
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  text-align: center;
  vertical-align: middle;
  transition: 0.2s ease-out;
  color: ${props => props.theme.buttons.color};

  ${props => props.raised
    ? `
    border-radius: 2px;
    background-color: ${props.theme.buttons.color};
    color: #fff;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14),0 1px 5px 0 rgba(0,0,0,0.12),0 3px 1px -2px rgba(0,0,0,0.2);
  `
    : ''} :hover {
    ${props => props.raised
    ? `
      background-color: ${props.theme.buttons.colorHover};
    `
    : `color: ${props.theme.buttons.colorHover}`};
  }

  :disabled {
    cursor: default;
    color: ${props => props.theme.buttons.colorDisabled};

    ${props => props.raised
    ? `
      background-color: ${props.theme.buttons.colorDisabled};
      color: #fff;
  `
    : ''};
  }

  > * {
    display: inline-block;
    vertical-align: middle;
  }

  > span {
    height: ${props => props.theme.buttons.height};
    line-height: ${props => props.theme.buttons.height};
  }
`

const ActionButton = props => (
  <ActionButtonWrapper
    raised={props.raised}
    disabled={props.disabled}
    onClick={props.onClick}
  >
    {props.icon && <Icon>{props.icon}</Icon>}
    <span>{props.children}</span>
  </ActionButtonWrapper>
)
ActionButton.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.string,
  raised: PropTypes.bool,
  disabled: PropTypes.bool,
}
ActionButton.defaultProps = {
  children: '',
  icon: null,
  raised: false,
  disabled: false,
}

export default ActionButton
