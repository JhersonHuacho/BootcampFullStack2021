import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Statistics = (props) => {
  
  return (
    <>
      <table>
        <tbody>
          <tr>
            <Statistic text="good" value={props.good} />
          </tr>
          <tr>
            <Statistic text="neutral" value={props.neutral} />
          </tr>
          <tr>
            <Statistic text="bad" value={props.bad} />
          </tr>
          <tr>
            <Statistic text="all" value={props.all} />
          </tr>
          <tr>
            <Statistic text="average" value={props.average} />
          </tr>
          <tr>
            <Statistic text="positive" value={props.positive} />
          </tr>
        </tbody>
      </table>
    </>
  )
}

const Statistic = (props) => {
  return (
    <>
      <td>{props.text}</td>
      <td>{props.value} {props.text === "positive" ? "%" : ""}</td>
    </>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
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
    <div className="main">
      <h1>give feedback</h1>
      <Button handleClick={handleClickGood} text="good" />
      <Button handleClick={handleClickNeutral} text="neutral" />
      <Button handleClick={handleClickBad} text="bad" />

      <h1>Statistics</h1>
      {all === 0
        ? <p>No feedback given</p>
        : <Statistics
            good={good}
            neutral={neutral}
            bad={bad} 
            all={all} 
            average={average} 
            positive={positive} 
          />
      }
      
    </div>
  )


}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
