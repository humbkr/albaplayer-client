import React, { FunctionComponent } from 'react'
import styled, { withTheme } from 'styled-components'
import Icon from 'common/components/Icon'
import { AppTheme } from 'themes/types'

const ActionButtonIcon: FunctionComponent<{
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  icon: string
  theme: AppTheme
  className?: string
  disabled?: boolean
  size?: number
}> = ({
  onClick,
  icon,
  theme,
  className = '',
  disabled = false,
  size = null,
}) => (
  <Wrapper className={className} disabled={disabled} onClick={onClick}>
    <Icon size={size || theme.buttons.iconSize}>{icon}</Icon>
  </Wrapper>
)

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
