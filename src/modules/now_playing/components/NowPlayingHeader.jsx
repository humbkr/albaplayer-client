import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import coverPlaceholder from '../../../common/assets/images/cover_placeholder.png'
import { formatDuration } from '../../../common/utils/utils'
import ActionButtonCircle from '../../../common/components/ActionButtonCircle'

class NowPlayingHeader extends Component {
  handleSearchForTabs = () => {
    const song = this.props.track
    const songTitle = song && song.title !== '' ? song.title : ''
    const songArtist = song && song.artist && song.artist.name ? song.artist.name : ''
    const searchQuery = `${songArtist}+${songTitle}+tab`.replace(/ /g, '+')

    window.open(`https://www.google.fr/search?q=${searchQuery}`, '_blank')
  }

  handleSearchForLyrics = () => {
    const song = this.props.track
    const songTitle = song && song.title !== '' ? song.title : ''
    const songArtist = song && song.artist && song.artist.name ? song.artist.name : ''
    const searchQuery = `${songArtist}+${songTitle}+lyrics`.replace(/ /g, '+')

    window.open(`https://www.google.fr/search?q=${searchQuery}`, '_blank')
  }

  render() {
    const song = this.props.track

    const songTitle = song && song.title !== '' ? song.title : 'Unknown title'
    const songArtist = song && song.artist && song.artist.name
      ? song.artist.name
      : 'Unknown artist'
    const songAlbum = song && song.album && song.album.title
      ? song.album.title
      : 'Unknown album'
    const songNumber = song && song.number ? song.number : ''
    const songDisc = song && song.disc ? song.disc : ''
    const songDuration = song && song.duration ? formatDuration(song.duration) : ''
    const songCover = song && song.cover ? song.cover : ''

    let trackAlbumInfo = ''
    if (songNumber) {
      trackAlbumInfo += `track ${songNumber}`

      if (songDisc) {
        trackAlbumInfo += ` on disc ${songDisc}`
      }
    }
    if (songDuration) {
      if (songNumber) {
        trackAlbumInfo += ' - '
      }
      trackAlbumInfo += songDuration
    }

    if (trackAlbumInfo !== '') {
      trackAlbumInfo = `(${trackAlbumInfo})`
    }

    return (
      <Background cover={songCover}>
        <NowPlayingWrapper>
          <CoverInfo>{songCover && <SongCover src={songCover} />}</CoverInfo>
          {song && (
            <SongInfo>
              <Title>{songTitle}</Title>
              <Artist>by {songArtist}</Artist>
              <Album>{songAlbum}</Album>
              <Position>{trackAlbumInfo}</Position>

              <SongActions>
                <ActionButtonCircle
                  icon="queue_music"
                  onClick={this.handleSearchForTabs}
                />
                <ActionButtonCircle
                  icon="mic"
                  onClick={this.handleSearchForLyrics}
                />
              </SongActions>
            </SongInfo>
          )}
          {!song && (
            <SongInfo>
              <h2>No song currently playing</h2>
            </SongInfo>
          )}
        </NowPlayingWrapper>
      </Background>
    )
  }
}
NowPlayingHeader.propTypes = {
  track: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    duration: PropTypes.number,
    number: PropTypes.number,
  }),
}
NowPlayingHeader.defaultProps = {
  track: null,
}

const mapStateToProps = (state) => ({
  track: state.player.track,
})

export default connect(mapStateToProps)(NowPlayingHeader)

const NowPlayingWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px 40px;
  background-color: ${(props) => props.theme.nowPlaying.backgroundColor};
`

const Background = styled.div`
  position: relative;
  display: block;
  overflow: hidden;
  z-index: 0;

  &:before {
    width: 100%;
    height: 100%;
    z-index: -10;
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    ${(props) => (props.cover ? `background-image: url(${props.cover})` : '')};
    background-size: cover;
    background-position: center;
    filter: blur(5px);
    transform: scale(1.1);
  }
`

const CoverInfo = styled.div`
  display: inline-block;
  width: 250px;
  height: 250px;
  background: url(${coverPlaceholder}) no-repeat;
  background-size: 100% 100%;
`

const SongCover = styled.img`
  width: 100%;
  height: 100%;
`

const SongInfo = styled.div`
  display: inline-block;
  position: relative;
  vertical-align: top;
  height: 250px;
  min-width: 200px;
  padding: 20px;
  color: ${(props) => props.theme.nowPlaying.textPrimaryColor};
`

const Title = styled.h2`
  margin-bottom: 5px;
`

const Artist = styled.h3`
  font-weight: normal;
  font-size: 1.2em;
  margin-bottom: 20px;
`

const Album = styled.h4`
  font-weight: normal;
  font-style: italic;
  font-size: 1.1em;
  margin-bottom: 3px;
`

const Position = styled.h4`
  font-weight: normal;
  font-style: italic;
  font-size: 0.9em;
  opacity: 0.7;
`

const SongActions = styled.div`
  position: absolute;
  bottom: 18px;

  > * {
    margin-right: 20px;
  }
`
