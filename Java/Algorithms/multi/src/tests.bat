REM ECHO OFF
javac program.java

FOR %%X IN ( *.in ) DO java program < %%~nX.in > %%~nX.mine
FOR %%X IN ( *.sol ) DO FC /L /N /T %%~nX.sol %%~nX.mine

java program -many-tests < test.bigin > test.mine
FC /L /N /T test.mine test.ans