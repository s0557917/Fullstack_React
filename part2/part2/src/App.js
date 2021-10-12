import {React, useState, useEffect} from "react";
import Note from "./components/Note";
import noteService from "./services/notes";
import {SuccessNotification, ErrorNotification} from './components/Notification'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2021</em>
    </div>
  )
}

const App = () => {  
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("Write a new note...")
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote, 
      date: new Date().toISOString(),
      important: Math.random() < 0.5, 
      id: notes.length + 1
    }

      noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote("")
      })
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const toggleImportance = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}

    noteService
    .update(id, changedNote)
    .then(returnedNote => {
      setNotes(notes.map(note => note.id === id ? returnedNote : note))
    })
    .catch(err => {
      setErrorMessage(
        `Note'${note.content}' was already removed from server!`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);

      setNotes(notes.filter(n => n.id !== id))
    })
  } 

  return (
    <div>
      <h1>Part 2 - Notes</h1>
      <ErrorNotification message={errorMessage}/>
      <ul>
        {notesToShow.map(note => 
          <Note 
            key={note.id} 
            note={note} 
            toggleImportance={() => toggleImportance(note.id)}
          />)
        }
      </ul>
      
      <button onClick={() => setShowAll(!showAll)}>
        Show {showAll ? " important " : " all "} messages
      </button>

      <form onSubmit={addNote}>
        <input 
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">Save</button>
      </form>
      <Footer/>
    </div>
  )
}

export default App;
