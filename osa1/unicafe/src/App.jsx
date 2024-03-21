import { useState } from 'react'
const Otsikko = (props) => {
  return (
    <div>
      <h1>{props.annapalautetta.nimi}</h1>

    </div>
  )
}
const Sisalto = (props) => {
  return (
    <div>
      <p>
        <Arvostelu arvostelu={props.arvostelut[0]} />
        <Arvostelu arvostelu={props.arvostelut[1]} />
        <Arvostelu arvostelu={props.arvostelut[2]} />
      </p>
    </div>
  )
}
const Yhteensa = (props) => {
  return (
    <div>
      <p>

        yhteensä {props.arvostelut[0].tehtavia +
          props.arvostelut[1].tehtavia + props.arvostelut[2].tehtavia} tehtävää
      </p>
    </div>
  )
}
const Arvostelu = (props) => {
  return (
    <div>
      <p>
        {props.arvostelu.nimi}
      </p>
    </div>
  )
}
const StatisticLine = (props) => {
  return(
      <p>{props.text}         {props.value}</p>
  )
}
const Statistics = (props) => {
  const goodie = 1
  const neutralie = 0
  const badie = -1
  const averagecounted = (goodie * props.good + neutralie * props.neutral + badie * props.bad) / props.all.length
  var positivePercent = ((props.good) / props.all.length) * 100

  if (props.all.length === 0) {
    return (
      <div>
        Ei yhtään arvostelua. Arvostele!
      </div>
    )
  }
  return (
      <table>
      <thead>
        <tr>
          <th><StatisticLine text="good" value ={props.good}/></th>
        </tr>
      </thead>
      <thead>
        <tr>
          <th><StatisticLine text="neutral" value ={props.neutral}/></th>
        </tr>
      </thead>
      <thead>
        <tr>
          <th><StatisticLine text="bad" value ={props.bad}/></th>
        </tr>
      </thead>
      <thead>
        <tr>
          <th><StatisticLine text="average" value ={averagecounted}/></th>
        </tr>
      </thead>
      <thead>
        <tr>
          <th><StatisticLine text="positive" value ={positivePercent}/></th>
        </tr>
      </thead>
      </table>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState([])


  const handleGoodClick = () => {
    setAll(all.concat('G'))
    setGood(good + 1)
  }
  const handleNeutralClick = () => {
    setAll(all.concat('N'))
    setNeutral(neutral + 1)
  }
  const handleBadClick = () => {
    setAll(all.concat('B'))
    setBad(bad + 1)
  }
  return (
    <div>
      <h1>anna palautetta</h1>
      
        <Button handleClick={handleGoodClick} text='Good' />
        <Button handleClick={handleNeutralClick} text='Neutral' />
        <Button handleClick={handleBadClick} text='Bad' />

        <h1>statistiikka</h1>

        <Statistics all={all} good={good} neutral={neutral} bad={bad} />
      
    </div>

  )
}

export default App