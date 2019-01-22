import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: ${(props) => props.theme.itemHeight};
  padding-left: 15px;
  cursor: pointer;
  border-bottom: 1px solid ${(props) => props.theme.separatorColor};

  :hover {
    background-color: ${(props) => props.theme.highlight};
  }

  ${(props) => props.selected ? `background-color: ${props.theme.highlight}` : ''};
`
const Title = styled.div``

const PlaylistTeaser = (props) => {
  const { item, onClick, selected } = props

  return (
    <Wrapper selected={selected} onClick={() => onClick(item)}>
      <Title>{item.title}</Title>
    </Wrapper>
  )
}
PlaylistTeaser.propTypes = {
  item: PropTypes.objectOf(PropTypes.shape).isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
}

export default PlaylistTeaser
