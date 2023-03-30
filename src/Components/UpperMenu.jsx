import React from 'react'
import { useTestMode } from '../Context/TestModeContext'

const UpperMenu = ({countDown, currWordIndex}) => {

  const {setTestSeconds, setTestMode,testSeconds, testMode, setTestWords, testWords} = useTestMode();

  const updateTime = (e)=>{
      setTestSeconds(e.target.id);
  }

  const updateWord = (e) =>{
    // console.log(typeof e.target.id);
      setTestWords(Number(e.target.id));
  }

  const updateMode = (e)=>{
    setTestMode(e.target.id);
  }

  return (
    <div className="upper-menu">
      {(testMode==='time')?
        (<div className="counter">
        {countDown}
      </div>)
      :
      (
        <div className="counter">
        {currWordIndex}/{testWords}
      </div>
      )
    }

      <div className="modes">
        <span>Mode - </span>
        <span className={(testMode==='time')?'active mode':'mode'} id='time' onClick={updateMode}>Time</span>
        <span className={(testMode==='word')?'active mode':'mode'} id='word' onClick={updateMode}>Word</span>
      </div>

      {(testMode==='time') ? (<div className="time-modes">
        <div className={((testMode==='time')&&(testSeconds==15))?'active-value time':'time'} id={15} onClick={updateTime}>15s</div>
        <div className={((testMode==='time')&&(testSeconds==30))?'active-value time':'time'} id={30} onClick={updateTime}>30s</div>
        <div className={((testMode==='time')&&(testSeconds==60))?'active-value time':'time'} id={60} onClick={updateTime}>60s</div>
      </div>)
      :
      (<div className="word-modes">
        <div className={((testMode==='word')&&(testWords==10))?'active-value no-of-word':'no-of-word'} id={10} onClick={updateWord}>10</div>
        <div className={((testMode==='word')&&(testWords==20))?'active-value no-of-word':'no-of-word'} id={20} onClick={updateWord}>20</div>
        <div className={((testMode==='word')&&(testWords==30))?'active-value no-of-word':'no-of-word'} id={30} onClick={updateWord}>30</div>
      </div>)}
    </div>
  )
}

export default UpperMenu