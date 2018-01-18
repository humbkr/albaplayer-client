import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";

const ControlButton = styled.button`
  border: none;
  background-color: transparent;
  padding: 0 10px;
  
  :hover {
    cursor: pointer;
  }
`;

class Button extends React.PureComponent {
  static propTypes = {
    onClick: PropTypes.func
  };
  static defaultProps = {
    onClick: null
  };
  constructor(props) {
    super(props);
    this.state = { mouseOver: false };
  }
  render() {
    const newClassName = this.props.className;
    return (
      <ControlButton
        className={newClassName}
        onClick={this.props.onClick}
        onMouseOver={() => {
          this.setState({ mouseOver: true });
        }}
        onMouseOut={() => {
          this.setState({ mouseOver: false });
        }}
      >
        { this.props.children }
      </ControlButton>
    );
  }
}
Button.contextTypes = {
  color: PropTypes.string
};

export default Button;
