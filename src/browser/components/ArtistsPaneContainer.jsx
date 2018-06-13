import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import LibraryBrowserList from './LibraryBrowserList';
import ArtistTeaser from './ArtistTeaser';
import LibraryBrowserPane from './LibraryBrowserPane';
import LibraryBrowserListHeader from './LibraryBrowserListHeader';
import { libraryBrowserSortArtists } from '../actions';
import ArtistContextMenu from './ArtistContextMenu';
import { getArtistsList } from '../selectors';


const ArtistsPaneWrapper = styled.div`
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
  width: 33%;
  height: 100%;
`;

class ArtistsPaneContainer extends Component {
  // Change event handler for LibraryBrowserListHeader.
  onSortChangeHandler = (event) => {
    // Pass the new selected sort option to the dispatcher.
    this.props.onChange(event.target.value);
  };

  render() {
    const { artists, orderBy } = this.props;
    const orderByOptions = [
      { value: 'name', label: 'name' },
    ];

    return (
      <ArtistsPaneWrapper>
        <LibraryBrowserPane>
          <LibraryBrowserListHeader
            title="Artists"
            orderBy={orderBy}
            orderByOptions={orderByOptions}
            onChange={this.onSortChangeHandler}
          />
          <ArtistContextMenu />
          <LibraryBrowserList
            items={artists}
            itemDisplay={ArtistTeaser}
          />
        </LibraryBrowserPane>
      </ArtistsPaneWrapper>
    );
  }
}
ArtistsPaneContainer.propTypes = {
  artists: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  orderBy: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    artists: getArtistsList(state),
    orderBy: state.libraryBrowser.sortArtists,
  }
);
const mapDispatchToProps = dispatch => (
  {
    onChange: (sortProperty) => {
      dispatch(libraryBrowserSortArtists(sortProperty));
    },
  }
);


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArtistsPaneContainer);
