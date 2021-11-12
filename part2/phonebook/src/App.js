import { useState, useEffect } from 'react';
// Services
import personsServices from './services/persons';
// Components
import { Filter } from './components/Filter';
import { PersonForm } from './components/PersonForm';
import { Persons } from './components/Persons';
import Notification from './components/Notification';

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleChangeName = (event) => setNewName(event.target.value);
  const handleChangeNumber = (event) => setNewNumber(event.target.value);
  const handleChangeSearch = (event) => setSearch(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    const objNewPerson = {
      name: newName,
      number: newNumber
    }
    const existPerson = persons.some(person => person.name === objNewPerson.name);

    if (existPerson) {
      // alert(`${objNewName.name} is already added to phonebook`);
      const personExist = persons.find(person => person.name === objNewPerson.name);
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one`)) {
        personsServices.update(personExist.id, objNewPerson)
          .then(returnedPerson => {
            setMessage(`Added ${objNewPerson.name}`);
            setIsError(false);
            setTimeout(() => {
              setMessage(null);
            }, 2000);
            setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person));
            setNewName('');
            setNewNumber('');
          })
          .catch(error => {
            setMessage(`Information of ${objNewPerson.name} has already been removed from server`);
            setIsError(true);
            setTimeout(() => {
              setMessage(null);
            }, 2000);
            setPersons(persons.filter(person => person.id !== personExist.id));
            setNewName('');
            setNewNumber('');
          }) 
      }
    } else {
      personsServices.create(objNewPerson)
        .then(returnedPerson => {
          setIsError(false);
          setMessage(`Added ${objNewPerson.name}`);
          setTimeout(() => {
            setMessage(null);
          }, 2000);
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
        });
    }
  }

  const handleClickDelete = (personId, personName) => {
    if (window.confirm(`Delete ${personName}`)) {
      personsServices.deletePerson(personId)
        .then(status => {
          if (status === 'OK') {
            setPersons(persons.filter(person => person.id !== personId));
          }
        });
    }
  }

  useEffect(() => {
    personsServices.getAll()
      .then(initialPersons => setPersons(initialPersons));
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isError={isError} />
      <Filter search={search} handleChangeSearch={handleChangeSearch} />
      <h3>Add a New</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
        handleSubmit={handleSubmit}
      />
      <h3>Numbers</h3>
      <div>
        <Persons
          persons={persons}
          search={search}
          handleClickDelete={handleClickDelete}
        />
      </div>
    </div>
  )
}

export default App;
