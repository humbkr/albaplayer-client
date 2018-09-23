import React from 'react'
import styled from 'styled-components'
import { AutoSizer, ArrowKeyStepper, List } from 'react-virtualized'

const Wrapper = styled.div`
  height: 100vh;
  width: 300px;
  background-color: #4db6ac;
`

const SubWrapper = styled.div`
  height: 100vh;
`

const ListItem = styled.div`
  height: 50px;
  background-color: #bdbdbd;
  border-bottom: 1px solid #111111;

  ${props => (props.selected ? 'background-color: #666633' : '')};

  :hover {
    background-color: #666666;
  }
`

class Navi extends React.Component {
  constructor(props) {
    super(props)

    const items = []
    for (let i = 1; i <= 30; i++) {
      items.push({ id: i, text: `Item ${i}` })
    }

    this.state = {
      scrollToRow: 0,
      items,
    }
  }

  selectRow = ({ scrollToRow }) => {
    this.setState({
      ...this.state,
      scrollToRow,
    })
  }

  // Magic function used by react-virtualized.
  rowRenderer = ({
    items, scrollToRow, key, index, style,
  }) => {
    const selected = { selected: index === scrollToRow }

    return (
      <ListItem
        key={key}
        style={style}
        {...selected}
        onClick={() => this.selectRow({ scrollToRow: index })}
      >
        {items[index].text}
      </ListItem>
    )
  }

  render() {
    const { scrollToRow, items } = this.state

    return (
      <Wrapper>
        <ArrowKeyStepper
          columnCount={1}
          rowCount={items.length}
          mode="cells"
          isControlled
          onScrollToChange={this.selectRow}
          scrollToRow={scrollToRow}
        >
          {({ onSectionRendered, scrollToRow }) => (
            <SubWrapper>
              <AutoSizer>
                {({ height, width }) => (
                  <List
                    width={width}
                    height={height}
                    rowHeight={50}
                    rowCount={items.length}
                    rowRenderer={({ key, index, style }) => this.rowRenderer({
                      items,
                      scrollToRow,
                      key,
                      index,
                      style,
                    })
                    }
                    onRowsRendered={({ startIndex, stopIndex }) => {
                      onSectionRendered({
                        rowStartIndex: startIndex,
                        rowStopIndex: stopIndex,
                      })
                    }}
                    scrollToIndex={scrollToRow}
                  />
                )}
              </AutoSizer>
            </SubWrapper>
          )}
        </ArrowKeyStepper>
      </Wrapper>
    )
  }
}

export default Navi
