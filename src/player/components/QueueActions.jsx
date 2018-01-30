import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ActionButton from '../../common/ActionButton';
import { queueClear } from '../actionsQueue';


const QueueActionsWrapper = styled.div`
  float: right;
`;

const QueueActions = props => (
  <QueueActionsWrapper>
    <ActionButton onClick={props.clearQueue} icon="close">Clear</ActionButton>
  </QueueActionsWrapper>
);
QueueActions.propTypes = {
  clearQueue: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => (
  {
    clearQueue: () => {
      dispatch(queueClear());
    },
  }
);

export default connect(
  null,
  mapDispatchToProps,
)(QueueActions);
