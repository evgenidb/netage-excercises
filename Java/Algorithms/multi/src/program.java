
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

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
        int testCases = 1;
        if (args.length > 0 && args[0].equals("-many-tests")) {
            testCases = Integer.parseInt(input.readLine());
        }

        for (int testCase = 0; testCase < testCases; testCase++) {
            input.readLine();
            BigInteger allAttack = BigInteger.ONE;
            List<Long> attacks = new ArrayList();
            String[] attackLine = input.readLine().split(" ");
            for (String attackString : attackLine ) {
                long attack = Long.parseLong(attackString);
                attacks.add(attack);
                allAttack = allAttack.multiply(BigInteger.valueOf(attack));
            }
            
            BigInteger modulo = BigInteger.valueOf(1000000007);
            StringBuilder result = new StringBuilder();
            for (Long attack : attacks) {
                long newAttack =
                        allAttack
                                .divide(BigInteger.valueOf((long) attack))
                                .mod(modulo).longValueExact();
                result.append(newAttack).append(" ");
            }
            result.deleteCharAt(result.length() - 1);
            output.write(result.toString());
        }
        }
        finally {
            input.close();
            output.close();
        }
    }   
}
