/* eslint-disable react/prop-types */
// import React from 'react'

export default function NextQuestion({ dispatch, answer, index, numQuestions }) {
  if (answer === null) return;
  if (index < numQuestions - 1) {
    return (
      <div>
        <button onClick={() => dispatch({ type: 'nextQuestion' })} className="btn btn-ui">Next</button>
      </div>
    )
  }
  if (index === numQuestions - 1) {
    return (
      <div>
        <button onClick={() => dispatch({ type: 'finish' })} className="btn btn-ui">Finish</button>
      </div>
    )
  }
}
