import React from "react";

const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

const App = () => {
  const now = new Date();

  return(
    <div>
      <p>Greetings, today is the {now.toString()}</p>
      <Hello name="Phillip" age={20} />
      <Hello name="Pablo" age={10+5}/>
    </div>
  )
}

export default App;
