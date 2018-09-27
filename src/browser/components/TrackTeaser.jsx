import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { ContextMenuProvider } from 'react-contexify'

const TrackTeaserNumber = styled.div`
  display: table-cell;
  width: 40px;
  text-align: center;
  vertical-align: middle;
  font-size: 0.8em;
`

const TrackTeaserName = styled.h2`
  display: table-cell;
  font-size: 1em;
  font-weight: normal;
  vertical-align: middle;
`

const TrackWrapper = styled.div`
  display: table;
  width: 100%;
  height: ${props => props.theme.itemHeight};
  padding: 0 15px 0 0;
  cursor: pointer;
`

// Needs to be declared as a stateful component so menuProvider can work.
// eslint-disable-next-line react/prefer-stateless-function
class TrackTeaser extends Component {
  render() {
    const { item } = this.props

    return (
      <ContextMenuProvider id="track-context-menu">
        <TrackWrapper id={item.id}>
          <TrackTeaserNumber>{item.number}</TrackTeaserNumber>
          <TrackTeaserName>{item.title}</TrackTeaserName>
        </TrackWrapper>
      </ContextMenuProvider>
    )
  }
}
TrackTeaser.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    duration: PropTypes.number,
    number: PropTypes.number,
  }).isRequired,
}

const mapStateToProps = state => ({
  selectedTracks: state.libraryBrowser.selectedTracks,
})

export default connect(mapStateToProps)(TrackTeaser)
