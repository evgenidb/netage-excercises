REM ECHO OFF
javac program.java

java program < a.in > a.mine
FC /L /N /T a.out a.mine