#include <stdio.h>
#include <time.h>
/*
name:计算器
mains:void
oat:char
*/
int main() {
    char operator;
    double firstNumber,secondNumber;

    printf("输入运算符 +-*/:\a ");
    scanf("%c", &operator);

    printf("输入两个数字:\a ");
    scanf("%lf %lf",&firstNumber, &secondNumber);

    switch(operator)
    {
    case '+':
        printf("%.2lf + %.2lf = %.2lf",firstNumber, secondNumber, firstNumber + secondNumber);
        break;

    case '-':
        printf("%.2lf - %.2lf = %.2lf",firstNumber, secondNumber, firstNumber - secondNumber);
        break;

    case '*':
        printf("%.2lf * %.1lf = %.1lf",firstNumber, secondNumber, firstNumber * secondNumber);
        break;

    case '/':
        printf("%.2lf / %.2lf = %.2lf",firstNumber, secondNumber, firstNumber / secondNumber);
        break;
        
        case '%':
        printf("%.2lf %  %.2lf = %.2lf",firstNumber, secondNumber, firstNumber / secondNumber);
        break;
        
        case 'e':
        printf("退出!\a");
        break;
        
        case 'r':
        return 0;

    // operator doesn't match any case constant (+, -, *, /)
    default:
        printf("没有指定操作符\a");
    }
    return 0;
}