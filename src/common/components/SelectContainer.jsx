import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Select = styled.select`
  border: none;
  background-color: transparent;
  font-weight: bold;
  font-size: 1em;
  text-align-last: center;

  :hover {
    cursor: pointer;
  }
`

const SelectWrapper = styled.div`
  text-align: right;
`

const SelectContainer = (props) => {
  const {
    value, onChangeHandler, options, tabIndex,
  } = props
  const optionsHtml = options.map(option => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ))

  return (
    <SelectWrapper>
      <Select
        tabIndex={tabIndex}
        id="select"
        value={value}
        onChange={onChangeHandler}
      >
        {optionsHtml}
      </Select>
    </SelectWrapper>
  )
}
SelectContainer.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    })
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  tabIndex: PropTypes.string,
}
SelectContainer.defaultProps = {
  tabIndex: null,
}

export default SelectContainer
