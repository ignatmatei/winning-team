import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
public class Main {

    public static void main(String[] args) {
        try {
            ProcessBuilder processBuilder = new ProcessBuilder("./hello.sh", "alabala");
            String amprimit = "alabala";
            StringBuilder output = new StringBuilder();
            Process process = processBuilder.start();
            BufferedReader reader = new BufferedReader  (
                    new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line + "\n");
            }
            int exitCode = process.waitFor();
            if (exitCode == 0) {
                System.out.println(output);
                System.exit(0);
            } else {
                System.out.println(exitCode);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("An unexpected error occurred!");
        }
    }
}