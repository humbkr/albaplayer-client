import React, { forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { DebounceInput } from 'react-debounce-input'
import { actions } from '../duck'

const LibraryBrowserSearchBar = ({ forwardedRef }) => {
  const searchTerm = useSelector((state) => state.libraryBrowser.search.term)
  const dispatch = useDispatch()

  return (
    <LibraryBrowserSearchBarWrapper>
      <SearchBarInputWrapper>
        <SearchBarInput
          inputRef={forwardedRef}
          debounceTimeout={300}
          onChange={(event) => dispatch(actions.libraryBrowserSearch(event.target.value))}
          type="text"
          id="search-input"
          value={searchTerm}
          placeholder="Search"
          autoComplete="off"
        />
      </SearchBarInputWrapper>
    </LibraryBrowserSearchBarWrapper>
  )
}
LibraryBrowserSearchBar.propTypes = {
  forwardedRef: PropTypes.shape().isRequired,
}

export default forwardRef((props, ref) => (
  <LibraryBrowserSearchBar {...props} forwardedRef={ref} />
))

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
  background-color: ${(props) => props.theme.inputs.backgroundColor};
  border: 1px solid rgb(211, 211, 211);
`
