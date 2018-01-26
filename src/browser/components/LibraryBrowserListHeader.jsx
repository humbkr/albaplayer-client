import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SelectContainer from '../../common/SelectContainer';

const LibraryBrowserListHeaderWrapper = styled.div`
  display: table;
  height: ${props => props.theme.itemHeight};
  width: 100%;
  color: ${props => props.theme.textSecondaryColor};
  padding: 0 15px;

  > h2 {
    display: table-cell;
    vertical-align: middle;
    font-size: 1.2em;
  }
  
  > div {
    display: table-cell;
    vertical-align: middle;
  }
`;

const LibraryBrowserListHeader = (props) => {
  const {
    orderByOptions,
    orderBy,
    title,
    onChange
  } = props;

  return (
    <LibraryBrowserListHeaderWrapper>
      <h2>{title}</h2>
      <SelectContainer
        options={orderByOptions}
        value={orderBy}
        onChangeHandler={onChange}
      />
    </LibraryBrowserListHeaderWrapper>
  );
};
LibraryBrowserListHeader.propTypes = {
  title: PropTypes.string,
  orderBy: PropTypes.string.isRequired,
  orderByOptions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
};
LibraryBrowserListHeader.defaultProps = {
  title: '',
};


export default LibraryBrowserListHeader;
