const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Content = (props) => {
  let rows = [], i = 0
  props.parts.forEach(part => {
    rows.push(<Part key={i} part={part.name} exercises={part.exercises}/>)
    i++
  });
  console.log(rows)

  return (
    <div>
      {rows}
    </div>
  )
}

const Part = (props) => {
  return <p>{props.part} {props.exercises}</p>
}

const Total = (props) => {
  let sum = 0
  props.parts.forEach(part => {
    sum += part.exercises
  });
  return <p>Number of exercises {sum}</p>
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App