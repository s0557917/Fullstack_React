import {React, useState, useEffect} from "react"
import peopleService from './services/people'
import { SuccessNotification, ErrorNotification } from "./components/Notification"

const InformationForm = ({addNewPerson, newName, newPhone, handleNameChange, handlePhoneChange}) => {
  return(
    <form onSubmit={addNewPerson}>
      <div>
        <p>Name:</p>
        <input value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        <p>Phone:</p>
        <input value={newPhone} onChange={handlePhoneChange}/>
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

const Entry = ({person, deleteEntry}) => {
  return(
    <li key={person.id}>
      <p>{person.name} -- {person.number}</p>
      <button onClick={() => deleteEntry(person.id)}>Delete</button>
      </li>
  )
}

const InformationDisplay = ({people, setPeople}) => {
  
  const deleteEntry = (id) => {
    const person = people.filter(person => person.id === id)
    const confirmationResult = window.confirm("Are you sure you want to delete ", person[0].name)

    if(confirmationResult){
      peopleService
      .deletePerson(id)
      .then(response => {
        setPeople(people.filter(person => person.id !== id))
      })
    }
  }
  
  return( 
    <>
      <h2>Numbers</h2>
      <ul>
        {people.map(person => <Entry person={person} deleteEntry={() => deleteEntry(person.id)}/>)}
      </ul>
    </>
  )
}

const Search = ({handleSearchChange, searchResults}) => {
  return(
    <div>
      <p>Search:</p>
      <input onChange={handleSearchChange}/>
      <ul>
        {searchResults.map(result => <li key={result.id}>{result.name} -- {result.number}</li>)}
      </ul>
    </div>
  )
}

const App = () => {
  const [people, setPeople] = useState([])
  const [ newName, setNewName] = useState('')
  const [ newPhone, setNewPhone] = useState('')
  const [ searchResults, setSearchResults] = useState([])
  const [ successNotification, setSuccessNotification] = useState(null)
  const [ errorNotification, setErrorNotification] = useState(null)

  useEffect(() => {
    peopleService
      .getAll()
      .then(allEntries => {
        const people = allEntries.map(person => 
          ({"id":person.id, "name":person.name, "number":person.number})
        )
        setPeople(people)
      }) 
  },[])

  const addNewPerson = (event) => {
    event.preventDefault()
    
    const newPerson = {id: people.length + 1, name: newName, number: newPhone}
    const matchingPeople = people.filter(person => newPerson.name === person.name)    

    console.log("Match: ", matchingPeople)

    if(matchingPeople.length === 0){
      peopleService
      .create(newPerson)
      .then(returnedPerson => {
        setPeople(people.concat(returnedPerson))
        setNewName("") 
        setNewPhone("")
        
        setSuccessNotification(`Succesfully added ${returnedPerson.name}!`)
        setTimeout(() => {
          setSuccessNotification(null)
        }, 5000)

      })
      .catch(err => alert("An error occured: ", err))

    } else {
      
      const confirmationResult = window.confirm(`Do you want to change ${newPerson.name}'s number?'`)
            
      if(confirmationResult){
        peopleService
        .update(matchingPeople[0].id, newPerson)
        .then(returnedPerson => {
          setPeople(people.map(person => person.id === returnedPerson.id ? returnedPerson : person))          
        })
        .catch(err => {
          setErrorNotification(`${matchingPeople[0].name}'s information has already been removed from the server!'`)
          setTimeout(() => {
            setErrorNotification(null)
          }, 5000);
        })
      }
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleSearchChange = (event) => {
    const search = event.target.value
    if(search !== ""){
      const searchResults = people.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
      setSearchResults(searchResults)
    }
  }

  return(
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={successNotification}/>
      <ErrorNotification message={errorNotification}/>
      <Search handleSearchChange={handleSearchChange} searchResults={searchResults}/>
      <InformationForm addNewPerson={addNewPerson} newName={newName} newPhone={newPhone} handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange}/>
      <InformationDisplay people={people} setPeople={setPeople}/>
    </div>
  )
}

export default App;
