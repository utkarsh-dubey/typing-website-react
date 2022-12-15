import React from 'react'
import Graph from './Graph'

const Stats = ({wpm, accuracy, correctChars, incorrectChars, missedChars, extraChars}) => {
  return (
    <div className="stats-box">
        <div className="left-stats">
            <div className="title">WPM</div>
            <div className="subtitle">{wpm}</div>
            <div className="title">Accuracy</div>
            <div className="subtitle">{accuracy}%</div>
            <div className="title">Characters</div>
            <div className="subtitle">{correctChars}/{incorrectChars}/{missedChars}/{extraChars}</div>
        </div>
        <div className="right-stats">
            {/* graph comp will go here */}
            <Graph/>
        </div>
    </div>
  )
}

export default Stats