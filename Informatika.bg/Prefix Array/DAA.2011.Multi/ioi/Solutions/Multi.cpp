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
long long fwd[MAX], bck[MAX];

void solve()
{
	fwd[0] = 1;
	for (int i = 1; i <= n; i++)
		fwd[i] = (fwd[i - 1] * a[i]) % MOD;
	bck[n + 1] = 1;
	for (int i = n; i >= 1; i--)
		bck[i] = (bck[i + 1] * a[i]) % MOD;
	
	for (int i = 1; i <= n; i++)
		fprintf(out, "%d%c", (int)((fwd[i - 1] * bck[i + 1]) % MOD), i == n ? '\n' : ' ');
}

int main(void)
{
    in = stdin; out = stdout;
//    in = fopen("Multi.in", "rt"); out = fopen("Multi.sol", "wt");

    fscanf(in, "%d", &n);
    for (int i = 1; i <= n; i++)
        fscanf(in, "%d", &a[i]);
    solve();

    return 0;
}
