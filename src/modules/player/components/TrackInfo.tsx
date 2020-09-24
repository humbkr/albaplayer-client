import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import Ripple from 'common/components/Ripple'
import coverPlaceholder from 'common/assets/images/cover_placeholder.png'
import Track from 'types/Track'
import Cover from '../../../common/components/Cover'

const TrackInfo: FunctionComponent<{
  track: Track
  onClick: () => void
}> = ({ track, onClick }) => {
  const trackTitle = track?.title || 'Unknown title'
  const trackArtist = track?.artist?.name || 'Unknown artist'
  const trackCover = track?.cover || undefined

  return (
    <Ripple>
      <TrackInfoWrapper onClick={() => onClick()}>
        <Overlay />
        <Cover src={trackCover} />
        {track && (
          <OverlayText>
            <TrackTitle>{trackTitle}</TrackTitle>
            <ArtistName>by {trackArtist}</ArtistName>
          </OverlayText>
        )}
      </TrackInfoWrapper>
    </Ripple>
  )
}

export default TrackInfo

const TrackInfoWrapper = styled.div`
  position: relative;
  width: ${(props) => props.theme.sidebar.width};
  height: ${(props) => props.theme.sidebar.width};
  background: url(${coverPlaceholder}) no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  user-select: none;
`
const Overlay = styled.div`
  position: absolute;
  background-color: #191922;
  opacity: 0.65;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`
const OverlayText = styled.div`
  position: absolute;
  top: 40px;
  left: 20px;
`
const TrackTitle = styled.h1`
  font-size: 1.5em;
  letter-spacing: 1px;
  color: #fff;
`
const ArtistName = styled.h2`
  margin-top: 10px;
  font-size: 1.2em;
  letter-spacing: 1px;
  font-weight: normal;
  color: #fff;
`
