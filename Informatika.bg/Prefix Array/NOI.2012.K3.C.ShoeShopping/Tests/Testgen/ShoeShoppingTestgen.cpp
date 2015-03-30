/*
ID: espr1t
LANG: C++
TASK: ShoeShopping
KEYWORDS: Testgen
*/

#include <cstdio>
#include <cstdlib>
#include <algorithm>

#define MAX 131072
using namespace std;

int a[MAX], n;
int qwr[MAX][2], q;


void sampleInput()
{
    n = 7; q = 5;
    a[0] = 70; a[1] = 10; a[2] = 130; a[3] = 50; a[4] = 40; a[5] = 20; a[6] = 40;
    qwr[0][0] = 150; qwr[0][1] = 100;
    qwr[1][0] = 140; qwr[1][1] = 50;
    qwr[2][0] = 190; qwr[2][1] = 130;
    qwr[3][0] = 60;  qwr[3][1] = 80;
    qwr[4][0] = 300; qwr[4][1] = 60;
}

void sampleModified()
{
    n = 7; q = 5;
    a[0] = 40; a[1] = 20; a[2] = 130; a[3] = 50; a[4] = 40; a[5] = 10; a[6] = 70;
    qwr[0][0] = 60;  qwr[0][1] = 80;
    qwr[1][0] = 190; qwr[1][1] = 130;
    qwr[2][0] = 300; qwr[2][1] = 60;
    qwr[3][0] = 150; qwr[3][1] = 100;
    qwr[4][0] = 140; qwr[4][1] = 50;
}

void equalPrices(int lim)
{
    n = 20; q = 20;
    for (int i = 0; i < n; i++)
        a[i] = 3;
    for (int i = 0; i < q; i++)
        qwr[i][0] = rand() % (lim * 10) + 1, qwr[i][1] = rand() % lim + 1;
}

void singleSetOfShoes()
{
    n = 1; q = 4;
    a[0] = 42;
    qwr[0][0] = 13; qwr[0][1] = 13;
    qwr[1][0] = 47; qwr[1][1] = 13;
    qwr[2][0] = 13; qwr[2][1] = 47;
    qwr[3][0] = 47; qwr[3][1] = 47;
}

void buyAll()
{
    n = 5; q = 30;
    a[0] = 1; a[1] = 2; a[2] = 3; a[3] = 4; a[4] = 5;
    for (int i = 0; i < q; i++)
        qwr[i][0] = i + 1, qwr[i][1] = q - i;
}

// Finding first shoes is time expensive
void worstPossible1(int lim)
{
    n = lim; q = lim;
    for (int i = 0; i < n; i++)
        a[i] = rand() % lim + 1;
    sort(a, a + n);
    for (int i = 0; i < q; i++)
    {
        qwr[i][0] = lim * 10 - rand() % (lim / 5);
        qwr[i][1] = a[n / 2 + rand() % (n / 5) - n / 10];
    }
    random_shuffle(a, a + n);
}

// Finding result is time expensive
void worstPossible2(int lim)
{
    n = lim; q = lim;
    for (int i = 0; i < n; i++)
        a[i] = rand() % 10 + 1;
    sort(a, a + n);
    for (int i = 0; i < q; i++)
    {
        qwr[i][0] = lim * 10 - rand() % (lim / 5);
        qwr[i][1] = a[min(n - 1, n / 2 + rand() % (n / 2))];
    }
    random_shuffle(a, a + n);
}

void randomTest(int lim)
{
    n = min(lim, lim / 2 + rand() % (lim / 2));
    q = min(lim, lim / 2 + rand() % (lim / 2));
    for (int i = 0; i < n; i++)
        a[i] = rand() % lim + 1;
    for (int i = 0; i < q; i++)
        qwr[i][0] = rand() % (lim * 10) + 1, qwr[i][1] = rand() % lim + 1;
}

void printTest(int testNum)
{
    char fileName[32];
    sprintf(fileName, "ShoeShopping.%02d.in", testNum);
    FILE* out = fopen(fileName, "wt");
    fprintf(out, "%d %d\n", n, q);
    for (int i = 0; i < n; i++)
        fprintf(out, "%d%c", a[i], i + 1 == n ? '\n' : ' ');
    for (int i = 0; i < q; i++)
        fprintf(out, "%d %d\n", qwr[i][0], qwr[i][1]);
}

int main(void)
{
    srand(42);
    int numTests = 20;
    for (int test = 0; test <= numTests; test++)
    {
        if (test == 0) sampleInput();
        if (test == 1) sampleModified();
        if (test == 2) equalPrices(100);
        if (test == 3) singleSetOfShoes();
        if (test == 4) buyAll();
        if (test == 5) worstPossible1(100);
        if (test == 6) randomTest(100);
        if (test == 7) randomTest(20000);
        if (test == 8) randomTest(20000);
        if (test == 9) randomTest(20000);
        if (test == 10) randomTest(20000);
        if (test == 11) worstPossible1(20000);
        if (test == 12) worstPossible2(20000);
        if (test == 13) randomTest(100000);
        if (test == 14) randomTest(100000);
        if (test == 15) worstPossible1(100000);
        if (test == 16) worstPossible1(100000);
        if (test == 17) worstPossible1(100000);
        if (test == 18) worstPossible2(100000);
        if (test == 19) worstPossible2(100000);
        if (test == 20) worstPossible2(100000);

        printTest(test);
    }
    return 0;
}
