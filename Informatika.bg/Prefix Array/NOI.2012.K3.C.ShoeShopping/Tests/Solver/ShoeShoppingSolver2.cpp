/*
ID: espr1t
LANG: C++
TASK: ShoeShopping
KEYWORDS: Easy, Binary Search, Preffix Array
*/

#include <ctime>
#include <cstdio>
#include <algorithm>

#define MAX 131072
FILE* in; FILE* out;

int a[MAX], n, q;
long long sums[MAX];

int query(int money, int maxVal)
{
    int off = n + 1;
    int left = 1, right = n;
    while (left <= right)
    {
        int mid = (left + right) / 2;
        if (a[mid] <= maxVal)
            off = mid, right = mid - 1;
        else
            left = mid + 1;
    }
    
    /*
    int off = n + 1;
    while (off > 1 && a[off - 1] <= maxVal)
        off--;
    */

    int ans = 0;
    for (int i = off; i < n; i++)
    {
        if (money < a[i])
            break;
        money -= a[i]; ans++;
    }
    return ans;
    
    /*
    int left, right;
    int ret = off - 1;
    left = off; right = n;
    while (left <= right)
    {
        int mid = (left + right) / 2;
        if (sums[mid] - sums[off - 1] <= money)
            ret = mid, left = mid + 1;
        else
            right = mid - 1;
    }
    return ret - off + 1;
    */
}

int main(void)
{
    int numTests = 20;
    for (int test = 0; test <= numTests; test++)
    {
        unsigned sTime = clock();
        fprintf(stderr, "Currently solving testcase nr.%d...\n", test);
        
        char inpFile[32], outFile[32];
        sprintf(inpFile, "ShoeShopping.%02d.in", test);
        sprintf(outFile, "ShoeShopping.%02d.out", test);
        FILE* in = fopen(inpFile, "rt");
        FILE* out = fopen(outFile, "wt");
        fscanf(in, "%d %d", &n, &q);
        for (int i = 1; i <= n; i++)
            fscanf(in, "%d", &a[i]);
        std::sort(a + 1, a + n + 1);
        std::reverse(a + 1, a + n + 1);
        
        sums[0] = 0;
        for (int i = 1; i <= n; i++)
            sums[i] = sums[i - 1] + a[i];
        
        for (int i = 0; i < q; i++)
        {
            int money, maxVal;
            fscanf(in, "%d %d", &money, &maxVal);
            fprintf(out, "%d\n", query(money, maxVal));
        }
        fprintf(stderr, "  -- execution time: %.3lfs.\n",
            (double)(clock() - sTime) / CLOCKS_PER_SEC);
        fclose(in); fclose(out);
    }
    fprintf(stderr, "Finished solving all test cases.\n");

    return 0;
}
