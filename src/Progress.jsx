/* eslint-disable react/prop-types */
// import React from 'react'

export default function Progress({ index, numQuestions, points, maxPossiblePoints, answer }) {
  return (
    <header className="progress">
      <progress max={numQuestions} value={answer !== null ? index + 1 : index}></progress>
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p> <strong>{points}</strong> / {maxPossiblePoints}</p>
    </header>
  )
}
