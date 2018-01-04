import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router'
import styled from 'styled-components';
import { gql, graphql } from 'react-apollo';

import { AppPageHeader } from './layout';
import { IconButton, Icon, LinkBox, Loading, Message } from "./commons/common";
import DrawerMenuDecorator from './commons/drawer';
import MainActionButton from './commons/mainActionButton';
import LibraryListContainer from './library/list';
import { TrackTeaserPlayable } from './track';

const AlbumTeaserTitle = styled.h2`
  font-size: 1em;
  font-weight: normal;
  max-height: 18px;
  overflow: hidden;
`;

const AlbumSubInfo = styled.div`
  color: ${props => props.theme.textSecondaryColor};
  font-size: 0.8em;
  margin-top: 5px;
`;

const AlbumTeaserArtist = styled.span`
  font-style: italic;
`;

const AlbumTeaserWrapper = styled.div`
  padding-left: 15px;
  height: 36px;
`;

class AlbumTeaser extends Component {
  render() {
    const album = this.props.item;

    return (
      <LinkBox to={`/album/${album.id}`} title={album.title}>
        <AlbumTeaserWrapper>
          <AlbumTeaserTitle>{album.title}</AlbumTeaserTitle>
          <AlbumSubInfo>
            {  }
            <span>{album.year}</span><AlbumTeaserArtist>{' - ' + album.artistName}</AlbumTeaserArtist>
          </AlbumSubInfo>
        </AlbumTeaserWrapper>
      </LinkBox>
    );
  }
}
AlbumTeaser.propTypes = {
  item: PropTypes.object.isRequired,
};

class AlbumTeaserPlayable extends Component {
  render() {
    const album = this.props.item;
    const drawerContent = (
      <div>
        <IconButton><Icon>play_arrow</Icon></IconButton>
        <IconButton><Icon>playlist_add</Icon></IconButton>
      </div>
    );

    return (
      <DrawerMenuDecorator icon="more_vert" content={drawerContent} widthOpen="150px">
        <AlbumTeaser item={album} />
      </DrawerMenuDecorator>
    );
  }
}
AlbumTeaserPlayable.propTypes = {
  item: PropTypes.object.isRequired,
};


const AlbumInfo = styled.div`
  min-height: 70px;
  border-bottom: 1px solid  ${props => props.theme.separatorColor};
  box-shadow: 0 5px 5px -2px rgba(0,0,0,.3);
  padding: 20px 10px 10px 15px;
  margin-bottom: 8px;

  > h1 {
    font-size: 1.2em;
    font-weight: normal;
  }
  
  > p {
    margin-top: 6px;
    color: ${props => props.theme.textSecondaryColor};
    font-size: 0.9em;
    font-style: italic;
  }
`;

const AlbumActions = styled.div`
  position: relative;
  float: right;
  top: -30px;
  right: 15px;
`;

const AlbumDetailWrapper = styled.div`
  > img {
    width: 100%;
  }
  
  > ul {
    border-top: none;
  }
`;

class AlbumDetail extends Component {
  render() {
    if (this.props.data.loading) {
      return <Loading />;
    }
    if (this.props.data.error) {
      return <Message type="error">{this.props.data.error.message}</Message>;
    }

    const album = this.props.data.album;
    const artistName = (album.artist) ? album.artist.name : "";

    // Copy tracks into a new array so we can reorder them client-side.
    let tracks = [];
    album.tracks.forEach((value) => {
      tracks.push(value);
    });

    let cover = '/images/cover.png';
    if (tracks[2].cover) {
      cover = "http://localhost:8888/covers/" + tracks[2].cover;
    }

    return (
      <AlbumDetailWrapper>
        <AppPageHeader title={artistName + ' > ' + album.title} />
        <img src={cover} />
        <AlbumActions>
          <MainActionButton icon="keyboard_arrow_up">
            <IconButton><Icon>play_arrow</Icon></IconButton>
            <IconButton><Icon>playlist_add</Icon></IconButton>
          </MainActionButton>
        </AlbumActions>
        <AlbumInfo>
          <h1>{album.title}</h1>
          <p>{artistName} | {album.year}</p>
        </AlbumInfo>
        <LibraryListContainer
          items={tracks}
          itemDisplay={TrackTeaserPlayable}
          orderBy="number"
          searchFilter=""
          searchProperty="title"
        />
      </AlbumDetailWrapper>
  );
  }
}
const albumQuery = gql`
  query AlbumQuery($albumId: ID!) {
    album(id: $albumId) {
      title
      year
      artist {
        id
        name
      }
      tracks {
        id
        number
        title
        duration
        cover
      }
    }
  }
`;

const AlbumDetailWithData = graphql(albumQuery, {
  options: (props) => ({
    variables: {
      albumId: props.match.params.albumId
    }
  }),
})(withRouter(AlbumDetail));

export {
  AlbumTeaser,
  AlbumTeaserPlayable,
  AlbumDetailWithData,
};
