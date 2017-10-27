import React, { Component } from 'react';
import styled from 'styled-components';

import {IconButton, Icon, LinkBox} from "./commons/common";
import DrawerMenuDecorator from './commons/drawer';

const ArtistTeaserName = styled.h2`
  padding-left: 15px;
  font-size: 1em;
  font-weight: normal;
`;

class ArtistTeaser extends Component {
  render() {
    const artist = this.props.item;

    return (
      <LinkBox to={`/artist/${artist.id}/albums`} title={artist.name}>
        <ArtistTeaserName>{artist.name}</ArtistTeaserName>
      </LinkBox>
    );
  }
}

class ArtistTeaserPlayable extends Component {
  render() {
    const artist = this.props.item;
    const drawerContent = (
      <div>
        <IconButton><Icon>play_arrow</Icon></IconButton>
        <IconButton><Icon>playlist_add</Icon></IconButton>
      </div>
    );

    return (
      <DrawerMenuDecorator icon="more_vert" content={drawerContent} widthOpen="150px">
        <ArtistTeaser item={artist} />
      </DrawerMenuDecorator>
    );
  }
}

export {
  ArtistTeaser,
  ArtistTeaserPlayable,
};
