import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ActionButtonCircleWrapper = styled.div`
  display: inline-block;
  
  :hover {
    cursor: pointer;
  }
`;

const ActionButtonCircle = (props) => {
  const {
    size,
    borderWidth,
    color,
    text,
  } = props;

  return (
    <ActionButtonCircleWrapper>
      <svg width={size + borderWidth} height={size + borderWidth} xmlns="http://www.w3.org/2000/svg" version="1.1">
        <g>
          <circle cx="50%" cy="50%" r={size / 2} stroke={color} strokeWidth={borderWidth} fill="transparent" />
          <text x="50%" y="50%" fill={color} textAnchor="middle" alignmentBaseline="middle" dy=".1em">{text}</text>
        </g>
      </svg>
    </ActionButtonCircleWrapper>
  );
};
ActionButtonCircle.propTypes = {
  size: PropTypes.number,
  borderWidth: PropTypes.number,
  color: PropTypes.string,
  text: PropTypes.string,
};
ActionButtonCircle.defaultProps = {
  size: 50,
  borderWidth: 1,
  color: '#fff',
  text: '',
};

export default ActionButtonCircle;
