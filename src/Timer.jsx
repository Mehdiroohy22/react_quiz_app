/* eslint-disable react/prop-types */
// import React from 'react'

import { useEffect } from "react"

export default function Timer({ dispatch, secondsRemaioning }) {
  const mins = Math.floor(secondsRemaioning / 60);
  const seconds = secondsRemaioning % 60
  useEffect(function () {
    const id = setInterval(function () {
      dispatch({ type: 'tick' })
    }, 1000)

    return function () {
      clearInterval(id)
    }
  }, [dispatch])
  return (
    <div className="timer">{mins < 10 && '0'}{mins} : {seconds < 10 && '0'}{seconds}</div>
  )
}
