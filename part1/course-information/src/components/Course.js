import React from "react";

const Course = ({course}) => {
    return(
      <>
        <Header course = {course}/>
        <Content course = {course}/>
        <Total course = {course}/>
      </>
    )
}

const Header = (props) => {
  return(
    <h1>{props.course.name}</h1>
  )
}

const Part = (props) => {
  return(
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Content = ({course}) => {
  return(
    <>
      {course.parts.map(part => 
        <Part key={part.id} part={part.name} exercises={part.exercises}/>
      )}
    </>
  )
}

const Total = ({course}) => {
  
  return(
    <p>
      <b>Number of exercises {course.parts.reduce(((sum, part) => sum + part.exercises), 0)}</b>
    </p>
  )
} 

export default Course;