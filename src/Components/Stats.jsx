import React from 'react'
import Graph from './Graph'

const Stats = ({wpm, accuracy, correctChars, incorrectChars, missedChars, extraChars,graphData}) => {
    // console.log(graphData);
    // arr= [1,1,2,3,2,2,2,3,3,3,3,4,4,4], set(arr) = [1,2,3,4]
    var timeSet = new Set();  //store unique values of time
    // has(value) -> true or false , constant time
    // add(value) -> adds the value in set

    const newGraph = graphData.filter((i)=>{
        if(!timeSet.has(i[0])){
            timeSet.add(i[0]);
            return i;
        }
    });
    // console.log(graphData,newGraph);
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
            <Graph graphData={newGraph}/>
        </div>
    </div>
  )
}

export default Stats