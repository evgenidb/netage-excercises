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

void solve()
{
	long long m1 = 1, m2 = 1;
	for (int i = 1; i <= n; i++)
	{
		m2 = 1;
		for (int c = i + 1; c <= n; c++)
			m2 = (m2 * a[c]) % MOD;
		fprintf(out, "%d%c", (int)((m1 * m2) % MOD), i == n ? '\n' : ' ');
		m1 = (m1 * a[i]) % MOD;
	}
}

int main(void)
{
    in = stdin; out = stdout;
//    in = fopen("Multi.in", "rt"); out = fopen("Multi.out", "wt");

    fscanf(in, "%d", &n);
    for (int i = 1; i <= n; i++)
        fscanf(in, "%d", &a[i]);
    solve();
    return 0;
}
