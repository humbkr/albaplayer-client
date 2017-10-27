import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import {IconButton, Icon} from "./common";

const DrawerMenuWrapper = styled.div`
  display: table;
  width: 100%;
  height: ${props => props.theme.itemHeight};
`;

const DrawerMenuDecorated = styled.div`
  display: table-cell;
  overflow: hidden;
`;

const DrawerMenu = styled.div`
  display: table-cell;
  vertical-align: top;
  right: 0;
  width: ${props => props.theme.itemHeight};
  
  ${props => props.open && css`
    position: absolute;
    display: flex;
    justify-content: flex-end;
    width: ${props => props.maxWidth ? props.maxWidth : '100%'};
    background-color: ${props => props.theme.highlight};
  `}
`;

const DrawerMenuContent = styled.div`
  display: none;
  width: 0;
  height: ${props => props.theme.itemHeight};
  
  ${props => props.open && css`
    display: block;
    flex: 1;
  `}
`;

class DrawerMenuDecorator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick(event) {
    if (this.state.open && this.props.onClose) {
      // We are closing the menu.
      this.props.onClose(event);
    } else if (!this.state.open && this.props.onOpen) {
      this.props.onOpen(event);
    }

    this.setState({
      open: !this.state.open,
    });
  }

  render() {
    const isOpen = this.state.open;

    return (
      <DrawerMenuWrapper>
        <DrawerMenuDecorated>
          {this.props.children}
        </DrawerMenuDecorated>
        <DrawerMenu
          open={isOpen}
          maxWidth={this.props.widthOpen}
        >
          <DrawerMenuContent open={isOpen}>
            {this.props.content}
          </DrawerMenuContent>
          <IconButton onClick={this.handleButtonClick}>
            {(isOpen) ? <Icon>close</Icon> : <Icon>{this.props.icon}</Icon>}
          </IconButton>
        </DrawerMenu>
      </DrawerMenuWrapper>
    );
  }
}
DrawerMenuDecorator.propTypes = {
  icon: PropTypes.string.isRequired,
  content: PropTypes.element.isRequired,
  widthOpen: PropTypes.string,
  persistant: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
};

export default DrawerMenuDecorator;
