import React from 'react'
import styled from "styled-components";
import MainMenuLink from "./SidebarNavLink";

const SidebarWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: ${props => props.theme.sidebar.width};
  height: 100%;
  background-color: #2a2a2a;
  padding-top: 100px;
`;

const Sidebar = () => (
  <SidebarWrapper>
    <MainMenuLink to="/queue">
      <span>Now playing</span>
    </MainMenuLink>
    <MainMenuLink to="/library">
      <span>Library</span>
    </MainMenuLink>
  </SidebarWrapper>
);

export default Sidebar;
