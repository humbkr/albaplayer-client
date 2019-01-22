import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import ActionButtonIcon from '../../../common/components/ActionButtonIcon'

// Required to control the div independently.
const TrackPosition = styled.div``

const TrackActions = styled.div`
  display: none;
  vertical-align: middle;
  text-align: right;
  color: ${(props) => props.theme.textSecondaryColor};
`
const TrackWrapper = styled.div`
  display: grid;
  grid-template-columns: 60px auto 44px;
  height: ${(props) => props.theme.itemHeight};
  border-bottom: 1px solid ${(props) => props.theme.separatorColor};
  ${(props) => (props.isCurrent ? 'font-weight: bold' : '')};

  > * {
    align-self: center;
  }

  :hover {
    background-color: ${(props) => props.theme.highlight};

    ${TrackActions} {
      display: block;
    }
  }
`
const TrackFirstColumn = styled.div`
  justify-self: center;
  color: ${(props) => props.theme.textSecondaryColor};
`
const TrackSecondColumn = styled.div``
const TrackInfo = styled.div`
  font-size: 0.8em;
  color: ${(props) => props.selected
    ? props.theme.textHighlightColor
    : props.theme.textSecondaryColor};
`

class PlaylistTrack extends React.Component {
  handleRemoveTrack = () => {
    this.props.handleRemoveTrack(this.props.item.position - 1)
  }

  render() {
    const { item } = this.props

    return (
      <TrackWrapper>
        <TrackFirstColumn>
          <TrackPosition>{item.position}</TrackPosition>
        </TrackFirstColumn>
        <TrackSecondColumn>
          <div>{item.title}</div>
          <TrackInfo>
            {item.artist.name} - {item.album.title} ({item.album.date})
          </TrackInfo>
        </TrackSecondColumn>
        <TrackActions>
          <ActionButtonIcon icon="delete" onClick={this.handleRemoveTrack} />
        </TrackActions>
      </TrackWrapper>
    )
  }
}
PlaylistTrack.propTypes = {
  item: PropTypes.shape({
    position: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    duration: PropTypes.number,
  }).isRequired,
  handleSetPlayback: PropTypes.func.isRequired,
  handlePlayNewTrack: PropTypes.func.isRequired,
  handleRemoveTrack: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
}

export default PlaylistTrack
