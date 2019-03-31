import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import selectArrow from '../../../common/assets/images/select_arrow.png'

const SelectList = (props) => {
  const {
    value, onChangeHandler, options, tabIndex,
  } = props
  const optionsHtml = options.map((option) => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ))

  return (
    <Select
      tabIndex={tabIndex}
      id="select"
      value={value}
      onChange={onChangeHandler}
    >
      {optionsHtml}
    </Select>
  )
}
SelectList.propTypes = {
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
SelectList.defaultProps = {
  tabIndex: null,
}

export default SelectList

const Select = styled.select`
  appearance: none;
  background-color: transparent;
  font-size: 1em;
  color: ${(props) => props.theme.buttons.color};
  border: 1px solid ${(props) => props.theme.buttons.color};
  border-radius: 2px;
  padding: 6px ${(props) => props.theme.buttons.sidePadding};
  min-width: 250px;
  background: url(${selectArrow}) no-repeat right
    ${(props) => props.theme.buttons.sidePadding} center;
  background-size: 12px;

  :hover {
    cursor: pointer;
  }
`
