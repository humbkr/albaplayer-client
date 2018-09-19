import React from 'react'
import styled, { keyframes } from 'styled-components'
import PropTypes from 'prop-types'
import Icon from './Icon'

const rotate360CounterClockwise = keyframes`
  from {
    transform: rotate(360deg);
  }
  
  to {
    transform: rotate(0deg);
  }
`

const LoadingStyled = styled(Icon)`
  color: ${props => props.theme.highlight};
  font-size: ${props => props.size};
  animation: ${rotate360CounterClockwise} 2s linear infinite;
`

const Loading = props => <LoadingStyled size={props.size}>camera</LoadingStyled>
Loading.propTypes = {
  size: PropTypes.string,
}
Loading.defaultProps = {
  size: '1.8em',
}

export default Loading
