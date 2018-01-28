import React from 'react';
import PropTypes from 'prop-types';
import VirtualList from 'react-virtual-list';
import QueueItem from './QueueItem';


const QueueList = (props) => {
  const { virtual, itemHeight, current } = props;

  return (
    <ul style={virtual.style}>
      {virtual.items.map(item => (
        <QueueItem key={item.position} item={item} itemHeight={itemHeight} current={current} />
      ))}
    </ul>
  );
};
QueueList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  virtual: PropTypes.object.isRequired,
  itemHeight: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
};

export default VirtualList()(QueueList);
