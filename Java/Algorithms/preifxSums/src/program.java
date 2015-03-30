
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.List;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author denchev
 */
public class program {

    /**
     * @param args the command line arguments
     * @throws java.io.IOException
     */
    public static void main(String[] args) throws IOException {
        BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
        try {
            String line = input.readLine();
            boolean expectIndexes = false;
            List<Double> values = new ArrayList();
            while (line != null) {
                if (expectIndexes) {
                    // Handle end of test case
                    if (line.equals("0")) {
                        line = input.readLine();
                        values.clear();
                        expectIndexes = false;
                        continue;
                    }

                    String[] indexes = line.split(" ");
                    int index1 = Integer.parseInt(indexes[0]);
                    int index2 = Integer.parseInt(indexes[1]);

                    double value1 = values.get(index1 - 1);
                    double value2 = values.get(index2);
                    double result = value2 - value1;
                    //System.out.println(String.format( "%.3f", result ));
                    output.write(String.format( "%.3f", result ));
                    output.write("\n");
                } else {
                    double sum = 0;
                    values.add(sum);
                    String[] valuesArray = line.split(" ");
                    for (String val : valuesArray) {
                        double doubleVal = Double.parseDouble(val);
                        sum += doubleVal;
                        values.add(sum);
                    }

                    expectIndexes = true;
                }
                
                line = input.readLine();
            }
        } finally{
            input.close();
            output.close();
        }
    }
}
