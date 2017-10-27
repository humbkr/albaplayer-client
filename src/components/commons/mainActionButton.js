import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

import {IconButton, Icon} from "./common";

const MainActionButtonWrapper = styled.div`
  width: 50px;
  height: 50px;
  background-color: #da2525;
  border-radius: 50%;
  
  > button i {
    font-size: 2.2em;
    font-weight: bold;
  }
`;

class MainActionButton extends Component {
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
      <MainActionButtonWrapper>
        <IconButton onClick={this.handleButtonClick}>
          {(isOpen) ? <Icon>close</Icon> : <Icon>{this.props.icon}</Icon>}
        </IconButton>
      </MainActionButtonWrapper>
    );
  }
}
MainActionButton.propTypes = {
  icon: PropTypes.string.isRequired,
  content: PropTypes.element,
  widthOpen: PropTypes.string,
  persistant: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
};

export default MainActionButton;
