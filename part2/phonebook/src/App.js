import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [notification, setNotification] = useState('')
  const [notificationType, setNotificationType] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNameFilter(event.target.value)

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.map(person => person.name).includes(newName)) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const person = persons.find(person => person.name === newName)
        const updatedPerson = { ...person, number: newNumber }
        const id = person.id
        personsService
          .update(id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
            setNotification(`Updated ${person.name}`)
            setNotificationType('success')
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          .catch(error => {
            console.log(error)
            setPersons(persons.filter(person => person.id !== id))
            setNotification(`Information of '${person.name}' has already been removed from server`)
            setNotificationType('error')
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
      }
      setNewName('')
      setNewNumber('')
      return
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    personsService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setNotification(`Added ${newName}`)
        setNotificationType('success')
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
  }

  const deletePerson = id => {
    return function(e) {
      e.preventDefault()
      if (window.confirm(`Delete ${persons.find(p => p.id === id).name}?`)) {
        personsService
          .remove(id)
          .then(data => {
            personsService
              .getAll()
              .then(persons => {
                setPersons(persons)
              })
          })
      }
    }
  }

  return (
    <div>
      <h2>Numberbook</h2>
      <Notification message={notification} type={notificationType} />
      <Filter nameFilter={nameFilter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm 
        addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} deleteHandler={deletePerson} />
    </div>
  )
}

export default App