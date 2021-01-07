import React from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import Speech from 'react-speech';

const Dictaphone = () => {
    const { transcript, resetTranscript } = useSpeechRecognition()
  
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      return null
    }
    // const style = {
    //   play: {
    //     button: {
    //       width: '28',
    //       height: '28',
    //       cursor: 'pointer',
    //       pointerEvents: 'none',
    //       outline: 'none',
    //       backgroundColor: 'yellow',
    //       border: 'solid 1px rgba(255,255,255,1)',
    //       borderRadius: 6
    //     },
    //   }
    // };
    
  
    return (
      <div>
        <button onClick={SpeechRecognition.startListening}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <p>{transcript}</p>
        <Speech  text={transcript}/>
      </div>
    )
  }
 
  

  export default Dictaphone