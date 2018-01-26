import React from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import LibraryBrowser from '../browser/components/LibraryBrowser';
import NowPlayingPane from './NowPlayingPane';


const MainPanelWrapper = styled.div`
  margin-left: ${props => props.theme.sidebar.width};
`;

const MainPanel = () => (
  <MainPanelWrapper>
    <Route exact path="/" component={LibraryBrowser} />
    <Route path="/queue" component={NowPlayingPane} />
    <Route path="/library" component={LibraryBrowser} />
  </MainPanelWrapper>
);


export default MainPanel;
