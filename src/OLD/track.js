import React, { Component } from 'react';
import styled from 'styled-components';

import {IconButton, Icon, LinkBox} from "./commons/common";
import DrawerMenuDecorator from './commons/drawer';

const TrackTeaserNumber = styled.div`
  display: table-cell;
  width: 40px;
  text-align: center;
  vertical-align: middle;
  font-size: 0.8em;
`;

const TrackTeaserName = styled.h2`
  display: table-cell;
  font-size: 1em;
  font-weight: normal;
  vertical-align: middle;
`;

const TrackTeaserDuration = styled.div`
  display: table-cell;
  width: 40px;
  text-align: center;
  color: ${props => props.theme.textSecondaryColor};
  vertical-align: middle;
`;

const TrackWrapper = styled.div`
  display: table;
  width: 100%;
  height: 100%;
`;

class TrackTeaser extends Component {
  render() {
    const track = this.props.item;

    return (
      <TrackWrapper>
        <TrackTeaserNumber>{track.number}</TrackTeaserNumber>
        <TrackTeaserName>{track.title}</TrackTeaserName>
        <TrackTeaserDuration>{track.duration}</TrackTeaserDuration>
      </TrackWrapper>
    );
  }
}

class TrackTeaserPlayable extends Component {
  render() {
    const track = this.props.item;
    const drawerContent = (
      <div>
        <IconButton><Icon>play_arrow</Icon></IconButton>
        <IconButton><Icon>playlist_add</Icon></IconButton>
      </div>
    );

    return (
      <DrawerMenuDecorator icon="more_vert" content={drawerContent} widthOpen="150px">
        <TrackTeaser item={track} />
      </DrawerMenuDecorator>
    );
  }
}

export {
  TrackTeaser,
  TrackTeaserPlayable,
};
