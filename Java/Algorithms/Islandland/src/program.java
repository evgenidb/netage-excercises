import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Scanner;
import java.util.Set;
import java.util.Stack;

/**
 *
 * @author denchev
 */
class program {
    
    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        int testCases = input.nextInt();

        for (int testCase = 0; testCase < testCases; testCase++) {
            // User Input
            int crossroadsCount = input.nextInt();
            int streetsCount = input.nextInt();

            int startCrossroad = input.nextInt();
            int targetCrossroad = input.nextInt();

            List<List<Connection>> graph = new ArrayList();
            for (int crossroadIndex = 0; crossroadIndex < crossroadsCount; crossroadIndex++) {
                graph.add(crossroadIndex, new ArrayList());
            }

            for (int streetIndex = 0; streetIndex < streetsCount; streetIndex++) {
                int start = input.nextInt();
                int target = input.nextInt();
                double length = input.nextDouble();

                Connection street = new Connection(target, length);

                graph.get(start - 1).add(street);
            }

            // Find Path
            Stack<Integer> crossroadsStack = new Stack();
            Stack<Connection> streetsStack = new Stack();
            Set<Integer> visited = new HashSet();
            HashMap<Integer, Integer> iterator = new HashMap();
            for (int i = 0; i < graph.size(); i++) {
                iterator.put(i, 0);
            }

            crossroadsStack.add(startCrossroad);
            visited.add(startCrossroad);

            while (crossroadsStack.size() > 0 &&
                    crossroadsStack.peek() != targetCrossroad) {
                int crossroadId = crossroadsStack.peek() - 1;
                List<Connection> connections = graph.get(crossroadId);
                if (connections.size() > 0) {
                    Connection street = null;
                    for (int i = iterator.get(crossroadId); i < connections.size(); i++) {
                        Connection connection = connections.get(i);
                        if (!visited.contains(connection.TargetCrossroad)) {
                            street = connection;
                            iterator.put(crossroadId, i);
                            break;
                        }
                    }

                    if (street != null) {
                        crossroadsStack.push(street.TargetCrossroad);
                        streetsStack.add(street);
                        visited.add(street.TargetCrossroad);
                    } else {
                        crossroadsStack.pop();
                        if (streetsStack.size() > 0) {
                            streetsStack.pop();
                        }
                    }
                } else {
                    crossroadsStack.pop();
                    if (streetsStack.size() > 0) {
                        streetsStack.pop();
                    }
                }
            }

            // Display Result
            // If No Path
            if (crossroadsStack.size() < 1) {
                System.out.println(-1);
                continue;
            }

            double length = 0;
            for (Connection conn : streetsStack) {
                length += conn.Length;
            }

            // If Have path
            System.out.println(crossroadsStack.size() + " " + length);

            StringBuilder sb = new StringBuilder();
            for (int id : crossroadsStack) {
                sb.append(id).append(" ");
            }
            if (sb.length() > 0) {
                sb.deleteCharAt(sb.length() - 1);
            }
            System.out.println(sb.toString());
        }
    }

    public static class Connection {
        public int TargetCrossroad;

        public double Length;

        public Connection (int target, double length) {
            TargetCrossroad = target;
            Length = length;
        }
    }
}