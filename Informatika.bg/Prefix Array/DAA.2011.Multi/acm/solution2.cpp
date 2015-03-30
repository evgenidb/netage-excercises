/*
ID: espr1t
LANG: C++
TASK: Multi
KEYWORDS: Prefix Arrays
*/

#include <cstdio>

#define MAX 131072
#define MOD 1000000007
FILE *in; FILE *out;

int n;
int a[MAX];

long long fastPow(long long num, int pwr)
{
	long long res = 1;
	while (pwr)
	{
		if (pwr & 1) res = (res * num) % MOD;
		num = (num * num) % MOD; pwr >>= 1;
	}
	return res;
}

void solve()
{
	long long res = 1;
	for (int i = 1; i <= n; i++)
		res = (res * a[i]) % MOD;
	
	for (int i = 1; i <= n; i++)
		fprintf(out, "%d%c", (int)((res * fastPow(a[i], MOD - 2)) % MOD), i == n ? '\n' : ' ');
}

int main(void)
{
    in = stdin; out = stdout;
//    in = fopen("Multi.in", "rt"); out = fopen("Multi.out", "wt");

    int numTests;
    fscanf(in, "%d", &numTests);
    for (int test = 0; test < numTests; test++)
    {
        fscanf(in, "%d", &n);
        for (int i = 1; i <= n; i++)
            fscanf(in, "%d", &a[i]);
        solve();
    }
    return 0;
}
