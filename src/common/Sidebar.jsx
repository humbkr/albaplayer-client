import React from 'react';
import styled from 'styled-components';
import SidebarNavLink from './SidebarNavLink';
import Player from '../player/components/Player';


const SidebarWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: ${props => props.theme.sidebar.width};
  height: 100%;
  background-color: ${props => props.theme.sidebar.background};
`;

const MainMenu = styled.div`
  padding-top: 100px;
`;

const SettingsMenu = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
`;

const Sidebar = () => (
  <SidebarWrapper>
    <Player />
    <MainMenu>
      <SidebarNavLink to="/queue">Now playing</SidebarNavLink>
      <SidebarNavLink to="/library">Library browser</SidebarNavLink>
    </MainMenu>
    <SettingsMenu>
      <SidebarNavLink to="/settings" icon="settings">Settings</SidebarNavLink>
    </SettingsMenu>
  </SidebarWrapper>
);

export default Sidebar;
