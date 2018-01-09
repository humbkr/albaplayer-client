import React from 'react';
import PropTypes from 'prop-types';

class SongInfo extends React.PureComponent {
  static propTypes = {
    songImageSrc: PropTypes.string.isRequired
  };
  static defaultProps = {
    songImageSrc: ''
  };

  render() {
    const {
      songImageSrc
    } = this.props;

    return (
      <div>
        <img style={{width: '100%'}}
          src={songImageSrc}
          alt="Song cover"
        />
      </div>
    );
  }
}

export default SongInfo;
