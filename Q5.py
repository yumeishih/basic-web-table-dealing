def Sum(a,b):
    if a == 0: return b
    if b == 0: return a
    while(b!=0):
        carry = a&b 
        a = a^b 
        b = carry << 1
    return a 

a = int(input("number1 :"))
b = int(input("number2 :"))
print(Sum(a,b))