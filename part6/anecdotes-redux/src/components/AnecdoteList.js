import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { newNotification } from '../reducers/notificationReducer'

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
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  return (
    <div>
      {anecdotes.map(anecdote => 
        <Anecdote 
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            dispatch(voteFor(anecdote.id))
            dispatch(newNotification(
              `you voted "${anecdote.content}"`
            ))
            setTimeout(() => {
              dispatch(newNotification(''))
            }, 5000)
          }}
        />
      )}
    </div>
  )
}

export default AnecdoteList