import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import coverPlaceholder from '../assets/cover_placeholder.png';


const SongInfoWrapper = styled.div`
  position: relative;
`;

const Cover = styled.img`
  width: 100%;
`;

const Overlay = styled.div`
  position: absolute;
  background-color: #191922;
  opacity: .40;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const OverlayText = styled.div`
  position: absolute;
  top: 40px;
  left: 20px;
`;

const TrackTitle = styled.h1`
  font-size: 1.5em;
  letter-spacing: 1px;
  color: #fff;
`;

const ArtistName = styled.h2`
  margin-top: 10px;
  font-size: 1.2em;
  letter-spacing: 1px;
  font-weight: normal;
  color: #fff;
`;

class SongInfo extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    artist: PropTypes.string,
    cover: PropTypes.string
  };
  static defaultProps = {
    title: 'Unknown title',
    artist: 'Unknown artist',
    cover: coverPlaceholder
  };

  render() {
    const { title, artist, cover } = this.props;

    return (
      <SongInfoWrapper>
        <Cover src={cover ? cover : coverPlaceholder} alt="Song cover"/>
        <Overlay/>
        <OverlayText>
          <TrackTitle>{title}</TrackTitle>
          <ArtistName>by {artist}</ArtistName>
        </OverlayText>
      </SongInfoWrapper>
    );
  }
}

export default SongInfo;
