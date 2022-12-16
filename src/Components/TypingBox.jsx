import { wordsList } from 'random-words';
import React, { createRef, useEffect, useRef, useState } from 'react'
import { useTestMode } from '../Context/TestModeContext';
import Stats from './Stats';
import UpperMenu from './UpperMenu';

const TypingBox = ({words}) => {

    // in react you get a hook , useRef()
    // react also provides a function, createRef() 

    const {testSeconds} = useTestMode();

    const [currCharIndex, setCurrCharIndex] = useState(0);
    const [currWordIndex, setCurrWordIndex] = useState(0);
    const [countDown, setCountDown] = useState(15);
    const [testTime, setTestTime] = useState(15);
    const [correctChars, setCorrectChars] = useState(0);
    const [correctWords, setCorrectWords] = useState(0);
    const [incorrectChars, setIncorrectChar] = useState(0);
    const [missedChars, setMissedChars] = useState(0);
    const [extraChars, setExtraChars] = useState(0);
    const [graphData, setGraphData] = useState([]);
    const [testStart, setTestStart] = useState(false);
    const [testEnd, setTestEnd] = useState(false);

    const inputRef = useRef(null);
    const wordSpanRef = Array(words.length).fill(0).map(i=>createRef(null));

    const startTimer = ()=>{
        
        const intervalId = setInterval(timer, 1000);

        function timer(){
            // console.log("timer function is working");
            setCountDown((prevCountDown)=>{

                setCorrectChars((correctChars)=>{
                    // console.log("correct chars",correctChars);
                    setGraphData((data)=>{
                        return [...data, [testTime-prevCountDown,Math.round((correctChars/5)/((testTime-prevCountDown+1)/60))]];
                    });
                    return correctChars;
                });


                if(prevCountDown===1){
                    setTestEnd(true);
                    clearInterval(intervalId);
                    return 0;
                }
                return prevCountDown-1;
            });
        }

    }



    const handleKeyDown = (e)=>{
        
        let allChildSpans = wordSpanRef[currWordIndex].current.childNodes;
        
        if(!testStart){
            startTimer();
            setTestStart(true);
        }

        //logic for space press -> increase my currWordIndex by 1
        if(e.keyCode===32){

            const correctChars = wordSpanRef[currWordIndex].current.querySelectorAll('.correct');

            if(correctChars.length === allChildSpans.length){
                setCorrectWords(correctWords+1);
            }
            //removing cursor
            if(allChildSpans.length<=currCharIndex){
                //cursor present as a right one
                allChildSpans[currCharIndex-1].classList.remove('right-current');
            }
            else{
                //cursor in between
                setMissedChars(missedChars+(allChildSpans.length-currCharIndex));
                for(let i=currCharIndex;i<allChildSpans.length;i++){
                    allChildSpans[i].className+=' skipped';
                }
                allChildSpans[currCharIndex].className = allChildSpans[currCharIndex].className.replace('current','');

            }

            wordSpanRef[currWordIndex+1].current.childNodes[0].className = 'char current';
            setCurrWordIndex(currWordIndex+1);
            setCurrCharIndex(0);


            return;
        }


        //logic for backspace
        if(e.keyCode === 8){
            
            if(currCharIndex!==0){


                if(currCharIndex===allChildSpans.length){
                    if(allChildSpans[currCharIndex-1].className.includes('extra')){
                        allChildSpans[currCharIndex-1].remove();
                        allChildSpans[currCharIndex-2].className+=' right-current'
                    }
                    else{
                        allChildSpans[currCharIndex-1].className = 'char current';
                    }
                    
                    setCurrCharIndex(currCharIndex-1);
                    return;
                }


                allChildSpans[currCharIndex].className = 'char';
                allChildSpans[currCharIndex-1].className = 'char current';
                setCurrCharIndex(currCharIndex-1);
            }
            


            return;
        }

        if(currCharIndex === allChildSpans.length){
            //add new extra characters

            setExtraChars(extraChars+1);
            let newSpan = document.createElement('span'); // -> <span></span>
            newSpan.innerText = e.key;
            newSpan.className = 'char incorrect extra right-current';
            allChildSpans[currCharIndex-1].classList.remove('right-current');
            wordSpanRef[currWordIndex].current.append(newSpan);
            setCurrCharIndex(currCharIndex+1);
            return;
        }

        if(e.key===allChildSpans[currCharIndex].innerText){
            allChildSpans[currCharIndex].className = 'char correct';
            setCorrectChars(correctChars+1);
        }
        else{
            allChildSpans[currCharIndex].className = 'char incorrect';
            setIncorrectChar(incorrectChars+1);
        }
        if(currCharIndex+1 === allChildSpans.length){
            allChildSpans[currCharIndex].className+=' right-current';
        }
        else{
            allChildSpans[currCharIndex+1].className = 'char current';
        }
        
        setCurrCharIndex(currCharIndex+1);

    }

    const calculateWPM = ()=>{
        return Math.round((correctChars/5)/(testTime/60))
    }

    const calculateAccuracy = ()=>{
        return Math.round((correctWords/currWordIndex)*100);
    }


    const focusInput = ()=>{
        inputRef.current.focus();
    }

    useEffect(()=>{
        focusInput();
        wordSpanRef[0].current.childNodes[0].className = 'char current';
    },[]);

    useEffect(()=>{
        setCountDown(testSeconds);
        setTestTime(testSeconds);
    },[testSeconds])


  return (
    <div>
          
            <UpperMenu countDown={countDown}/>
              {(testEnd) ? (<Stats 
                                wpm={calculateWPM()} 
                                accuracy={calculateAccuracy()} 
                                correctChars={correctChars} 
                                incorrectChars={incorrectChars}
                                missedChars={missedChars} 
                                extraChars={extraChars}
                                graphData={graphData}/>) :
                  (
                    <div className="type-box" onClick={focusInput}>
                      
                      <div className="words">
                          {words.map((word, index) => (
                              <span className='word' ref={wordSpanRef[index]}>
                                  {word.split('').map((char, ind) => (
                                      <span className='char'>{char}</span>
                                  ))}
                              </span>
                          ))}
                      </div>
                      </div>
                  )
              }

         
        <input
            type='text'
            className='hidden-input'
            ref={inputRef}
            onKeyDown={(e)=>handleKeyDown(e)}
        />
    </div>
  )
}

export default TypingBox