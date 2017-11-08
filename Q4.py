import copy
def InsertBoard():
    board = []
    while(True):
        raw = input()
        if(raw =='0'): break
        board.append(raw.split())
    return board

def DFS(x,y,word):
    if len(word) == 0: return True
    #Right
    if y < rawCount-1 and board[x][y+1] == word[0]:
        reverse = board[x][y]
        board[x][y] = '0'
        if DFS(x,y+1,word[1:]):
            return True
        board[x][y] = reverse   
    #Left
    if y > 0 and board[x][y-1] ==word[0]:
        reverse = board[x][y]
        board[x][y] = '0'
        if DFS(x,y-1,word[1:]):
            return True
        board[x][y] = reverse 
    #Down
    if x < columnCount-1 and board[x+1][y] == word[0]:
        reverse = board[x][y]
        board[x][y] = '0'
        if DFS(x+1,y,word[1:]):
            return True
        board[x][y] = reverse     
    # Up
    if x > 0 and board[x-1][y] == word[0]:
        reverse = board[x][y]
        board[x][y] = '0'
        if DFS(x-1,y,word[1:]):
            return True
        board[x][y] = reverse
    return False


print("Please insert a Board : ")
initialBoard = InsertBoard()
rawCount = len(initialBoard[0])
columnCount = len(initialBoard)

while(True):
    board = copy.deepcopy(initialBoard)
    word =list( input("Please input a word(type 0 to exit) : "))
    if word == ['0']: break
    result = False
    for i in range(0,columnCount):
        for j in range(0,rawCount):
            if board[i][j] == word[0]:
               if DFS(i,j,word[1:]):
                   result = True
    print(result)