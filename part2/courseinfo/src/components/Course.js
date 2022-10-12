import React from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Total = ({ sum }) => <p><b>total of {sum} exercises</b></p>

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) =>
  <>
    {parts.map(part => <Part part={part} key={part.id} />)}
  </>

const Course = ({ course }) =>
  <>
    <Header text={course.name} />
    <Content parts={course.parts} />
    <Total sum={course.parts.map(part => part.exercises).reduce((accumulator, a) => accumulator + a, 0)} />
  </>

export default Course