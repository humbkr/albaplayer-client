import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { DebounceInput } from 'react-debounce-input'
import { actions } from '../duck'

const LibraryBrowserSearchBarWrapper = styled.div`
  display: table;
  height: ${(props) => props.theme.itemHeight};
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.separatorColor};
`

const SearchBarInputWrapper = styled.div`
  display: table-cell;
  vertical-align: middle;
  padding: 8px;
  background-color: ${(props) => props.theme.highlight};

  :focus-within {
    background-color: ${(props) => props.theme.highlightFocus};
  }
`

const SearchBarInput = styled(DebounceInput)`
  height: 100%;
  width: 100%;
  font-size: 1em;
  padding-left: 10px;
`

const LibraryBrowserSearchBar = (props) => {
  const { searchTerm, onChange, forwardedRef } = props

  return (
    <LibraryBrowserSearchBarWrapper>
      <SearchBarInputWrapper>
        <SearchBarInput
          ref={forwardedRef}
          debounceTimeout={300}
          onChange={(event) => onChange(event.target.value)}
          type="text"
          id="search-input"
          value={searchTerm}
          placeholder="Search"
        />
      </SearchBarInputWrapper>
    </LibraryBrowserSearchBarWrapper>
  )
}
LibraryBrowserSearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  searchTerm: state.libraryBrowser.search.term,
})

const mapDispatchToProps = (dispatch) => ({
  onChange: (text) => {
    dispatch(actions.libraryBrowserSearch(text))
  },
})

const ConnectedLibraryBrowserSearchBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(LibraryBrowserSearchBar)

export default React.forwardRef((props, ref) => (
  <ConnectedLibraryBrowserSearchBar {...props} forwardedRef={ref} />
))