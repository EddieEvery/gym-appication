import React from 'react'
import Siderbar from './components/Siderbar'
import Editor from './components/Editor'
import {data} from './data'
import Split from 'react-split'
import {nanoid} from 'nanoid'

const App = () => {

const [notes, setNotes] = React.useState([])

const [currentNoteId, setCurrentNoteId] =React.useState((notes[0]&& notes[0].id)||'')

function createNewNote(){
  const newNote ={
    id:nanoid(),
    body: " # Type your markdown note's title here"
  }
  setNotes(prevNotes => [newNote, ...prevNotes])
  setCurrentNoteId(newNote.id)
} 


function updateNote(text){
setNotes(oldNotes => oldNotes.map(oldNotes=>{
  return oldNotes.id === currentNoteId ? {
    ...oldNotes, body:text
  }: oldNotes
}))

}
 
function findCurrentNote(){
  return notes.find(notes => {
    return notes.id === currentNoteId
  }) || notes[0]
}

  return (
<main>
  {
    notes.length>0 ?
    <Split
    sizes={[30,70]}
    direction='horizontal'
    className='split'
    >

<Siderbar
notes={notes}
currentNotes ={findCurrentNote()}
setCurrentNoteId={setCurrentNoteId}
newNote={createNewNote}
/>
{
  currentNoteId && notes.length > 0 &&
 <Editor
 currentNoteId={findCurrentNote()}
 updateNote={updateNote}
 />

}
    </Split>
    :
    <div className='no-notes'>

<h1>
  You have no notes
</h1>

<button
className='first-note'
onClick={createNewNotes}
>
  create one newNote
</button>


    </div>
  }
  
  
</main>
  )
}

export default App
