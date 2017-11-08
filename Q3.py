 def InTheRange(interval,insertInterval):
        newInterval = [0,0]
    if(all(item>= interval[0] and item<= interval[1] for item in insertInterval )):
        newInterval = interval
    elif(insertInterval[0]< interval[0] and insertInterval[1]> interval[1]):
        newInterval = insertInterval
    elif(insertInterval[0]> interval[0] and insertInterval[0]< interval[1]):
        newInterval[0] = interval[0]
        newInterval[1] = insertInterval[1]
    elif(insertInterval[1]> interval[0] and insertInterval[1]< interval[1]):
        newInterval[0] = insertInterval[0]
        newInterval[1] = interval[1]
    else:
        return None
    return newInterval

# Initial input
initialIntervals = []
while(True):
    interval = input()
    if(interval =='0'): break
    if(len(interval.split())!= 2):
        print("Wrong range!")
        continue
    initialIntervals.append(list(map(int,interval.split())))
print("Initial intervals : " +str(initialIntervals))
insertInterval = list(map(int,input("Please insert a interval : ").split()))
print(insertInterval)

# Start insert
lastNewInterval = insertInterval
replaceFlag = 0
i=0
while(i<len(initialIntervals)):
    newInterval = InTheRange(initialIntervals[i],lastNewInterval)
    if newInterval != None:
        lastNewInterval = initialIntervals[i] = newInterval
        if replaceFlag == 0: replaceFlag = 1
        else: 
            i=i-1
            initialIntervals.remove (initialIntervals[i])
    i = i+1

# Result
print("After insert : ")
print(initialIntervals)
