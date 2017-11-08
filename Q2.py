def IsPerfectSquare(number):
    factor = 1
    while(number>0):
        number = number - factor
        factor = factor+2;
    return 0==number

number = int(input("please input a number: "))
print(IsPerfectSquare(number))
