import { wordsList } from 'random-words';
import React, { createRef, useEffect, useRef, useState } from 'react'

const TypingBox = ({words}) => {

    // in react you get a hook , useRef()
    // react also provides a function, createRef() 

    const [currCharIndex, setCurrCharIndex] = useState(0);
    const [currWordIndex, setCurrWordIndex] = useState(0);

    const inputRef = useRef(null);
    const wordSpanRef = Array(words.length).fill(0).map(i=>createRef(null));

    const handleKeyDown = (e)=>{
        
        let allChildSpans = wordSpanRef[currWordIndex].current.childNodes;


        //logic for space press -> increase my currWordIndex by 1
        if(e.keyCode===32){

            //removing cursor
            if(allChildSpans.length<=currCharIndex){
                //cursor present as a right one
                allChildSpans[currCharIndex-1].classList.remove('right-current');
            }
            else{
                //cursor in between
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
        }
        else{
            allChildSpans[currCharIndex].className = 'char incorrect';
        }
        if(currCharIndex+1 === allChildSpans.length){
            allChildSpans[currCharIndex].className+=' right-current';
        }
        else{
            allChildSpans[currCharIndex+1].className = 'char current';
        }
        
        setCurrCharIndex(currCharIndex+1);

    }


    const focusInput = ()=>{
        inputRef.current.focus();
    }

    useEffect(()=>{
        focusInput();
        wordSpanRef[0].current.childNodes[0].className = 'char current';
    },[]);



  return (
    <div>
        <div className="type-box" onClick={focusInput}>
            <div className="words">
                {words.map((word,index)=>(
                    <span className='word' ref={wordSpanRef[index]} key={index}>
                        {word.split('').map((char,ind)=>(
                            <span className='char' key={ind}>{char}</span>
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