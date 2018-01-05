import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { gql, graphql } from 'react-apollo';

import { Message, Loading } from './commons/common';
import LibraryListView from "./library/listView";
import { AlbumTeaserPlayable } from "./album";
import { AppPageHeader } from './layout';

class AlbumListViewInternal extends Component {
  constructor(props){
    super(props);
    document.title = 'Albums';
  }

  render() {
    if (this.props.data.loading) {
      return <Loading />;
    }
    if (this.props.data.error) {
      return <Message type="error">{this.props.data.error.message}</Message>;
    }

    // Copy objects into a new array so we can reorder them client-side.
    let items = [];
    if (this.props.data.albums) {
      this.props.data.albums.forEach((value) => {
        items.push(value);
      });
    }
    if (this.props.data.artist && this.props.data.artist.albums) {
      this.props.data.artist.albums.forEach((value) => {
        const albumItem = {
          ...value,
          artistName: this.props.data.artist.name
        };
        items.push(albumItem);
      });
    }

    const orderByOptions = [
      {value: 'title', label: 'title'},
      {value: 'year', label: 'year'},
    ];

    return (
      <div>
        <AppPageHeader title="Albums" />
        <LibraryListView
          itemDisplay={AlbumTeaserPlayable}
          items={items}
          orderOptions={orderByOptions}
          defaultOrder="title"
          searchProperty="title"
        />
      </div>
    );
  }
}
const albumsForArtistQuery = gql`
  query AlbumsForArtistQuery($artistId: ID!) {
    artist(id: $artistId) {
      name
      albums {
        id
        title
        year
        artistName
      }
    }
  }
`;
const allAlbumsQuery = gql`
  query AllAlbumsQuery {
    albums {
      id
      title
      year
      artistName
    }
  }
`;

const AlbumListView = graphql(albumsForArtistQuery, {
  options: (props) => ({
    variables: {
      artistId: props.match.params.artistId
    }
  }),
})(withRouter(AlbumListViewInternal));

const AlbumListViewAll = graphql(allAlbumsQuery)(AlbumListViewInternal);

export {
  AlbumListViewAll,
  AlbumListView,
}
