import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={handleClick}>vote</button>
        </div>
      </div>
    </>
  )
}

const AnecdoteList = () => {
  const filterValue = useSelector(state => state.filter)
  const anecdotes = useSelector(
    state => state.anecdotes
  ).filter(
    anecdote => anecdote.content.includes(filterValue)
  )
  const dispatch = useDispatch()

  return (
    <div>
      {anecdotes.map(anecdote => 
        <Anecdote 
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            dispatch(voteFor(anecdote.id))
            dispatch(setNotification(
              `you voted "${anecdote.content}"`
            ))
            setTimeout(() => {
              dispatch(removeNotification())
            }, 5000)
          }}
        />
      )}
    </div>
  )
}

export default AnecdoteList