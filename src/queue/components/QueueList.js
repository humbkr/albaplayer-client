import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import VirtualList from 'react-virtual-list';


const QueueListItemRow = styled.li`
  display: table;
  table-layout: fixed;
  width: 100%;
  border-bottom: 1px solid ${props => props.theme.separatorColor};
  
  ${props => props.isCurrent ? 'font-weight: bold' : ''};
`;

const QueueListItemPosition =  styled.div`
  display: table-cell;
  width: 60px;
  text-align: center;
  vertical-align: middle;
  color: ${props => props.theme.textSecondaryColor};
`;

const QueueListItemTrackTitle = styled.div`
  display: table-cell;
  vertical-align: middle;
`;

const QueueListItemDuration = styled.div`
  display: table-cell;
  width: 70px;
  vertical-align: middle;
  text-align: center;
  color: ${props => props.theme.textSecondaryColor};
`;

const QueueListItemCell = styled.div`
  display: table-cell;
  width: 30px;
  vertical-align: middle;
  text-align: center;
`;


class QueueList extends Component {
  render() {
    const virtual = this.props.virtual;
    const itemHeight = this.props.itemHeight;
    const current = this.props.current;


    return (
      <ul style={virtual.style}>
        {virtual.items.map((item) => (
          <QueueListItemRow key={item.position} style={{height: itemHeight}} isCurrent={(current + 1 === item.position)}>
            <QueueListItemPosition>{item.position}</QueueListItemPosition>
            <QueueListItemTrackTitle>{item.title}</QueueListItemTrackTitle>
            <QueueListItemDuration>{formatDuration(item.duration)}</QueueListItemDuration>
          </QueueListItemRow>
        ))}
      </ul>
    )
  }
}
QueueList.propTypes = {
  virtual: PropTypes.object.isRequired,
  itemHeight: PropTypes.number.isRequired,
  items: PropTypes.array.isRequired,
  current: PropTypes.number
};

const formatDuration = (amount) => {
  let sec_num = parseInt(amount, 10);
  let hours   = Math.floor(sec_num / 3600);
  let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  let seconds = sec_num - (hours * 3600) - (minutes * 60);

  //if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}

  return minutes + ':' + seconds;
};

export default VirtualList()(QueueList);
