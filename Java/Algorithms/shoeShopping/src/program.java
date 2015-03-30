import java.util.ArrayList;
import java.util.List;
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
        
        int shoesCount = input.nextInt();
        int queriesCount = input.nextInt();
        
        List<Long> shoePrices = new ArrayList();
        
        for (int shoeIndex = 0; shoeIndex < shoesCount; shoeIndex++) {
            long price = input.nextLong();
            shoePrices.add(price);
        }
        shoePrices.sort(null);
        
        List<Long> summedPrices = new ArrayList();
        long sum = 0;
        for (Long price : shoePrices) {
            sum += price;
            summedPrices.add(sum);
        }
        
        for (int queryIndex = 0; queryIndex < queriesCount; queryIndex++) {
            long budget = input.nextLong();
            long topPrice = input.nextLong();
            
            // Quickly handle the easy cases.
            if (shoePrices.size() < 1 ||
                    budget == 0 ||
                    topPrice == 0) {
                System.out.println(0);
                continue;
            } else if (topPrice < shoePrices.get(0) ||
                    budget < shoePrices.get(0)) {
                System.out.println(0);
                continue;
            } else if (shoePrices.get(shoePrices.size() - 1) <= topPrice &&
                    summedPrices.get(summedPrices.size() - 1) <= budget) {
                System.out.println(shoesCount);
                continue;
            }
            
            // Binary search for the most expensive shoe we can buy
            int endPriceIndex = binarySearchLower(shoePrices, topPrice, shoesCount - 1);
            
            int startPriceIndex = 0;
            long minPrice = summedPrices.get(endPriceIndex) - budget;
            if (minPrice > 0) {
                startPriceIndex = binarySearchBigger(summedPrices, minPrice, endPriceIndex);
                endPriceIndex--;
            }
            
            System.out.println(endPriceIndex - startPriceIndex + 1);
        }
        
        input.close();
    }
    
    private static int binarySearchLower(List<Long> list, long maxPrice, int biggestIndex) {
        // Handle the easiest cases
        if (list.get(list.size() - 1) < maxPrice) {
            return biggestIndex;
        }
        
        // Handle the rest of the cases
        int index = biggestIndex;
        
        int halfIndex = biggestIndex;
        boolean continueSearching = true;
        while (continueSearching) {
            long currentPrice = list.get(index);
            halfIndex = Math.max(1, (halfIndex / 2));
            
            if (currentPrice < maxPrice) {
                if ((index + 1) <= biggestIndex &&
                        list.get(index + 1) > maxPrice) {
                    break;
                }
                index += halfIndex;
            } else if (currentPrice > maxPrice) {
                index -= halfIndex;
            } else {
                // currentPrice == maxPrice
                while ((index + 1) <= biggestIndex &&
                        list.get(index + 1) == maxPrice) {
                    index++;
                }
                break;
            }
        }
        return index;
    }
    
    private static int binarySearchBigger(List<Long> list, long minPrice, int biggestIndex) {
        // Handle the easiest cases
        if (minPrice < list.get(0)) {
            return 0;
        }
        
        // Handle the rest of the cases
        int index = biggestIndex;
        
        int halfIndex = biggestIndex;
        boolean continueSearching = true;
        while (continueSearching) {
            long currentPrice = list.get(index);
            halfIndex = Math.max(1, (halfIndex / 2));
            
            if (currentPrice < minPrice) {
                index += halfIndex;
            } else if (currentPrice > minPrice) {
                if ((index - 1) >= 0 &&
                        list.get(index - 1) < minPrice) {
                    break;
                }
                index -= halfIndex;
            } else {
                // currentPrice == maxPrice
                while ((index - 1) >= 0 &&
                        list.get(index - 1) == minPrice) {
                    index--;
                }
                break;
            }
        }
        
        return index;
    }
}
