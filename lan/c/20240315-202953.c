#include <stdio.h>
#include <time.h>
int main(void){
    int Linux =0;
    printf("加载中......\a\n");
    system("sleep 1");
    printf("执行命令:\a");
    scanf("%d",&Linux);
    switch (Linux)
    {
      case 0:system("sh");break;
      case 1:printf("打印:1\n\a  ");break;
      case 2:printf("打印:2\n\a  ");break;
      case 3:printf("打印:3\n\a  ");break;
      case 4:printf("打印:4\n\a  ");break;
      case 5:printf("打印:5\n\a  ");break;
      case 6:printf("打印:6\n\a  ");break;
      case 7:printf("打印:7\n\a  ");break;
      case 8:printf("打印:8\n\a  ");break;
      case 9:printf("打印:9\n\a  ");break;
      case 10:printf("打印:0\n\a  ");break;
      case 11:system("yes 我爱你");break;
      case 12:system("ps");break;
      case 13:system("clear;sleep 2");break;
      case 14:printf("classes.dex文件已经准备好\n\n\n>\a  ");system("sleep 2");break;
      case 15:printf("main.c-开发者选项:\n\a  ");system("sleep 2");printf("A:ime  B:su  C:oshare  D:ap  E:adb\a");break;
      default:printf("sorry 404-not found\a\n\n");
    }
    return 0;
}
    