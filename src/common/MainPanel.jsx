import React from 'react';
import styled from 'styled-components';
import { Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LibraryBrowser from '../browser/components/LibraryBrowser';
import NowPlayingPane from './NowPlayingPane';
import LoadingScreen from './LoadingScreen';


const MainPanelWrapper = styled.div`
  margin-left: ${props => props.theme.sidebar.width};
`;

const MainPanel = (props) => {
  const { isFetching, isInitialized } = props;

  return (
    <div>
      { !isInitialized &&
      <MainPanelWrapper>
        <LoadingScreen />
      </MainPanelWrapper>
      }
      { !isFetching && isInitialized &&
      <MainPanelWrapper>
        <Route exact path="/" component={LibraryBrowser} />
        <Route path="/queue" component={NowPlayingPane} />
        <Route path="/library" component={LibraryBrowser} />
      </MainPanelWrapper>
      }
    </div>
  );
};
MainPanel.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  isInitialized: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const { isFetching, isInitialized } = state.library;

  return {
    isFetching,
    isInitialized,
  };
}

// Need to use withRouter here or the views won't change.
export default withRouter(connect(mapStateToProps)(MainPanel));
