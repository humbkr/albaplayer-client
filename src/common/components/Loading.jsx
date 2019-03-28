import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import PropTypes from 'prop-types'
import Icon from './Icon'

const Loading = (props) => (
  <LoadingStyled fontSize={props.size}>camera</LoadingStyled>
)
Loading.propTypes = {
  size: PropTypes.string,
}
Loading.defaultProps = {
  size: '1.8em',
}

export default Loading

const rotate360CounterClockwise = keyframes`
  from {
    transform: rotate(360deg);
  }
  
  to {
    transform: rotate(0deg);
  }
`

const rotate360CounterClockwiseRule = css`
  ${rotate360CounterClockwise} 2s linear infinite;
`

const LoadingStyled = styled(Icon)`
  color: ${(props) => props.theme.highlight};
  font-size: ${(props) => props.fontSize};
  animation: ${rotate360CounterClockwiseRule};
`
