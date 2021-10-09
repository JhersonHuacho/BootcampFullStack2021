import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
const points = new Array(anecdotes.length).fill(0);
const copyPoints = [...points];

const App = (props) => {
  const [selected, setSelected] = useState(0);
  // const points = Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0);
  // const points = new Array(10).join('0').split('').map(parseFloat);
  
  // console.log("points", points);
  // console.log("copyPoints", copyPoints);
  
  const getRandomArbitrary = (min, max) => {
    return Math.floor(Math.random() * (max -min) + min);
  }

  const handleNext = () => {
    const number = getRandomArbitrary(0, anecdotes.length);
    setSelected(number);
  }

  const handleVote = () => {
    copyPoints[selected] += 1;
  }

  const mostVotes = () => {
    const indiceArray = copyPoints.indexOf(Math.max(...copyPoints));
    return indiceArray;
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <br/>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleNext}>Next Anecdote</button>

      <h1>Anecdote with most votes</h1>
      <p>
        {props.anecdotes[mostVotes()]}
      </p>
    </div>
  )
}



ReactDOM.render(
  <React.StrictMode>
    <App anecdotes={anecdotes} />
  </React.StrictMode>,
  document.getElementById('root')
);


