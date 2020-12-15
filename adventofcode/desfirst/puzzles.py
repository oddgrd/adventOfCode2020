my_file = "/home/oddgrd/adventofcode/desThird/data.txt"


with open(my_file) as f:
    mylist = [int(line.rstrip('\n')) for line in f]


test = [1, 2, 3]
counter = 0
reversedlst = list(reversed(mylist))
isit = 0

#print(mylist)
def findtwentytwenty(lst):
    for nr in lst:
        for num in list(reversed(lst)):
            if nr + num == 2020:
                return nr * num

#print(findtwentytwenty(mylist))
#print(list(enumerate(mylist))[0][1])
mylistEnum = list(enumerate(mylist))
reversedEnum = list(enumerate(reversedlst))
#for tup in mylistEnum:
    #print(tup[1])


def findThree(lst):
    for i in range(len(lst)):
        for j in range(1, len(lst)):
            for y in range(2, len(lst)):
                if lst[i] + lst[j]  + lst[y] == 2020:
                    return lst[i] * lst[j] * lst[y]



print(findThree(mylist))
#print(len(mylist))
