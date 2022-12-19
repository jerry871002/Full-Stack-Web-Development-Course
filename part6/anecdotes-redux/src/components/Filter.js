import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    event.preventDefault()
    const content = event.target.value
    dispatch(setFilter(content))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter