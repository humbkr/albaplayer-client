import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Icon from './Icon';


const ActionButtonWrapper = styled.button`
  border: none;
  padding: 5px 10px;
  line-height: 20px;
  font-size: 1em;
  text-align: center;
  vertical-align: middle;
  
  :hover {
    cursor: pointer;
    color: cadetblue;
  }
  
  > * {
    display: inline-block;
    vertical-align: top;
  }
  
  > span {
    height: 24px;
    line-height: 24px;
  }
`;

const ActionButton = props => (
  <ActionButtonWrapper onClick={props.onClick}>
    { props.icon &&
    <Icon>{props.icon}</Icon>
    }
    <span>{props.children}</span>
  </ActionButtonWrapper>
);
ActionButton.propTypes = {
  children: PropTypes.element.isRequired,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.string,
};
ActionButton.defaultProps = {
  icon: null,
};

export default ActionButton;
