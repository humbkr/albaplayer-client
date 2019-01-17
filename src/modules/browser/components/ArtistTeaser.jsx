import styled from 'styled-components'
import React from 'react'
import PropTypes from 'prop-types'
import { MenuProvider as ContextMenuProvider } from 'react-contexify'

const ArtistTeaserName = styled.h2`
  display: table-cell;
  vertical-align: middle;
  font-size: 1em;
  font-weight: normal;
`

const ArtistTeaserWrapper = styled.div`
  display: table;
  width: 100%;
  height: ${(props) => props.theme.itemHeight};
  padding: 0 15px;
  cursor: pointer;
`

const ArtistTeaser = (props) => {
  const { item } = props

  return (
    <ContextMenuProvider id="artist-context-menu" data={item}>
      <ArtistTeaserWrapper>
        <ArtistTeaserName>{item.name}</ArtistTeaserName>
      </ArtistTeaserWrapper>
    </ContextMenuProvider>
  )
}
ArtistTeaser.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
}

export default ArtistTeaser
