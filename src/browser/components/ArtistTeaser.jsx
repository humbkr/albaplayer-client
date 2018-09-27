import styled from 'styled-components'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { ContextMenuProvider } from 'react-contexify'

const ArtistTeaserName = styled.h2`
  display: table-cell;
  vertical-align: middle;
  font-size: 1em;
  font-weight: normal;
`

const ArtistTeaserWrapper = styled.div`
  display: table;
  width: 100%;
  height: ${props => props.theme.itemHeight};
  padding: 0 15px;
  cursor: pointer;
`

// Needs to be declared as a stateful component so menuProvider can work.
// eslint-disable-next-line react/prefer-stateless-function
class ArtistTeaser extends Component {
  render() {
    const { item } = this.props

    return (
      <ContextMenuProvider id="artist-context-menu">
        <ArtistTeaserWrapper id={item.id}>
          <ArtistTeaserName>{item.name}</ArtistTeaserName>
        </ArtistTeaserWrapper>
      </ContextMenuProvider>
    )
  }
}
ArtistTeaser.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
}

const mapStateToProps = state => ({
  selectedArtists: state.libraryBrowser.selectedArtists,
})

export default connect(mapStateToProps)(ArtistTeaser)
