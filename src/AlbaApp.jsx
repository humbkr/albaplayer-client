import styled from 'styled-components';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Sidebar from './sidebar/components/Sidebar';
import MainPanel from './common/MainPanel';
import { initLibrary } from './actions';

const AlbaAppWrapper = styled.div`
  display: table;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

class AlbaApp extends Component {
  componentDidMount() {
    const dispatch = this.props.dispatch;
    dispatch(initLibrary());
  }

  render() {
    const { isFetching, isInitialized } = this.props;

    return (
      <div>
        { isFetching && <h2>Loading...</h2> }
        { !isFetching && isInitialized &&
          <AlbaAppWrapper>
            <Sidebar />
            <MainPanel />
          </AlbaAppWrapper>
        }
      </div>
    );
  }
}
AlbaApp.propTypes = {
  dispatch: PropTypes.func.isRequired,
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

export default withRouter(connect(mapStateToProps)(AlbaApp));
