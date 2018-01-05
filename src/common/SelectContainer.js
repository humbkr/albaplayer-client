import PropTypes from "prop-types";
import styled from "styled-components";
import React, { Component } from "react";

const Select = styled.select`
  border: none;
  background-color: transparent;
  font-weight: bold;
  font-size: 1em;
  text-align-last: center;
  
  :hover {
    cursor: pointer;
  }
`;

const SelectWrapper = styled.div`

 
`;

class SelectContainer extends Component {
  render() {
    const defaultValue = this.props.value;
    const onChangeHandler = this.props.onChangeHandler;
    const optionsRaw = this.props.options;
    const options = optionsRaw.map((option) => {
      return (<option key={option.value} value={option.value}>{option.label}</option>);
    });

    return (
      <SelectWrapper>
        <label htmlFor="select">order by:</label>
        <Select id="select" value={defaultValue} onChange={onChangeHandler}>
          {options}
        </Select>
      </SelectWrapper>
    );
  };
}
SelectContainer.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  })).isRequired,
  value: PropTypes.string,
  onChangeHandler: PropTypes.func.isRequired,
};

export default SelectContainer
