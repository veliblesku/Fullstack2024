import { useState } from 'react'


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const Points = ({points}) => {
  return (
    <p>has {points} points</p>
  )
}

const MostVotes = ({points, anecdotes}) => {

  let mostLikes = points[0]
  let topAnecdote = anecdotes[0]
  
  for (let i = 0; i < points.length; i++) {
    if (points[i] > mostLikes) {
      mostLikes = points[i]
      topAnecdote = anecdotes[i]
    }
  }
  console.log(topAnecdote)
  
  // mostLikes ja topAnecdote sisältää äänestetyimmän anekdootin ja sen pisteet
  return (
      <div>
          <h1> Best anecdote</h1>    
          <p>{topAnecdote}</p>
      </div>
  )
 
}

const App = () => {

  
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  var points1 = Array.apply(null, new Array(anecdotes.length)).map(
    Number.prototype.valueOf,
    0
  )
  var random = Math.floor(Math.random() * 6)

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(points1);

  const handleRandomizer = () => {
    setSelected(random);
  }

  const handleVotes = () => {
    const newPoints = [
        ...points
    ] 
    newPoints[selected] = newPoints[selected] +1 
    setPoints(newPoints)
      console.log("newpoints", newPoints)
  }

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <Points points={points[selected]}/>
      <Button handleClick={handleRandomizer} text="Next Anecdote" />
      <Button handleClick={handleVotes} text="Vote" />
      <MostVotes points={points} anecdotes={anecdotes}/>
    </div>
  )
}

export default App