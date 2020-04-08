import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import coverPlaceholder from 'common/assets/images/cover_placeholder.png'
import { formatDuration } from 'common/utils/utils'
import ActionButtonCircle from 'common/components/ActionButtonCircle'

const SEARCH_ENGINE_URL = 'https://www.google.fr/search?q='

function getTrackInfoForDisplay(track) {
  return track
    ? {
      title: track?.title ?? 'Unknown title',
      artist: track?.artist?.name ?? 'Unknown artist',
      album: track?.album?.title ?? 'Unknown album',
      number: track?.number ?? '',
      disc: track?.disc ?? '',
      duration: track?.duration ? formatDuration(track.duration) : '',
      cover: track?.cover ?? '',
    }
    : {}
}

function NowPlayingHeader({ pinned }) {
  const track = useSelector((state) => state.player.track)

  const handleWebSearch = (what) => {
    if (track) {
      const songTitle = track?.title ?? ''
      const songArtist = track?.artist?.name ?? ''
      const searchQuery = `${songArtist}+${songTitle}+${what}`.replace(
        / /g,
        '+'
      )

      window.open(`${SEARCH_ENGINE_URL}${searchQuery}`, '_blank')
    }
  }

  const trackInfo = getTrackInfoForDisplay(track)

  let trackAlbumInfo = ''
  if (trackInfo.number) {
    trackAlbumInfo += `track ${trackInfo.number}`

    if (trackInfo.disc) {
      trackAlbumInfo += ` on disc ${trackInfo.disc}`
    }
  }
  if (trackInfo.duration) {
    if (trackInfo.number) {
      trackAlbumInfo += ' - '
    }
    trackAlbumInfo += trackInfo.duration
  }

  if (trackAlbumInfo !== '') {
    trackAlbumInfo = `(${trackAlbumInfo})`
  }

  return (
    <Wrapper pinned={pinned}>
      <Background cover={trackInfo.cover}>
        <NowPlaying pinned={pinned}>
          <CoverInfo pinned={pinned}>
            {trackInfo.cover && <SongCover src={trackInfo.cover} />}
          </CoverInfo>
          {track && (
            <SongInfo pinned={pinned}>
              <SongInfoPart1>
                <Title pinned={pinned}>{trackInfo.title}</Title>
                <Artist pinned={pinned}>by {trackInfo.artist}</Artist>
              </SongInfoPart1>
              <SongInfoPart2 pinned={pinned}>
                <Album>{trackInfo.album}</Album>
                <Position>{trackAlbumInfo}</Position>
              </SongInfoPart2>
              <SongActions pinned={pinned}>
                <ActionButtonCircle
                  icon="queue_music"
                  onClick={() => handleWebSearch('tab')}
                />
                <ActionButtonCircle
                  icon="mic"
                  onClick={() => handleWebSearch('lyrics')}
                />
              </SongActions>
            </SongInfo>
          )}
          {!track && (
            <SongInfo>
              <h2>No song currently playing</h2>
            </SongInfo>
          )}
        </NowPlaying>
      </Background>
    </Wrapper>
  )
}
NowPlayingHeader.propTypes = {
  pinned: PropTypes.bool,
}
NowPlayingHeader.defaultProps = {
  pinned: false,
}

export default NowPlayingHeader

const Wrapper = styled.div`
  padding: 0 50px;

  ${({ pinned, theme }) => pinned
    && `
    background-color: ${theme.backgroundColor};
    padding: 10px;
    margin-left: ${theme.sidebar.width};
    position: fixed;
    z-index: 666;
    top: 0;
    left: 0;
    width: calc(100vw - ${theme.sidebar.width});
  `}
`
const NowPlaying = styled.div`
  transition: padding-left 0.2s ease, padding-right 0.2s ease;
  width: 100%;
  margin: 0 auto;
  padding: 20px 40px;
  background-color: ${(props) => props.theme.nowPlaying.backgroundColor};
  display: flex;

  ${({ pinned }) => pinned
    && `
    padding: 0;
  `}
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
  flex-shrink: 0;

  ${({ pinned }) => pinned
    && `
    width: 100px;
    height: 100px;
    padding: 5px;
    background-size: 90px 90px;
    background-position: top 5px left 5px;
  `}
`
const SongCover = styled.img`
  width: 100%;
  height: 100%;
`
const SongInfo = styled.div`
  position: relative;
  vertical-align: top;
  height: 250px;
  color: ${(props) => props.theme.nowPlaying.textPrimaryColor};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 20px;

  > * {
    transition: flex-grow 0.4s ease;
  }

  ${({ pinned }) => pinned
    && `
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    height: 100px;
    align-items: center;
    padding: 20px 0 20px 20px;
    
    > * {
      flex-grow: 1;
    }
  `}
`
const SongInfoPart1 = styled.div``
const SongInfoPart2 = styled.div`
  padding: 15px 0 5px;

  ${({ pinned }) => pinned
    && `
    padding: 0;
    
    > :first-child {
      margin-bottom: 5px;
    }
  `}
`
const Title = styled.h2`
  margin-bottom: 5px;

  ${({ pinned }) => pinned
    && `
    font-size: 1.1em;
  `}
`
const Artist = styled.h3`
  font-weight: normal;
  font-size: 1.2em;

  ${({ pinned }) => pinned
    && `
     font-size: 1em;
  `}
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
  flex-grow: 1;
  display: flex;
  align-items: flex-end;

  > * {
    margin-right: 20px;
  }

  ${({ pinned }) => pinned
    && `
    flex-grow: 0;
    flex-shrink: 0;
    display: block;
    padding-left: 20px;
  `}
`
