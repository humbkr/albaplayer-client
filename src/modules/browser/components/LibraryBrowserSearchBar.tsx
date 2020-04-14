import React, { forwardRef, FunctionComponent, Ref } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { DebounceInput } from 'react-debounce-input'
import { search } from 'modules/browser/redux'
import { RootState } from 'store/types'

const LibraryBrowserSearchBar: FunctionComponent<{
  forwardedRef: Ref<HTMLElement>
}> = ({ forwardedRef }) => {
  const searchTerm = useSelector(
    (state: RootState) => state.libraryBrowser.search.term
  )
  const dispatch = useDispatch()

  return (
    <LibraryBrowserSearchBarWrapper>
      <SearchBarInputWrapper>
        <SearchBarInput
          inputRef={forwardedRef}
          debounceTimeout={300}
          onChange={(event) => dispatch(search((event.target as HTMLInputElement).value))}
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

export default forwardRef<HTMLElement>((props, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
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
const SearchBarInput = styled(DebounceInput)<{
  id: string
  autoComplete: string
}>`
  height: 100%;
  width: 100%;
  font-size: 1em;
  padding-left: 10px;
  background-color: ${(props) => props.theme.inputs.backgroundColor};
  border: 1px solid rgb(211, 211, 211);
`
