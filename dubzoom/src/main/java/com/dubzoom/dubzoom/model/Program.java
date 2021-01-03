package com.dubzoom.dubzoom.model;

import com.microsoft.cognitiveservices.speech.*;
import com.microsoft.cognitiveservices.speech.translation.*;
import com.microsoft.cognitiveservices.speech.audio.AudioConfig;

import java.io.*;
import java.net.*;
import java.util.*;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;
import java.util.concurrent.Semaphore;

public class Program {
	private static final String subKey = "0adfc48533ba40a890fd572b8ac543de"; 
	private static final String region = "westus2";
	public static Languages l = new Languages();
    public static void main(String[] args) throws InterruptedException, ExecutionException {

       
        try {
			translateSpeech();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ExecutionException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        
    }


    
    static void translateSpeech() throws ExecutionException, FileNotFoundException, InterruptedException, IOException {
        SpeechTranslationConfig translationConfig = SpeechTranslationConfig.fromSubscription(
            subKey, region);
        
        String fromLanguage = "en-US";
        String toLanguage = "ru-RU";
        translationConfig.setSpeechRecognitionLanguage(fromLanguage);
        translationConfig.addTargetLanguage(toLanguage);
        
        translationConfig.setVoiceName(l.byCode.get(toLanguage).voiceName);

        // Translate to languages. See, https://aka.ms/speech/sttt-languages
        
        AudioConfig audioConfig = AudioConfig.fromDefaultMicrophoneInput();
        try (TranslationRecognizer recognizer = new TranslationRecognizer(translationConfig, audioConfig)) {
        	System.out.printf("Say something in '%s' and we'll translate...", fromLanguage);

            TranslationRecognitionResult result = recognizer.recognizeOnceAsync().get();
            if (result.getReason() == ResultReason.TranslatedSpeech) {
            	Map<String, String> languageToVoiceMap = new HashMap<String, String>();
            	int i = toLanguage.indexOf("-");
            	languageToVoiceMap.put(toLanguage.substring(0, i), l.byCode.get(toLanguage).voiceName);
            	
                System.out.printf("Recognized: \"%s\"\n", result.getText());
                for (Map.Entry<String, String> pair : result.getTranslations().entrySet()) {
                	String language = pair.getKey();
                    String translation = pair.getValue();
                    System.out.printf("Translated into '%s': %s\n", language, translation);
                    
                    SpeechConfig speechConfig = SpeechConfig.fromSubscription("0adfc48533ba40a890fd572b8ac543de", "westus2");
                    speechConfig.setSpeechSynthesisVoiceName(languageToVoiceMap.get(language));
                    
                    AudioConfig audioConfig1 = AudioConfig.fromDefaultSpeakerOutput();
                    try (SpeechSynthesizer synthesizer = new SpeechSynthesizer(speechConfig, audioConfig1)) {
                        synthesizer.SpeakTextAsync(translation).get();
                    }
                }
            }
        } catch (InterruptedException e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
        	System.out.print("Broken");
		} catch (ExecutionException e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
			System.out.print("Broken");
		}
        
    }
    
    
}

//class Language {
//	
//	String language;
//	String local;
//	boolean gender;
//	String voiceName;
//	
//	public Language() {}
//}
