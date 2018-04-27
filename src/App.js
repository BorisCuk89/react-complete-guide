import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person';

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
    this.setState( {persons: persons} );

  };

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons;
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPerson;
    this.setState({showPerson: !doesShow});
  };
  
  render() {

    let persons = null;
    let btnClass = '';

    if (this.state.showPerson) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person 
            click={() => this.deletePersonHandler(index)}
            name={person.name} 
            age={person.age}
            key={person.id}
            changed={(event) => this.nameChangedHandler(event, person.id)} />
          })}
        </div>
      );
      
      btnClass = classes.Red;
    }

    const assignedClasses = [];
    if (this.state.persons.length <= 2) {
      assignedClasses.push( classes.red ); // classses = ['red', 'bold']
    }
    if (this.state.persons.length <= 1) {
      assignedClasses.push( classes.bold ); // classes = ['red', 'bold']
    }

    return (
      <div className={classes.App}>
        <h1>Hi, I'm a React App</h1>
        <p className={assignedClasses.join(' ')}>This is really working!</p>
        <button
          className={btnClass} 
          onClick={this.togglePersonsHandler}>Toggle Persons</button>
          {persons}
      </div>
    );
  }
}

export default App;
