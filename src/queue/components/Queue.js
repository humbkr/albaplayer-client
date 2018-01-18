import React from "react"
import { connect } from "react-redux"
import PropTypes from 'prop-types'
import QueueHeader from './QueueHeader'
import QueueList from './QueueList'
import { withTheme } from 'styled-components'


const Queue = (props) => {
  const tracks = props.tracks;

  // Add a position info to each playlist element.
  const items = tracks.map((item, index) => (
    {...item, position: index + 1}
  ));

  return (
    <div>
      <QueueHeader/>
      <QueueList
        items={items}
        itemHeight={parseInt(props.theme.itemHeight, 0)}
        current={props.current}
      />
    </div>
  )
};

Queue.propTypes = {
  tracks: PropTypes.array.isRequired,
  current: PropTypes.number
};

const mapStateToProps = state => {
  return {
    tracks: state.queue.tracks,
    current: state.queue.current
  }
};


export default connect(
  mapStateToProps
)(withTheme(Queue));
