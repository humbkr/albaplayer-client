import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import Icon from './Icon'

const SidebarNavLinkWrapper = styled(NavLink)`
  text-align: left;
  padding-left: 15px;
  text-decoration: none;
  cursor: pointer;

  display: block;
  width: 100%;
  height: ${props => props.theme.itemHeight};
  color: ${props => props.secondary
    ? props.theme.sidebar.textSecondaryColor
    : props.theme.sidebar.textPrimaryColor};

  :hover,
  &.active {
    color: ${props => props.theme.sidebar.textPrimaryColorHover};
    background-color: ${props => props.secondary
    ? props.theme.sidebar.textSecondaryColor
    : props.theme.sidebar.textPrimaryColor};
  }

  > * {
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
  }

  > span {
    height: ${props => props.theme.itemHeight};
    line-height: ${props => props.theme.itemHeight};
  }
`

const SidebarNavLink = props => (
  <SidebarNavLinkWrapper to={props.to}>
    {props.icon && <Icon>{props.icon}</Icon>}
    <span>{props.children}</span>
  </SidebarNavLinkWrapper>
)
SidebarNavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  icon: PropTypes.string,
}
SidebarNavLink.defaultProps = {
  icon: null,
}

export default SidebarNavLink
