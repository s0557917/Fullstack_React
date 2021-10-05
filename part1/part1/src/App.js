import React, {useState} from "react";

const History = (props) => {
  if(props.allClicks.length === 0) {
    return (
      <div>
        The app is used by pressing the buttons
      </div>
    )
  } else {
    return(
      <div>Button press history: {props.allClicks.join(' ')}</div>
    )
  }
}

const Button = ({handleClick, text}) => {
  return(
    <button onClick={handleClick}>{text}</button>
  )
}

const App = (props) => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAllClicks] = useState([])
  const [value, setValue] = useState(10)

  const handleLeftClick = () => {
    setAllClicks(allClicks.concat('L'))
    setLeft(left + 1)
  }
  const handleRightClick = () => {
    setAllClicks(allClicks.concat('L'))
    setRight(right + 1)
  }

  return(
    <div>
      {left}
      <Button handleClick={handleLeftClick} text="Left"/>
      <br></br>
      {right}
      <Button handleClick={handleRightClick} text="Right"/>
      <br></br>
      <History allClicks = {allClicks}/>
    </div>
  )
}

export default App;
