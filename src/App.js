import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

class App extends Component {
  state = { cards: [], value: '' }

  componentDidMount() {
    axios.get('https://api.magicthegathering.io/v1/cards')
      .then( res => {
        this.setState({ cards: res.data.cards })
      })
      .catch ( err => {
        console.log(err)
        // throw error
      })
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  search = () => {
    const { cards, value } = this.state
    return cards.filter( card => {
      const regex = new RegExp(value, 'gi')
      return card.name.match(regex)
    })
  }

  displayMatches = () => {
    const matchArray = this.search()
    return matchArray.map( card =>
      <Column lg={4} key={card.id}>
        <Card>
          <CardName>{ card.name }</CardName>
          <br />
          <img src={card.imageUrl} />
        </Card>
      </Column>
    )
  }

  render() {
    return (
      <div>
        <h1>MTG Search</h1>
        <input name="value" onChange={this.handleChange} />
        <Wrapper>
          { this.displayMatches() }
        </Wrapper>
      </div>
    );
  }
}

const Wrapper = styled.div`
 &::after {
  content: '';
  clear: both;
  display: table;
 }
`

const CardName = styled.h2`
  color: #ebffaf;
`

function getWidthString(span) {
  if (!span) return;

  let width = span / 12 * 100;
  return `width: ${width}%;`;
}

const Column = styled.div`
  float: left;
  ${({ xs }) => (xs ? getWidthString(xs) : "width: 100%")};

  @media only screen and (min-width: 768px) {
    ${({ sm }) => sm && getWidthString(sm)};
  }

  @media only screen and (min-width: 992px) {
    ${({ md }) => md && getWidthString(md)};
  }

  @media only screen and (min-width: 1200px) {
    ${({ lg }) => lg && getWidthString(lg)};
  }
`

const Card = styled.section`
  padding: 4em;
  border: 1px solid black;
  background: #87c67d;
`

export default App;

