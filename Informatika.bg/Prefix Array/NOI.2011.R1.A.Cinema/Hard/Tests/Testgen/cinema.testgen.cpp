#include <cstdio>
#include <cstdlib>

int main(void)
{
	FILE *out = fopen("cinema.in", "wt");
	
	srand(18);
	
	int n = 101 + rand() % 900;
	int m = 101 + rand() % 900;
	int r = 1 + rand() % (n / 10);
	int c = 1 + rand() % (m / 10);

	int occ = 5 + rand() % 200;
	
	n = 1000; m = 1000;
	r = 500; c = 500;
	occ = 660000;

	fprintf(out, "%d %d\n", n, m);
	fprintf(out, "%d %d\n", r, c);
	

	for (int row = 0; row < n; row++)
	{
		for (int col = 0; col < m; col++)
//			if ((row == n / 2 || row == n / 2 + 1) && (col == m / 2 || col == m / 2 + 1))
//				fprintf(out, "#");
//			else
				fprintf(out, ".");
//			fprintf(out, "%c", rand() % occ == 0 ? '#' : '.');
		fprintf(out, "\n");
	}	
	return 0;
}
