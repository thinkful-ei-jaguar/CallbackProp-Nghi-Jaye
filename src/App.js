import React, { Component } from 'react';
import List from './List'
import './App.css';

class App extends Component {
  state = {
    lists: [
      {
        id: '1',
        header: 'First list',
        cardIds: [ 'a', 'b', 'e', 'f', 'g', 'j', 'l', 'm' ],
      },
      {
        id: '2',
        header: 'Second list',
        cardIds: ['b', 'c', 'd', 'f', 'h', 'i', 'k'],
      },
      {
        id: '3',
        header: 'Third list',
        cardIds: [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm' ],
      },
      {
        id: '4',
        header: 'Fourth list',
        cardIds: [ 'l', 'm' ],
      },
    ],
    allCards: {
      'a': { id: 'a', title: 'First card', content: 'lorem ipsum' },
      'b': { id: 'b', title: 'Second card', content: 'lorem ipsum' },
      'c': { id: 'c', title: 'Third card', content: 'lorem ipsum' },
      'd': { id: 'd', title: 'Fourth card', content: 'lorem ipsum' },
      'e': { id: 'e', title: 'Fifth card', content: 'lorem ipsum' },
      'f': { id: 'f', title: 'Sixth card', content: 'lorem ipsum' },
      'g': { id: 'g', title: 'Seventh card', content: 'lorem ipsum' },
      'h': { id: 'h', title: 'Eighth card', content: 'lorem ipsum' },
      'i': { id: 'i', title: 'Ninth card', content: 'lorem ipsum' },
      'j': { id: 'j', title: 'Tenth card', content: 'lorem ipsum' },
      'k': { id: 'k', title: 'Eleventh card', content: 'lorem ipsum' },
      'l': { id: 'l', title: 'Twelfth card', content: 'lorem ipsum' },
      'm': { id: 'm', title: 'Thirteenth card', content: 'lorem ipsum' },
    }
  };

  handleDeleteItem = (id) => {
    let newLists = [];
    // Loops through each object in lists to filter out cardIds
    for(let i = 0; i < this.state.lists.length; i++) {
      let newCardIds = this.state.lists[i].cardIds.filter(card => 
        card !== id 
      );
      // Create a new filtered object to push to lists
      let list = {
        id: this.state.lists[i].id,
        header: this.state.lists[i].header,
        cardIds: newCardIds
      };
      newLists.push(list);
    }
    // Update lists
    this.setState({
      lists: newLists
    })
  }


  // Generate a new random card
  newRandomCard = () => {
    const id = Math.random().toString(36).substring(2, 4)
    + Math.random().toString(36).substring(2, 4);
    return {
    id,
    title: `Random Card ${id}`,
    content: 'lorem ipsum'
    }
  }

  handleAddItem = (index) => {
    const newItem = this.newRandomCard();
    console.log(newItem);
    const newCardIds = this.state.lists[index].cardIds.push(newItem.id);
    const newAllCards = this.state.allCards;
    console.log(newAllCards);
    // Created new key value pair in all cards
    newAllCards[newItem.id] = newItem;
    this.setState({
      lists: this.state.lists.map(list => ({...list, cardIds: newCardIds})),
      allCards: newAllCards
    });
  }


  render() {
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {this.state.lists.map(list => (
            <List
              id={list.id}
              key={list.id}
              header={list.header}
              cards={list.cardIds.map(id => this.state.allCards[id])}
              delete={this.handleDeleteItem}
              add={this.handleAddItem}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
