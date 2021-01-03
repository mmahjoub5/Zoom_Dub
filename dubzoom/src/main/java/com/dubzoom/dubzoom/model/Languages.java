package com.dubzoom.dubzoom.model;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.HashMap;
import java.util.concurrent.ExecutionException;

public class Languages {
	public static HashMap<String,Language> byLang;
    public static HashMap<String,Language> byCode; 
    
    public Languages() {
    	
    	byLang = new HashMap<String,Language>();
    	byCode = new HashMap<String,Language>();
    	URL url;
		try {
			url = new URL("https://docs.microsoft.com/en-us/azure/cognitive-services/speech-service/language-support#speech-translation");
			URLConnection con = url.openConnection();
	        InputStream is =con.getInputStream();
	        BufferedReader br = new BufferedReader(new InputStreamReader(is));

	        String line = null;
	        StringBuffer str = new StringBuffer();
	        // read each line and write to System.out
	        while ((line = br.readLine()) != null) {
	            str.append(line);
	        }
	        String s1 = str.toString();
	        String[] s2 = s1.split("<table>");
	        
	        s1 = s2[s2.length-3];
	        String[] s3 = s1.split("</table>");
	        //System.out.println("\n" + s3.length);
	        s1 = s3[0];
//	        System.out.println(s1.replace("<thead>", ""));
//	        System.out.println(s1.replace("<tr>", ""));
//	        System.out.println(s1.replace("</th>", " "));
	        s1= s1.replace("<thead>", "");
	        s1= s1.replace("<tr>", "");
	        s1= s1.replace("</th>", "");
	        s1= s1.replace("</td>", "");
	        s1= s1.replace("<td>", "");
	        s1= s1.replace("<th>", "");
	        s1= s1.replace("<code>", "</code>");
	        s1= s1.replace("</thead>", "");
	        s1= s1.replace("<tbody>", "");
	        s1= s1.replace("</th>", "");
	        s1= s1.replace("</tr>", "");
	        int j = s1.indexOf("</tbody");
	        s1 = s1.substring(39, j);
	        
	        String[] s4 = s1.split("</code>");
	        //for(String e : s4) System.out.println(e);
	        
	        
	        int i = 0;
	        while(i < s4.length) {
	        	
	        		Language l = new Language();
	        		l.language = s4[i++].replace(" ", "");
	        		//System.out.println(l.local);
	        		//int m = s4[i].indexOf("-");
	        		l.local = s4[i++].replace(" ", "");
	        		//System.out.println(l.local);
	        		if(s4[i++].equals("Male")) l.gender = true;
	        		else l.gender = false;
	        		l.voiceName = s4[i++];
	        		byLang.put(l.language, l);
	        		byCode.put(l.local, l);
	        		
	        		
	        }


		} catch (MalformedURLException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

}
}
class Language {
	
	String language;
	String local;
	boolean gender;
	String voiceName;
	
	public Language() {}
}
