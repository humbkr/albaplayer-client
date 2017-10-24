import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { Title, Header } from './commons/common';
import SidebarContainer from './sidebar';
import { AlbumListView, AlbumListViewAll } from "./albumListView";
import ArtistListView from "./artistListView";
import HomeView from "./homeView";

class AppPageHeader extends Component {
  render() {
    return (
      <Header>
        <Title>{this.props.title}</Title>
      </Header>
    );
  }
}
AppPageHeader.propTypes = {
  title: PropTypes.string,
};

const AppPageContent = styled.div`
  
`;


class AppPage extends Component {
  render() {
    return (
      <Router>
        <div>
          <SidebarContainer />
          <AppPageHeader title="Test title"/>
          <AppPageContent>
            <Route exact path="/" component={HomeView}/>
            <Route path="/artists" component={ArtistListView}/>
            <Route path="/artist/:artistId/albums" component={AlbumListView}/>
            <Route path="/albums" component={AlbumListViewAll}/>
          </AppPageContent>
        </div>
      </Router>
    );
  }
}
AppPage.propTypes = {
  title: PropTypes.string,
};

export default AppPage;

export {
  AppPageHeader,
};
