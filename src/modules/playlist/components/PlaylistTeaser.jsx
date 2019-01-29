import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { MenuProvider as ContextMenuProvider } from 'react-contexify'

const PlaylistTeaser = (props) => {
  const { item } = props

  return (
    <ContextMenuProvider id="playlist-context-menu" data={item}>
      <Wrapper>
        <div>{item.title}</div>
      </Wrapper>
    </ContextMenuProvider>
  )
}
PlaylistTeaser.propTypes = {
  item: PropTypes.objectOf(PropTypes.shape).isRequired,
}

export default PlaylistTeaser

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: ${(props) => props.theme.itemHeight};
  padding-left: 15px;
  cursor: pointer;
  border-bottom: 1px solid ${(props) => props.theme.separatorColor};
`
