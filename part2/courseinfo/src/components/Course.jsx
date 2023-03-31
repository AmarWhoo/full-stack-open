import React from 'react'

const Course = ({ name, parts }) => {

  const total = parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises, 0
  )

  return (
    <div>
      <h2>{name}</h2>
      <ul>    {/* Used an unordered list here because it looks nicer, in my opinion, than just <p></p> elements */}
        {parts.map(part =>
          <li key={part.id}>
            {part.name} {part.exercises}
          </li>
        )}
      </ul>
        
      <strong>total of {total} exercises.</strong>
    </div>
  )
}

export default Course