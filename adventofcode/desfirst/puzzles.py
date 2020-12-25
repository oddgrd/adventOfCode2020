my_file = "/home/oddgrd/adventofcode/desThird/data.txt"


with open(my_file) as f:
    mylist = [int(line.rstrip('\n')) for line in f]

def findtwentytwenty(lst):
    for nr in lst:
        for num in list(reversed(lst)):
            if nr + num == 2020:
                return nr * num

def findThree(lst):
    for i in range(len(lst)):
        for j in range(1, len(lst)):
            for y in range(2, len(lst)):
                if lst[i] + lst[j]  + lst[y] == 2020:
                    return lst[i] * lst[j] * lst[y]

print(findThree(mylist))

