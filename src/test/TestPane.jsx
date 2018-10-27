import React from 'react'
import styled from 'styled-components'
import WindowScroller from 'react-virtualized/dist/es/WindowScroller/WindowScroller'
import { List } from 'react-virtualized'
import NowPlayingQueueItem from '../now_playing/NowPlayingQueueItem'

const ListItem = styled.div`
  width: 1000px;
  height: 50px;
  border-bottom: 1px solid black;
`

const TestHeader = styled.div`
  width: 100%;
  height: 300px;
  background-color: #4393e6;
`

const TestListWrapper = styled.div`
  padding: 50px;
`

class TestList extends React.Component {
  constructor(props) {
    super(props)

    this.state = { items: [] }
    for (let i = 1; i <= 50; i++) {
      this.state.items.push({ title: `Item ${i}`, position: i, id: i })
    }
  }

  // Magic function used by react-virtualized.
  rowRenderer = ({
    items, key, index, style,
  }) => (
    <NowPlayingQueueItem
      item={items[index]}
      index={index}
      key={key}
      style={style}
      itemHeight={50}
      current={false}
    />
  )

  render() {
    const items = this.state.items
    return (
      <TestListWrapper>
        <WindowScroller>
          {({
            height, isScrolling, onChildScroll, scrollTop,
          }) => (
            <List
              autoHeight
              height={height}
              isScrolling={isScrolling}
              onScroll={onChildScroll}
              rowCount={items.length}
              rowHeight={50}
              rowRenderer={({ key, index, style }) => this.rowRenderer({
                items,
                key,
                index,
                style,
              })
              }
              scrollTop={scrollTop}
              width={1000}
            />
          )}
        </WindowScroller>
      </TestListWrapper>
    )
  }
}

const TestPane = () => (
  <React.Fragment>
    <TestList />
  </React.Fragment>
)

export default TestPane
