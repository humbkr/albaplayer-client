import styled from 'styled-components'

export default styled.div`
  width: 100%;
  ${(props) => props.border
    ? `border-bottom: 1px solid ${props.theme.separatorColor}`
    : ''};

  // The items MUST ALWAYS have a fixed height for the list to work.
  height: ${(props) => props.theme.itemHeight};
  overflow: hidden;
  background-color: ${(props) => props.theme.backgroundColor};

  :hover {
    background-color: ${(props) => props.theme.highlight};
  }

  ${(props) => props.selected ? `background-color: ${props.theme.highlight}` : ''};
`
