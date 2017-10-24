import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { ListItem, List } from './commons/list';
import {IconButton, Icon, Header, Title } from "./commons/common";

const MainMenuLink = styled(Link)`
  width: 100%;
  height: ${props => props.theme.itemHeight};
  display: inline-block;
  color: ${props => (props.secondary) ? props.theme.sidebar.textSecondaryColor : props.theme.sidebar.textPrimaryColor};
  
  :hover {
    color: ${props => props.theme.sidebar.textPrimaryColorHover};
  }
  
  > span {
    padding-left: 10px;
  }

  > * {
    display: inline-block;
    vertical-align: top;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const MainMenuFooter = styled.footer`
  position: absolute;
  bottom: 0;
  padding-left: 10px;
  width: 100%;

  :hover {
    background-color: ${props => props.theme.highlight};
  }

  > MainMenuLink {
    color: ${props => props.theme.sidebar.textSecondaryColor};
  }
`;

const SidebarWrapper = styled.div`
  width: ${props => props.theme.itemHeight};
  
  > Button {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: ${props => props.isOpen ? '250px' : '0'};
  z-index: 1;
  overflow: hidden;
  transition: 0.2s;
  box-shadow: 5px 0 5px -2px rgba(0,0,0,.5);
  background-color: ${props => props.theme.sidebar.background};
  color: ${props => props.theme.sidebar.textPrimaryColor};
  
  button {
    color: ${props => props.theme.sidebar.textPrimaryColor};
  }
`;

class SidebarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.closeButtonHandler = this.closeButtonHandler.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  toggleSidebar() {
    if (!this.state.isOpen) {
      document.addEventListener('click', this.handleClickOutside, true);
    } else {
      document.removeEventListener('click', this.handleClickOutside, true);
    }

    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  closeButtonHandler() {
    this.toggleSidebar();
  }

  handleClickOutside(event) {
    const domNode = ReactDOM.findDOMNode(this);
    if (!domNode || !domNode.contains(event.target)) {
      this.toggleSidebar();
    }
  }

  render() {
    return (
      <SidebarWrapper>
        <IconButton onClick={this.toggleSidebar}><Icon>menu</Icon></IconButton>
        <Sidebar isOpen={this.state.isOpen}>
          <Header>
            <IconButton onClick={this.closeButtonHandler}><Icon>close</Icon></IconButton>
            <Title>Menu</Title>
          </Header>
          <List>
            <ListItem>
              <MainMenuLink to="/">
                <Icon>home</Icon>
                <span>Home</span>
              </MainMenuLink>
            </ListItem>
            <ListItem>
              <MainMenuLink to="/artists">
                <Icon>person</Icon>
                <span>Artists</span>
              </MainMenuLink>
            </ListItem>
            <ListItem>
              <MainMenuLink to="/albums">
                <Icon>album</Icon>
                <span>Albums</span>
              </MainMenuLink>
            </ListItem>
            <ListItem>
              <MainMenuLink to="/genres">
                <Icon>fingerprint</Icon>
                <span>Genres</span>
              </MainMenuLink>
            </ListItem>
            <ListItem>
              <MainMenuLink to="/playlists">
                <Icon>playlist_play</Icon>
                <span>Playlists</span>
              </MainMenuLink>
            </ListItem>
          </List>
          <MainMenuFooter>
            <MainMenuLink secondary to="/settings">
              <Icon>settings</Icon>
              <span>Settings</span>
            </MainMenuLink>
          </MainMenuFooter>
        </Sidebar>
      </SidebarWrapper>
    );
  }
}

export default SidebarContainer;
