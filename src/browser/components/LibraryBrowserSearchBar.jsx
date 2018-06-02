import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { libraryBrowserSearch } from '../actions';


const LibraryBrowserSearchBarWrapper = styled.div`
  display: table;
  height: ${props => props.theme.itemHeight};
  width: 100%;
  border-bottom: 1px solid ${props => props.theme.separatorColor};
`;

const SearchBarInputWrapper = styled.div`
  display: table-cell;
  vertical-align: middle;
  padding: 8px;
  background-color: rgba(0, 0, 0, .65);
`;

const SearchBarInput = styled.input`
  height: 100%;
  width: 100%;
  font-size: 1em;
  padding-left: 10px;
`;

const LibraryBrowserSearchBar = (props) => {
  const { searchTerm, onChange} = props;

  return (
    <LibraryBrowserSearchBarWrapper>
      <SearchBarInputWrapper>
        <SearchBarInput onChange={event => onChange(event.target.value)} type="text" id="search-input" value={searchTerm} placeholder="Search" />
      </SearchBarInputWrapper>
    </LibraryBrowserSearchBarWrapper>
  );
};
LibraryBrowserSearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    searchTerm: state.libraryBrowser.search,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onChange: (text) => {
      dispatch(libraryBrowserSearch(text));
    },
  }
);


export default connect(mapStateToProps, mapDispatchToProps)(LibraryBrowserSearchBar);
