import styled from 'styled-components';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Sidebar from './common/Sidebar';
import MainPanel from './common/MainPanel';
import { initLibrary } from './actions';

const AlbaAppWrapper = styled.div`
  display: table;
  width: 100%;
  height: 100vh;
`;

class AlbaApp extends Component {
  componentDidMount() {
    const dispatch = this.props.dispatch;
    dispatch(initLibrary());
  }

  render() {
    return (
      <AlbaAppWrapper>
        <Sidebar />
        <MainPanel />
      </AlbaAppWrapper>
    );
  }
}
AlbaApp.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

// Need to use withRouter here or the views in MainPanel won't change.
// https://github.com/ReactTraining/react-router/issues/4671
export default withRouter(connect()(AlbaApp));
