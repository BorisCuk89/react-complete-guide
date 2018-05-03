import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {
  state = {
    persons: [
      { id: '00', name: 'Max', age: 28 },
      { id: '01', name: 'Jane', age: 38 },
      { id: '02', name: 'Tijana', age: 18 }
    ],
    otherState: 'some other value',
    showPerson: false
  };

  nameChangedHandler = (event, id) => {
    // Search person with that ID
    const personIndex = this.state.persons.findIndex(p => {
      // Compering person.id from state with id that we recive from OnChaange 
      // metod
      return p.id === id;
    });

    // Copy perosnIndex array
    const person = {
      ...this.state.persons[personIndex]
    };

    // Update person name with value from input in person.js
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    // Updating array
    this.setState({ persons: persons });

  };

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons;
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPerson;
    this.setState({ showPerson: !doesShow });
  };

  render() {

    let persons = null;

    if (this.state.showPerson) {
      persons = <Persons
        persons={this.state.persons}
        clicked={this.deletePersonHandler}
        changed={this.nameChangedHandler} />;
    }

    return (
      <div className={classes.App}>
        <Cockpit
          appTitle={this.props.title}
          showPerson={this.state.showPerson}
          persons={this.state.persons}
          clicked={this.togglePersonsHandler} />
        {persons}
      </div>
    );
  }
}

export default App;
