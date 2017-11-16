chcp 65001
:: @echo off 关闭回显
@echo off

:: echo on 打开回显
echo on

:: %0 路径 %1 %2 参数
echo learn cmd
echo %0

:: > 输出重定向命令 
echo create > create.txt

:: 输出重定向命令 >> 没有则创建, 有则追加
echo createAndPush >> createAndPush.txt

:: 管道
dir . | findstr ".txt"

echo 2033-07-11 > temp.txt
set var = aaaa
: set vara = bbbb
set var < temp.txt
set var

:: ^ 转义字符

:: goto 跳转到标签
goto label1

echo ----------------------------------------
set test = "testtest"
echo "%test%"

::     :标签
: label1

:: cls
cls

:: copy 复制文件 copy file1 copyfile 多文件 copy file1 file2 copyfile
:: del 删除文件 del file1

pause