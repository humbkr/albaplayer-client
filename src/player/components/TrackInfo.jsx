import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import coverPlaceholder from '../../assets/cover_placeholder.png';


const TrackInfoWrapper = styled.div`
  position: relative;
  width: ${props => props.theme.sidebar.width};
  height: ${props => props.theme.sidebar.width};
  background: url(${coverPlaceholder}) no-repeat;
  background-size: 100% 100%;
`;

const Cover = styled.img`
  width: 100%;
`;

const Overlay = styled.div`
  position: absolute;
  background-color: #191922;
  opacity: .65;
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

class TrackInfo extends React.PureComponent {
  render() {
    const track = this.props.track;
    const trackTitle = (track && track.title !== '') ? track.title : 'Unknown title';
    const trackArtist = (track && track.artist && track.artist.name) ? track.artist.name : 'Unknown artist';
    const trackCover = (track && track.cover) ? track.cover : false;

    return (
      <TrackInfoWrapper>
        <Overlay />
        {trackCover &&
          <Cover src={trackCover} />
        }
        {track &&
          <OverlayText>
            <TrackTitle>{trackTitle}</TrackTitle>
            <ArtistName>by {trackArtist}</ArtistName>
          </OverlayText>
        }
      </TrackInfoWrapper>
    );
  }
}
TrackInfo.propTypes = {
  track: PropTypes.shape({
    title: PropTypes.string.isRequired,
    cover: PropTypes.string,
    artist: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
};
TrackInfo.defaultProps = {
  track: null,
};


export default TrackInfo;
