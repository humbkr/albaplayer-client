import React from 'react';
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from './Icon';

const rotate360CounterClockwise = keyframes`
  from {
    transform: rotate(360deg);
  }
  
  to {
    transform: rotate(0deg);
  }
`;

const LoadingStyled = styled.div`
  width: 100%;
  text-align: center;
  color: ${props => props.theme.highlight};
  
  > i {
    font-size: 60px;
    animation: ${rotate360CounterClockwise} 2s linear infinite;
  }
  
  > p {
    margin-top: 10px;
  }
`;

const LoadingScreenWrapper = styled.div`
  display: table;
  width: 100%;
  height: 100vh;
`;

const LoadingScreenInitProgress = styled.div`
  display: table-cell;
  text-align: center;
  vertical-align: middle;
  
  > h2 {
    // So the text appears verticaly centered.
    margin-bottom: 75px;
  }
`;

const LoadingScreenInitFailed = styled.div`
  display: table-cell;
  padding: 20px;
`;

const Loading = () => (
  <LoadingStyled>
    <Icon>camera</Icon>
  </LoadingStyled>
);

const LoadingScreen = (props) => {
  const { isFetching, initHasFailed } = props;

  return (
    <LoadingScreenWrapper>
      { isFetching &&
        <LoadingScreenInitProgress>
          <Loading />
          <h2>Initializing library...</h2>
        </LoadingScreenInitProgress>
      }
      { initHasFailed &&
        <LoadingScreenInitFailed>
          <h2>Initialization has failed, check your server is accessible.</h2>
        </LoadingScreenInitFailed>
      }

    </LoadingScreenWrapper>
  );
};
LoadingScreen.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  initHasFailed: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const { isFetching, isInitialized, initHasFailed } = state.library;

  return {
    isFetching,
    isInitialized,
    initHasFailed,
  };
};

export default connect(mapStateToProps)(LoadingScreen);
