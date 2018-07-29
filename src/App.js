import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

class App extends Component {
  state = { cards: [], value: '' }

  componentDidMount() {
    axios.get('https://api.magicthegathering.io/v1/cards')
      .then( res => {
        this.setState({ cards: res.data })
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
    const regex = new RegExp(value, 'gi')
    return cards.filter( card =>
      return card.match(regex)
    )
  }

  displayMatches = () => {
    const matchArray = this.search()
    return matchArray.map( card =>
      <li>{ card.name }</li>
    )
  }

  render() {
    return (
      <div>
        <h1>MTG Search</h1>
        <input name="value" onChange={this.handleChange} />
        <ul>
          { this.displayMatches() }
        </ul>
      </div>
    );
  }
}

export default App;

