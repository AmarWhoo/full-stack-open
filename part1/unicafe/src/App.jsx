import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, value, sign }) => (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
      <td>{sign}</td>
    </tr>
)

const Statistics = props => {
  if (props.all === 0) return <p>No feedback given.</p>

  return (
    <table>
      <tbody>
        <StatisticLine text="Good" value={props.good} sign=' ' />
        <StatisticLine text="Neutral" value={props.neutral} sign=' ' />
        <StatisticLine text="Bad" value={props.bad} sign=' ' />
        <StatisticLine text="All" value={props.all} sign=' ' />
        <StatisticLine text="Average" value={props.average} sign=' ' />
        <StatisticLine text="Positive" value={props.positive} sign='%' />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)
  

  // const handleClick = ({ click, setClick }) => {
  //   const updatedClick = click + 1
  //   const updatedAll = all + 1
  //   setClick(updatedClick)
  //   setAll(updatedAll)
  //   setAverage((updatedGood - updatedBad) / updatedAll)  ???
  // }

  const handleGoodClick = () => {
    const updatedGood = good + 1
    const updatedAll = all + 1
    setGood(updatedGood)
    setAll(updatedAll)
    setAverage((updatedGood - bad) / updatedAll)
    setPositive((updatedGood * 100) / updatedAll)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    const updatedAll = all + 1
    setNeutral(updatedNeutral)
    setAll(updatedAll)
    setAverage((good - bad) / updatedAll)
    setPositive((good * 100) / updatedAll)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    const updatedAll = all + 1
    setBad(updatedBad)
    setAll(updatedAll)
    setAverage((good - updatedBad) / updatedAll)
    setPositive((good * 100) / updatedAll)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGoodClick} text='Good' />
      <Button handleClick={handleNeutralClick} text='Neutral' />
      <Button handleClick={handleBadClick} text='Bad' />

      <h1>Statistics</h1>
      <Statistics 
        good={good} 
        neutral={neutral} 
        bad={bad} 
        all={all} 
        average={average} 
        positive={positive} 
      />
    </div>
  )
}

export default App