import styled from "styled-components"
import { NavLink } from "react-router-dom"

const MainMenuLink = styled(NavLink)`
  text-align: left;
  padding-left: 15px;
  text-decoration: none;
  cursor: pointer;
  
  display: block;
  width: 100%;
  height: ${props => props.theme.itemHeight};
  color: ${props => (props.secondary) ? props.theme.sidebar.textSecondaryColor : props.theme.sidebar.textPrimaryColor};
  
  :hover,
   &.active {
    color: ${props => props.theme.sidebar.textPrimaryColorHover};
    background-color: ${props => (props.secondary) ? props.theme.sidebar.textSecondaryColor : props.theme.sidebar.textPrimaryColor};
  }
  
  > * {
    display: block;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export default MainMenuLink
