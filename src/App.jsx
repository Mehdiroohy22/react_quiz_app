/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// import DateCounter from "./DateCounter"
import { useEffect, useReducer } from "react"
import Header from "./Header"
import MainContent from "./MainContent"
import Loader from "./Loader"
import Error from "./Error"
import StartScreen from "./StartScreen"
import Question from "./Question"
import NextQuestion from "./NextQuestion"
import Progress from "./Progress"
import FinishScreen from "./FinishScreen"
import Footer from "./Footer"
import Timer from "./Timer"
const Secs_Per_Ques = 30
const initialState = {
  questions: [],
  //'loading', 'error', 'ready', 'active','finished'
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaioning: null,
}
function reducer(currState, action) {
  switch (action.type) {
    case 'dataRecieved':
      return {
        ...currState,
        questions: action.payload,
        status: 'ready',
      }
    case 'dataFailed':
      return {
        ...currState,
        status: 'error'
      }
    case 'start':
      return {
        ...currState,
        status: 'active',
        secondsRemaioning: currState.questions.length * Secs_Per_Ques
      }
    case "newAnswer":
      const question = currState.questions.at(currState.index);
      return {
        ...currState,
        answer: action.payload,
        points: action.payload === question.correctOption ? currState.points + question.points : currState.points
      }
    case 'nextQuestion':
      return {
        ...currState,
        index: currState.index + 1,
        answer: null
      }
    case 'finish':
      return {
        ...currState,
        status: 'finish',
        highscore: currState.points > currState.highscore ? currState.points : currState.highscore,

      }
    case 'reset':
      return {
        ...currState,
        status: 'ready',
        index: 0,
        answer: null,
        points: 0,
      }
    case 'tick':
      return {
        ...currState,
        secondsRemaioning: currState.secondsRemaioning - 1,
        status: currState.secondsRemaioning === 0 ? 'finish' : currState.status
      }
    default:
      throw new Error('unknown error')
  }
}

function App() {
  const [{ questions, status, index, answer, points, highscore, secondsRemaioning }, dispatch] = useReducer(reducer, initialState)
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((prev, curr) => prev + curr.points, 0)
  useEffect(function () {
    fetch('http://localhost:3000/questions')
      .then(res => res.json())
      .then(data => dispatch({ type: 'dataRecieved', payload: data }))
      .catch(err => dispatch({ type: 'dataFailed', payload: err }))
  }, [])
  // console.log(secondsRemaioning)
  return (
    <div className="app">
      <Header />
      <MainContent>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
        {status === 'active' &&
          <>
            <Progress index={index} numQuestions={numQuestions} points={points} maxPossiblePoints={maxPossiblePoints} answer={answer} />
            <Question question={questions[index]} dispatch={dispatch} answer={answer} />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaioning={secondsRemaioning} />
              <NextQuestion dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions} />
            </Footer>
          </>
        }
        {status === 'finish' && <FinishScreen dispatch={dispatch} highscore={highscore} points={points} maxPossiblePoints={maxPossiblePoints} />}
      </MainContent>
    </div>

  )
}

export default App
