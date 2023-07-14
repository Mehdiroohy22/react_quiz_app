/* eslint-disable react/prop-types */
// import React from 'react'

export default function Option({ question, dispatch, answer }) {
  const isAnswered = answer !== null
  return (
    <div className='options'>
      {question.options.map((option, i) => {
        return <button onClick={() => dispatch({ type: 'newAnswer', payload: i })}
          className={`btn btn-option ${answer === i ? 'answer' : ''} ${isAnswered ? answer === i ? 'correct' : 'wrong' : ''}`}
          disabled={isAnswered}
          key={option}>{option}</button>
      })}
    </div>
  )
}
