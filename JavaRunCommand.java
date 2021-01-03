import java.io.*;

public class JavaRunCommand {

    public static void main(String args[]) {

        String s = null;

        try {
            
	    // run the Unix "ps -ef" command
            // using the Runtime exec method:
            String[] cmd = {
                "python3", 
                "APITextHandler.py",
                "cow"
            };
            Process p = Runtime.getRuntime().exec(cmd);
            
            System.exit(0);
        }
        catch (IOException e) {
            System.out.println("exception happened - here's what I know: ");
            e.printStackTrace();
            System.exit(-1);
        }
    }
}
