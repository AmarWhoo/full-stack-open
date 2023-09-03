import { useState, useEffect } from 'react'
import NumbersList from './components/NumbersList'
import Search from './components/Search'
import AddContact from './components/AddContact'
import phonebookService from './services/PhonebookService'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')

  // Get request for fetching person info from the server
  const hook = () => {
    phonebookService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }

  // Effect hook
  useEffect(hook, [])

  // Info typing handlers
  const handleName = (event) => setNewName(event.target.value)
  const handleNumber = (event) => setNewNumber(event.target.value)
  const handleFilter = (event) => setFilterValue(event.target.value.toLowerCase())
  
  // Submit person to phonebook handler
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    const hasDuplicate = persons.some( person => person.name === personObject.name )

    // If a duplicate name is entered, ask the user if they wish to replace the existing number and the newly added number.
    // If yes, update both on the page and server
    if (hasDuplicate) {
      if (window.confirm(`${personObject.name} is already added to the phonebook. Replace the old number with a new one?`)) {
        const duplicate = persons.find(person => person.name === personObject.name)
        phonebookService
          .update(duplicate.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== duplicate.id ? person : returnedPerson ))
          })
      }
      setNewName('')
      setNewNumber('')
      return
    }

    // Post request to send the newly added person to server
    phonebookService
    .add(personObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })
  }

  // Remove the chosen person from the phonebook and the server
  const removeContact = (id) => {
    const chosenPerson = persons.find(person => person.id === id)

    if (window.confirm(`Delete ${chosenPerson.name}`)) {
      phonebookService
        .remove(chosenPerson.id)
        .then(() => {
          setPersons(persons.filter(person => person.id != id))
        })
    }
  }

  // Value for the filtered persons
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filterValue)
  )

  return (
    <div>
      <Search handleFilter={handleFilter} />
      <AddContact newName={newName} newNumber={newNumber} handleName={handleName} handleNumber={handleNumber} addPerson={addPerson} />
      <NumbersList persons={filteredPersons} handleRemove={removeContact}/>
    </div>
  )
}

export default App