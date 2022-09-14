import { useState } from 'react'

const average = (good, neutral, bad) => {
  const count = good + neutral + bad
  const points = good - bad
  return points / count
}

const Header = ({header}) => {
  return <h1>{header}</h1>
}

const Button = ({handler, text}) => {
  return <button onClick={handler}>{text}</button>
}

const Statistics = ({good, neutral, bad}) => {
  if (good + neutral + bad === 0) {
    return <p>No feedback given</p>
  }

  return (
    <table>
      <tbody>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="all" value={good + neutral + bad} />
        <StatisticsLine text="average" value={average(good, neutral, bad)} />
        <StatisticsLine text="positive" value={(good / (good + neutral + bad) * 100).toString().concat("%")} />
      </tbody>
    </table>
  )
}

const StatisticsLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header header="give feedback" />
      <Button handler={() => setGood(good + 1)} text="good" />
      <Button handler={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handler={() => setBad(bad + 1)} text="bad" />
      <Header header="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App