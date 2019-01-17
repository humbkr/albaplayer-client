import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Icon from './Icon'

const MessageWrapper = styled.div`
  color: ${(props) => props.theme.messages[props.type].color};

  > * {
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
  }

  > span {
    height: ${(props) => props.theme.messages.height};
    line-height: ${(props) => props.theme.messages.height};
  }
`

const Message = (props) => {
  let Picto = ''
  switch (props.type) {
    case 'info':
      Picto = <Icon>info</Icon>
      break
    case 'warning':
      Picto = <Icon>warning</Icon>
      break
    case 'error':
      Picto = <Icon>error</Icon>
      break
    default:
  }

  return (
    <MessageWrapper type={props.type}>
      {Picto}
      <span>{props.children}</span>
    </MessageWrapper>
  )
}
Message.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['info', 'warning', 'error']).isRequired,
}

export default Message
