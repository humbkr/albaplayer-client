import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import SelectContainer from 'common/components/SelectContainer'

const LibraryBrowserListHeader = (props) => {
  const {
    orderByOptions, orderBy, title, onChange,
  } = props

  return (
    <LibraryBrowserListHeaderWrapper>
      <ContentWrapper>
        <h2>{title}</h2>
        <SelectContainer
          tabIndex="-1"
          options={orderByOptions}
          value={orderBy}
          onChangeHandler={onChange}
        />
      </ContentWrapper>
    </LibraryBrowserListHeaderWrapper>
  )
}
LibraryBrowserListHeader.propTypes = {
  title: PropTypes.string,
  orderBy: PropTypes.string.isRequired,
  orderByOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
}
LibraryBrowserListHeader.defaultProps = {
  title: '',
}

export default LibraryBrowserListHeader

const LibraryBrowserListHeaderWrapper = styled.div`
  flex: 0 1 ${(props) => props.theme.itemHeight};
  color: ${(props) => props.theme.textSecondaryColor};
  padding: 0 15px;
`

const ContentWrapper = styled.div`
  display: table;
  width: 100%;
  height: 100%;

  > h2 {
    display: table-cell;
    vertical-align: middle;
    font-size: 1.2em;
  }

  > div {
    display: table-cell;
    vertical-align: middle;
  }
`
