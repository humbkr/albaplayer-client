import React, { Component } from "react"
import styled from "styled-components"
import PropTypes from 'prop-types'
import SelectContainer from "../../common/SelectContainer"

const LibraryBrowserListHeaderWrapper = styled.div`
  display: table;
  height: ${props => props.theme.itemHeight};
  width: 100%;
  color: ${props => props.theme.textSecondaryColor};

  > h2 {
    display: table-cell;
    vertical-align: middle;
    font-size: 1.2em;
    padding-left: 15px;
  }
  
  > div {
    display: table-cell;
    vertical-align: middle;
  }
`;

class LibraryBrowserListHeader extends Component {
  render() {
    const orderByOptions = this.props.orderByOptions;
    const orderBy = this.props.orderBy;
    const title = this.props.title;
    const onSortChangeHandler = this.props.onChange;

    return (
      <LibraryBrowserListHeaderWrapper>
        <h2>{title}</h2>
        <SelectContainer
          label="order by:"
          options={orderByOptions}
          value={orderBy}
          onChangeHandler={onSortChangeHandler}
        />
      </LibraryBrowserListHeaderWrapper>
    );
  }
}
LibraryBrowserListHeader.propTypes = {
  title: PropTypes.string,
  orderBy: PropTypes.string.isRequired,
  orderByOptions: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};

export default LibraryBrowserListHeader
