import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'

class Ripple extends React.Component {
  constructor(props) {
    super(props)

    this.ripple = null
    this.rippleContainer = null
  }

  doTheRipple = (event) => {
    const rippleSize = this.calculateRippleSize(this.rippleContainer)
    const ripplePosition = this.calculateRipplePosition(
      event,
      this.rippleContainer,
      rippleSize
    )

    this.renderRipple(this.ripple, rippleSize, ripplePosition)
  }

  calculateRippleSize = (parent) => {
    const { offsetWidth, offsetHeight } = parent

    return offsetWidth >= offsetHeight ? offsetWidth : offsetHeight
  }

  calculateRipplePosition = (event, parent, rippleSize) => {
    const bounds = parent.getBoundingClientRect()

    const x = event.clientX - bounds.left - rippleSize / 2
    const y = event.clientY - bounds.top - rippleSize / 2

    return { x, y }
  }

  renderRipple = (toNode, size, position) => {
    ReactDOM.unmountComponentAtNode(toNode)
    ReactDOM.render(
      <RippleStyled
        style={{
          left: position.x,
          top: position.y,
          width: size,
          height: size,
        }}
      />,
      toNode
    )
  }

  render() {
    const { children } = this.props

    return (
      <RippleContainer
        {...this.props}
        ref={(el) => {
          this.rippleContainer = el
        }}
        onClick={this.doTheRipple}
      >
        {children}
        <span
          ref={(el) => {
            this.ripple = el
          }}
        />
      </RippleContainer>
    )
  }
}
Ripple.propTypes = {
  children: PropTypes.element.isRequired,
}

export default Ripple

const RippleContainer = styled.div`
  display: inline-block;
  position: relative;
  overflow: hidden;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
`
const rippleAnimation = keyframes`
  100% {
    -webkit-transform: scale(2);
    transform: scale(2);
    opacity: 0;
  }
`
const RippleStyled = styled.span`
  width: 0;
  height: 0;
  opacity: 0.7;
  position: absolute;
  border-radius: 150%;
  background-color: #fff;
  transform: scale(0);
  cursor: inherit;
  user-select: none;
  display: inline-block;
  pointer-events: none;
  animation: ${rippleAnimation} 0.3s linear;
`
