import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import PlaylistDetailsHeader from './PlaylistDetailsHeader'
import PlaylistTrack from './PlaylistTrack'
import ActionButtonIcon from '../../../common/components/ActionButtonIcon'

const Wrapper = styled.div`
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
  width: 66%;
  height: 100%;
  padding: 0 15px;
`
const Header = styled.div`
  display: flex;
  align-items: center;
`
const Title = styled.h1`
  display: inline-block;
`
const Actions = styled.div`
  display: inline-block;
`
const PlaylistActionButtons = styled(ActionButtonIcon)`
  color: ${(props) => props.theme.buttons.color};

  :hover {
    color: ${(props) => props.theme.buttons.colorHover};
  }
`
const Info = styled.p`
  margin-bottom: 20px;
  color: ${(props) => props.theme.textSecondaryColor};
`

const PlaylistDetailsPane = (props) => {
  const { item } = props

  // If no playlist is seleted, display nothing.
  if (!item) {
    return null
  }

  const tracks = item
    ? item.tracks.map((track) => <PlaylistTrack item={track} />)
    : []

  return (
    <Wrapper>
      <Header>
        <Title>{item.title}</Title>
        <Actions>
          <PlaylistActionButtons
            icon="play_arrow"
            size={30}
            onClick={() => console.log('TODO')}
          />
          <PlaylistActionButtons
            icon="playlist_add"
            size={30}
            onClick={() => console.log('TODO')}
          />
        </Actions>
      </Header>
      <Info>
        {item.date} - {item.tracks.length} track(s)
      </Info>
      {tracks.length > 0 && <PlaylistDetailsHeader />}
      <div>{tracks}</div>
    </Wrapper>
  )
}
PlaylistDetailsPane.propTypes = {
  item: PropTypes.objectOf(PropTypes.shape),
}
PlaylistDetailsPane.defaultProps = {
  item: null,
}

export default PlaylistDetailsPane
