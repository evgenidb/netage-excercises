
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

/**
 *
 * @author denchev
 */
public class program {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        int testCases = input.nextInt();

        for (int testCase = 0; testCase < testCases; testCase++) {
            // Handle User input
            long pipesCount = input.nextInt();
            long pieces = input.nextInt();
            
            long maxLength = 0;
            
            HashMap<Long, Long> pipes = new HashMap();
            long allPipesLength = 0;
            for (long pipeIndex = 0; pipeIndex < pipesCount; pipeIndex++) {
                long pipeLength = input.nextInt();
                if (pipes.containsKey(pipeLength)) {
                    pipes.put(pipeLength, pipes.get(pipeLength) + 1);
                } else {
                    pipes.put(pipeLength, (long)1);
                }
                allPipesLength += pipeLength;
            }
            
            // Find max Pipe Length
            long maxPossibleLength = allPipesLength / pieces;
            
            long lengthToSearch = maxPossibleLength;
            long oldLength = 0;
            long halfLength = lengthToSearch;
            while (lengthToSearch != oldLength) {
                boolean moreLength;
                long maxPieces = 0;
                
                HashMap<Long, Long> longEnoughPipes = new HashMap();
                for (Map.Entry<Long, Long> pipeDataPair : pipes.entrySet()) {
                    long pipeLength = pipeDataPair.getKey();
                    long piecesFromThisPipe = pipeLength / lengthToSearch;
                    if (piecesFromThisPipe > 0) {
                        long pipesWithLength = pipeDataPair.getValue();
                        maxPieces += (pipeLength / lengthToSearch) * pipesWithLength;
                        longEnoughPipes.put(pipeLength, pipesWithLength);
                    }
                }
                
                if (maxPieces < pieces) {
                    moreLength = false;
                } else {
                    if (maxPossibleLength == lengthToSearch) {
                        maxLength = lengthToSearch;
                        break;
                    }
                    maxLength = lengthToSearch;
                    moreLength = true;
                    if (maxPieces == pieces) {
                        halfLength = 1;
                    }
                }
                
                oldLength = lengthToSearch;
                halfLength = Math.max(1, halfLength / 2);
                if (moreLength) {
                    lengthToSearch += halfLength;
                    pipes = longEnoughPipes;
                } else {
                    lengthToSearch -= halfLength;
                    if (lengthToSearch == maxLength) {
                        break;
                    }
                }
            }
            
            // Display Result
            System.out.println(maxLength);
        }
    }
    
}