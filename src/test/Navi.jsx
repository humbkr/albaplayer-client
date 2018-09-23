import React from 'react'
import styled from 'styled-components'

const Column = styled.div`
  height: 303px;
  width: 102px;
  border: 1px solid black;
  float: left;
`

const StyledElement = styled.div`
  height: 100px;
  width: 100px;
  //float: left;
  border: 1px solid white;
  background-color: #eeeeee;

  :hover {
    background-color: #4393e6;
  }
  //:focus {
  //  background-color: cadetblue;
  //}

  ${props => (props.selected ? 'background-color: #4393e6' : '')};
`

const Element = (props) => {
  const selected = props.active === parseInt(props.id, 10)

  return (
    <StyledElement selected={selected} {...props} tabIndex={props.id}>
      {props.children}
    </StyledElement>
  )
}

class Navi extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      columnA: 1,
      columnB: 1,
      columnC: 1,
    }

    this.columnA = React.createRef()
    this.columnB = React.createRef()
    this.columnC = React.createRef()
  }

  handleOnClickA = (e) => {
    this.setState({ columnA: parseInt(e.target.id, 10) })
  }

  handleOnClickB = (e) => {
    this.setState({ columnB: parseInt(e.target.id, 10) })
  }

  handleOnClickC = (e) => {
    this.setState({ columnC: parseInt(e.target.id, 10) })
  }

  handleKeyA = (e) => {
    if (e.keyCode === 38 && parseInt(this.state.columnA, 10) - 1 >= 1) {
      this.setState(prevState => ({
        columnA: parseInt(prevState.columnA, 10) - 1,
      }))
    } else if (e.keyCode === 40 && parseInt(this.state.columnA, 10) + 1 <= 3) {
      this.setState(prevState => ({
        columnA: parseInt(prevState.columnA, 10) + 1,
      }))
    }
  }

  handleKeyB = (e) => {
    if (e.keyCode === 38 && parseInt(this.state.columnB, 10) - 1 >= 1) {
      this.setState(prevState => ({
        columnB: parseInt(prevState.columnB, 10) - 1,
      }))
    } else if (e.keyCode === 40 && parseInt(this.state.columnB, 10) + 1 <= 3) {
      this.setState(prevState => ({
        columnB: parseInt(prevState.columnB, 10) + 1,
      }))
    }
  }

  handleKeyC = (e) => {
    if (e.keyCode === 38 && parseInt(this.state.columnC, 10) - 1 >= 1) {
      this.setState(prevState => ({
        columnC: parseInt(prevState.columnC, 10) - 1,
      }))
    } else if (e.keyCode === 40 && parseInt(this.state.columnC, 10) + 1 <= 3) {
      this.setState(prevState => ({
        columnC: parseInt(prevState.columnC, 10) + 1,
      }))
    }
  }

  handleKeyColumnA = (e) => {
    if (e.keyCode === 39) {
      this.columnB.current.firstChild.focus()
    }
  }

  handleKeyColumnB = (e) => {
    if (e.keyCode === 37) {
      this.columnA.current.firstChild.focus()
    } else if (e.keyCode === 39) {
      this.columnC.current.firstChild.focus()
    }
  }

  handleKeyColumnC = (e) => {
    if (e.keyCode === 37) {
      this.columnB.current.firstChild.focus()
    }
  }

  render() {
    return (
      <div>
        <Column
          ref={this.columnA}
          tabIndex="0"
          onKeyDown={this.handleKeyColumnA}
        >
          <Element
            id="1"
            active={this.state.columnA}
            onClick={this.handleOnClickA}
            onKeyDown={this.handleKeyA}
          >
            1
          </Element>
          <Element
            id="2"
            active={this.state.columnA}
            onClick={this.handleOnClickA}
            onKeyDown={this.handleKeyA}
          >
            2
          </Element>
          <Element
            id="3"
            active={this.state.columnA}
            onClick={this.handleOnClickA}
            onKeyDown={this.handleKeyA}
          >
            3
          </Element>
        </Column>
        <Column
          ref={this.columnB}
          tabIndex="0"
          onKeyDown={this.handleKeyColumnB}
        >
          <Element
            id="1"
            active={this.state.columnB}
            onClick={this.handleOnClickB}
            onKeyDown={this.handleKeyB}
          >
            4
          </Element>
          <Element
            id="2"
            active={this.state.columnB}
            onClick={this.handleOnClickB}
            onKeyDown={this.handleKeyB}
          >
            5
          </Element>
          <Element
            id="3"
            active={this.state.columnB}
            onClick={this.handleOnClickB}
            onKeyDown={this.handleKeyB}
          >
            6
          </Element>
        </Column>
        <Column
          ref={this.columnC}
          tabIndex="0"
          onKeyDown={this.handleKeyColumnC}
        >
          <Element
            id="1"
            active={this.state.columnC}
            onClick={this.handleOnClickC}
            onKeyDown={this.handleKeyC}
          >
            7
          </Element>
          <Element
            id="2"
            active={this.state.columnC}
            onClick={this.handleOnClickC}
            onKeyDown={this.handleKeyC}
          >
            8
          </Element>
          <Element
            id="3"
            active={this.state.columnC}
            onClick={this.handleOnClickC}
            onKeyDown={this.handleKeyC}
          >
            9
          </Element>
        </Column>
      </div>
    )
  }
}

export default Navi
