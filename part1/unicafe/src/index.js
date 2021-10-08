import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Statistics = (props) => {
  return (
    <>
      <p>all { props.all }</p>
      <p>average {props.average}</p>
      <p>positive {props.positive} %</p>
    </>
  )
}

const App = () => {
  // save clicks of each button to it own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral]= useState(0);
  const [bad, setBad] = useState(0);

  const handleClickGood = () => {
    setGood(good + 1);
  }
  const handleClickNeutral = () => {
    setNeutral(neutral + 1);
  }
  const handleClickBad = () => {
    setBad(bad + 1);
  }

  const all = good + neutral + bad;
  const average = all === 0 ? 0 :(good - bad) / all;
  const positive = all === 0 ? 0 : (good / all) * 100;
  // console.log(good);
  // console.log(neutral);
  // console.log(bad);

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleClickGood}>good</button>
      <button onClick={handleClickNeutral}>neutral</button>
      <button onClick={handleClickBad}>bad</button>

      <h1>statics</h1>

      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <Statistics all={all} average={average} positive={positive} />
    </div>
  )


}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
