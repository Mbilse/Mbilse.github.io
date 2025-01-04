#include <stdio.h>
#include <stdlib.h>
int main(int argc, char** argv){
char c;
    printf("输入字符:\a");
    scanf("%c",&c);
    printf("%c的ASCII码是%d\n\a",c,c);
    return 0;
}
