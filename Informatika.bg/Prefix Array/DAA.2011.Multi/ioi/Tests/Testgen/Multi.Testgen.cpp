/*
ID: espr1t
LANG: C++
TASK: Multi
KEYWORDS: Testgen
*/

#include <cstdio>
#include <cstdlib>

#define MAX 131072
FILE *out;

int n;
int a[MAX];

void sampleOne()
{
	n = 5;
	a[0] = 5; a[1] = 1; a[2] = 3; a[3] = 2; a[4] = 7;
}

void sampleTwo()
{
	n = 6;
	a[0] = 1337; a[1] = 13; a[2] = 42; a[3] = 666; a[4] = 1234; a[5] = 4321;
}

void randomTest(int n_)
{
	n = n_;
	for (int i = 0; i < n; i++)
		a[i] = rand() % 5000 + 1;
}

void printTest()
{
	fprintf(out, "%d\n", n);
	for (int i = 0; i < n; i++)
		fprintf(out, "%d%c", a[i], i + 1 == n ? '\n' : ' ');
}

int main(void)
{
	int sizes[20] = {5, 10, 20, 50, 100, 500, 1000, 5000, 8000, 10000,
					 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 100000};

	int numTests = 20;
	for (int test = 1; test <= numTests; test++)
	{
		char outFile[32];
		sprintf(outFile, "Multi.%02d.in", test);
		out = fopen(outFile, "wt");

		if (test == 0) sampleOne();
		if (test == 1) sampleTwo();
		if (test >= 2) randomTest(sizes[test - 1]);
		printTest();
		fclose(out);
	}
	return 0;
}
