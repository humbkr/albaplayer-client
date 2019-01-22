import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PlaylistDetailPane from '../components/PlaylistDetailsPane'
import PlaylistListPane from '../components/PlaylistListPane'
import { actions } from '../duck'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`
class Playlists extends React.Component {
  render() {
    const {
      selected, items, selectPlaylist, addPlaylist,
    } = this.props

    return (
      <Wrapper>
        <PlaylistListPane
          items={items}
          selected={selected}
          onClick={selectPlaylist}
          onAddPlaylist={addPlaylist}
        />
        <PlaylistDetailPane item={selected} />
      </Wrapper>
    )
  }
}
Playlists.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape).isRequired,
  selected: PropTypes.objectOf(PropTypes.shape),
  selectPlaylist: PropTypes.func.isRequired,
  addPlaylist: PropTypes.func.isRequired,
}
Playlists.defaultProps = {
  selected: null,
}

const mapStateToProps = (state) => ({
  selected: state.playlist.selected,
  items: state.playlist.list,
})
const mapDispatchToProps = (dispatch) => ({
  selectPlaylist: (playlist) => {
    dispatch(actions.playlistSelectPlaylist(playlist))
  },
  addPlaylist: (title) => {
    dispatch(actions.playlistAddPlaylist(title))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Playlists)
