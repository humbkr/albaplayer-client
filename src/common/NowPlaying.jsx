import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import coverPlaceholder from '../assets/cover_placeholder.png';
import { formatDuration } from '../utils';
import ActionButtonCircle from './ActionButtonCircle';


const NowPlayingWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px 40px;
  background-color: rgba(0, 0, 0, .65);
`;

const Background = styled.div`
  position: relative;
  display: block;
  overflow: hidden;
  z-index: 0;
  
  &:before {
    width: 100%;
    height: 100%;
    z-index: -10;
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    ${props => (props.cover) ? `background-image: url(${props.cover})` : ''};
    background-size: cover;
    background-position: center;
    filter: blur(5px);
    transform: scale(1.1); 
  }
`;

const CoverInfo = styled.div`
  display: inline-block;
  width: 250px;
  height: 250px;
  background: url(${coverPlaceholder}) no-repeat;
  background-size: 100% 100%;
`;

const SongCover = styled.img`
  width: 100%;
  height: 100%;
`;

const SongInfo = styled.div`
  display: inline-block;
  position: relative;
  vertical-align: top;
  height: 250px;
  padding: 20px;
  color: #fff;
`;

const Title = styled.h2`
  margin-bottom: 5px;
`;

const Artist = styled.h3`
  font-weight: normal;
  font-size: 1.2em;
  margin-bottom: 20px;
`;

const Album = styled.h4`
  font-weight: normal;
  font-style: italic;
  font-size: 1.1em;
  margin-bottom: 3px;
`;

const Position = styled.h4`
  font-weight: normal;
  font-style: italic;
  font-size: .9em;
  opacity: .7;
`;

const SongActions = styled.div`
  position: absolute;
  bottom: 18px;
  
  > * {
    margin-right: 20px;
  }
`;

const NowPlaying = (props) => {
  const song = props.track;

  const songTitle = (song && song.title !== '') ? song.title : 'Unknown title';
  const songArtist = (song && song.artist && song.artist.name) ? song.artist.name : 'Unknown artist';
  const songAlbum = (song && song.album && song.album.title) ? song.album.title : 'Unknown album';
  const songNumber = (song && song.number) ? song.number : '';
  const songDisc = (song && song.disc) ? song.disc : '';
  const songDuration = (song && song.duration) ? formatDuration(song.duration) : '';
  const songCover = (song && song.cover) ? song.cover : '';

  let trackAlbumInfo = '';
  if (songNumber) {
    trackAlbumInfo += `track ${songNumber}`;

    if (songDisc) {
      trackAlbumInfo += ` on disc ${songDisc}`;
    }
  }
  if (songDuration) {
    if (songNumber) {
      trackAlbumInfo += ' - ';
    }
    trackAlbumInfo += songDuration;
  }

  if (trackAlbumInfo !== '') {
    trackAlbumInfo = `(${trackAlbumInfo})`;
  }

  return (
    <Background cover={songCover}>
      <NowPlayingWrapper>
        <CoverInfo>
          {songCover &&
            <SongCover src={songCover} />
          }
        </CoverInfo>
        {song &&
          <SongInfo>
            <Title>{songTitle}</Title>
            <Artist>by {songArtist}</Artist>
            <Album>{songAlbum}</Album>
            <Position>{trackAlbumInfo}</Position>

            <SongActions>
              <ActionButtonCircle text="T'" />
              <ActionButtonCircle text="L" />
            </SongActions>
          </SongInfo>
        }
        {!song &&
          <SongInfo>
            <h2>No song currently playing</h2>
          </SongInfo>
        }
      </NowPlayingWrapper>
    </Background>
  );
};
NowPlaying.propTypes = {
  track: PropTypes.objectOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = state => (
  {
    track: state.player.track,
  }
);


export default connect(mapStateToProps)(NowPlaying);
