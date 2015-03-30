REM ECHO OFF
javac program.java

FOR %%X IN ( *.in ) DO java program < %%~nX.in > %%~nX.mine
FOR %%X IN ( *.sol ) DO FC /L /N /T %%~nX.sol %%~nX.mine


REM for debug ONLY
REM FOR %%X IN ( *.in ) DO java program < %%~nX.in