import React from 'react'
import styled from "styled-components";
import MainMenuLink from "./SidebarNavLink";
import Player from "../../customaudio/components/Player";

const SidebarWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: ${props => props.theme.sidebar.width};
  height: 100%;
  background-color: #2a2a2a;
`;

const MainMenu = styled.div`
  padding-top: 100px;
`;

const Sidebar = () => (
  <SidebarWrapper>
    <Player />
    <MainMenu>
      <MainMenuLink to="/queue">
        <span>Now playing</span>
      </MainMenuLink>
      <MainMenuLink to="/library">
        <span>Library</span>
      </MainMenuLink>
    </MainMenu>
  </SidebarWrapper>
);

export default Sidebar;
