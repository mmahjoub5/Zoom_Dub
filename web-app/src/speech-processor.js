/* Implementation of the AudioWorkletProcessor
 https://webaudio.github.io/web-audio-api/#audioworklet
 This file will be loaded only in recent browsers that supports Audio worklet it is
 currently in js because it needs to be in es6 */

const sdk = require('microsoft-cognitiveservices-speech-sdk');
const speechConfig = sdk.SpeechConfig.fromSubscription('0adfc48533ba40a890fd572b8ac543de', 'westus2');

function fromMic() {
    let audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
    let recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    console.log('Speak into your microphone.');
    recognizer.recognizeOnceAsync(result => {
        console.log(`RECOGNIZED: Text=${result.text}`);
    });
}
fromMic();
