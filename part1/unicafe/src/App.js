import {React, useState} from "react";

const StatisticLine = ({name, value}) => {
  return(
    <tr>
      <td>{name}: </td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, negative, all, average}) => {
  const calculateAvg = () => {
    return average.reduce((a, b) => a+b, 0) / all
  }

  const calculatePositivePercentage = () => {
    return (good/all)*100 
  }
  
  if(all === 0){
    return (
      <p>Please leave us your feedback!</p>
    )
  } else {
    return(

      <div>
        <h1>Statistics: </h1>
        <table>
          <tbody>
            <StatisticLine name="Good" value={good}/>
            <StatisticLine name="Neutral" value={neutral}/>
            <StatisticLine name="Negative" value={negative}/>
            <StatisticLine name="All" value={all}/>
            <StatisticLine name="Average" value={calculateAvg()}/>
            <StatisticLine name="Positive Percentage" value={calculatePositivePercentage()}/>
          </tbody>
        </table>
      </div>
    
    )
  }
}

const Button = ({clickHandler, name}) => {
  return(
    <button onClick={clickHandler}>{name}</button>
  )
}

const App = () => {
  const[good, setGood] = useState(0) 
  const[neutral, setNeutral] = useState(0) 
  const[negative, setNegative] = useState(0) 
  const[all, setAll] = useState(0)
  const[average, setAverage] = useState([])
  const[selected, setSelected] = useState(0)
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  const[votes, setVotes] = useState(anecdotes.map(() => 0))

  const recordGoodFeedback = () => {
    setAverage(average.concat(1))
    setAll(all + 1)
    setGood(good + 1)
  }

  const recordNeutralFeedback = () => {
    setAll(all + 1)
    setNeutral(neutral + 1)
  }

  const recordNegativeFeedback = () => {
    setAverage(average.concat(-1))
    setAll(all + 1)
    setNegative(negative + 1)
  }

  const upvoteQuote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const generateRandomNumber = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length)) 
  }

  const getMostUpvotedComment = () => {
    return anecdotes[votes.indexOf(Math.max(...votes))]
  }

  return (
    <div>
      <h1>Leave your feedback!</h1>
      <Button clickHandler={recordGoodFeedback} name="Good"/>
      <Button clickHandler={recordNeutralFeedback} name="Neutral"/>
      <Button clickHandler={recordNegativeFeedback} name="Negative"/>
      
      <br></br>
      <Statistics good={good} neutral={neutral} negative={negative} all={all} average={average}/>
      <br></br>
      
      <h3>{anecdotes[selected]}</h3>
      <p>Votes: {votes[selected]}</p>
      <Button clickHandler={upvoteQuote} name="Upvote Quote"/>
      <Button clickHandler={generateRandomNumber} name="Next Anecdote"/>

      <br></br>
      <h3>Most popular quote</h3>
      <p>{getMostUpvotedComment()}</p>
    </div>
  )
}

export default App;
