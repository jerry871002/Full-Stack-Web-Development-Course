import { useState } from 'react'

const findMaxKey = (object) => {
  let maxValue = 0;
  let maxKey = 0;
  for (let [key, value] of Object.entries(object)) {
    if (value > maxValue) {
      maxValue = value
      maxKey = key
    }
  }
  return maxKey
}

const Header = ({header}) => {
  return <h1>{header}</h1>
}

const Button = ({handler, text}) => {
  return <button onClick={handler}>{text}</button>
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({})

  const voteHandler = () => {
    let newVotes
    if (selected in votes) {
      newVotes = {
        ...votes, 
        [selected]: votes[selected] + 1
      }
    } else {
      newVotes = {
        ...votes, 
        [selected]: 1
      }
    }
    setVotes(newVotes)
  }

  return (
    <div>
      <Header header="Anecdote of the day" />
      {anecdotes[selected]}
      <br />
      has {
        (function() {
          if (selected in votes) {
            return votes[selected]
          } else {
            return 0
          }
        })()
      } votes
      <br />
      <Button handler={voteHandler} text="vote" />
      <Button handler={() => setSelected(Math.floor(Math.random() * anecdotes.length))} text="next anecdote" />
      <Header header="Anecdote with most votes" />
      {anecdotes[findMaxKey(votes)]}
    </div>
  )
}

export default App