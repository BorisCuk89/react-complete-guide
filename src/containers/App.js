import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

import withClass from '../hoc/withClass';
import Aux from '../hoc/Aux';

export const AuthContext = React.createContext(false);

class App extends Component {

  constructor(props) {
    super(props);
    console.log('[App.js] Inside Constructor', props);
    // this.state = {
    //   persons: [
    //     { id: '00', name: 'Max', age: 28 },
    //     { id: '01', name: 'Jane', age: 38 },
    //     { id: '02', name: 'Tijana', age: 18 }
    //   ],
    //   otherState: 'some other value',
    //   showPerson: false
    // };
  }

  componentWillMount() {
    console.log('[App.js] Inside componentWillMount()');
  }

  componentDidMount() {
    console.log('[App.js] Inside componentDidMount()');
  };

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[UPDATE App.js] Inside shouldComponentUpdate', nextProps, nextState);
    return nextState.persons !== this.state.persons ||
      nextState.showPerson !== this.state.showPerson;
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('[UPDATE App.js] Inside componentWillUpdate', nextProps, nextState);
  }

  componentDidUpdate() {
    console.log('[UPDATE App.js] Inside componentDidUpdate');
  }

  state = {
    persons: [
      { id: '00', name: 'Max', age: 28 },
      { id: '01', name: 'Jane', age: 38 },
      { id: '02', name: 'Tijana', age: 18 }
    ],
    otherState: 'some other value',
    showPerson: false,
    toggleClicked: 0,
    authenticated: false
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
    this.setState((prevState, props) => {
      return {
        showPerson: !doesShow,
        toggleClicked: prevState.toggleClicked + 1
      }
    });
  };

  loginHandler = () => {
    this.setState({ authenticated: true });
  }

  render() {

    console.log('[App.js] Inside Render');

    let persons = null;

    if (this.state.showPerson) {
      persons = <Persons
        persons={this.state.persons}
        clicked={this.deletePersonHandler}
        changed={this.nameChangedHandler} />;
    }

    return (
      <Aux>
        <button onClick={() => { this.setState({ showPerson: true }) }}>Show Person</button>
        <Cockpit
          appTitle={this.props.title}
          showPerson={this.state.showPerson}
          persons={this.state.persons}
          login={this.loginHandler}
          clicked={this.togglePersonsHandler} />
        <AuthContext.Provider value={this.state.authenticated}>
          {persons}
        </AuthContext.Provider>
      </Aux>
    );
  }
}

export default withClass(App, classes.App);
