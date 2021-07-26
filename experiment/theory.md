**Problem 1**

Let us try to find how many binary numbers can be generated when you are given a fixed number of bits,say n.
n=1, gives  
0,1  
n=2, gives  
00,01,10,11 n=3, gives  
000,001,010,011,100,101,110,111  
etc.  

It can be seen easily by the multiplication principle that for n bits this number is 2n. One of these number corresponds to the 0 in decimal, so the biggest number possible is 2n - 1. Therefore, given a number, say N, it can fit in n bits if N is less than 2^n. Hence, the number of bits required to fit a number N is equal to ceil(log2(N)). Now finding ceil(log2(N)) can be done easily by repeatedly dividing the given number, N, by two until you get 0 as the quotient. For example, let N=96  

Then,  
Step 1 :96/2 gives quotient as 48  
Step 2 :48/2 gives quotient as 24  
Step 3 :24/2 gives quotient as 12  
Step 4 :12/2 gives quotient as 6  
Step 5 :6/2 gives quotient as 3  
Step 6 :3/2 gives quotient as 1  

**Problem 2**

Lets start with an example. Consider the sample input, the given characters are A,B,C and the input string is AC. Assume we are traversing the input string from left to right, say initially we are at 0th position. If instead of 'A' suppose B was present, then all the strings which would start with A would come first than B, right? Thus, the number of strings which come before BC would No_strings which start with A + No_strings which start with B before BC. But luckily we have initial letter as A. Now the 1st character is 'C' , thus we need to count all the strings which start with AB. If instead of 'C' there was a D, then we would have to count the number of strings starting with AB, AC. In this manner we proceed adding the requisite number of strings to our result.

