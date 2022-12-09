import React, { createRef, useEffect, useRef, useState } from 'react'

const TypingBox = ({words}) => {

    // in react you get a hook , useRef()
    // react also provides a function, createRef() 

    const [currCharIndex, setCurrCharIndex] = useState(0);
    const [currWordIndex, setCurrWordIndex] = useState(0);

    const inputRef = useRef(null);
    const wordSpanRef = Array(words.length).fill(0).map(i=>createRef(null));

    console.log(wordSpanRef);

    const handleKeyDown = (e)=>{
        
        let allChildSpans = wordSpanRef[currWordIndex].current.childNodes;


        //logic for space press -> increase my currWordIndex by 1



        //logic for backspace
        

        if(e.key===allChildSpans[currCharIndex].innerText){
            console.log("user pressed the correct key", e.key);
            allChildSpans[currCharIndex].className = 'char correct';
        }
        else{
            console.log("user didn't press the correct key", e.key);
            allChildSpans[currCharIndex].className = 'char incorrect';
        }
        setCurrCharIndex(currCharIndex+1);

    }


    const focusInput = ()=>{
        inputRef.current.focus();
    }

    useEffect(()=>{
        focusInput();
    },[]);



  return (
    <div>
        <div className="type-box" onClick={focusInput}>
            <div className="words">
                {words.map((word,index)=>(
                    <span className='word' ref={wordSpanRef[index]}>
                        {word.split('').map((char)=>(
                            <span className='char'>{char}</span>
                        ))}
                    </span>
                ))}
            </div>
        </div>
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