import styled from "styled-components"

const LibraryBrowserListItem = styled.div`
  width: 100%;
  ${props => props.border ? 'border-top: 1px solid ' + props.theme.separatorColor : ''};
  
  // The items MUST ALWAYS have a fixed height for the list to work.
  height: ${props => props.theme.itemHeight};
  overflow-y: hidden;
  
  :hover {
    background-color: ${props => props.theme.highlight};
  }
  
  > * {
    display: block;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export default LibraryBrowserListItem
