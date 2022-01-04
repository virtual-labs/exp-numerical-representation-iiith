How are number represented in C? In this lab we help you understand how numbers are repsented in C and based on that two problems are given.The 1st is simple to solve while the second one is little tricky.

**Problem 1:**

Given a positive integer (<= 1000000), find the minimum number of bits required to represent it as a binary number.

**Input Specification**  

Input contains a single positive integer(< 106).


**Output Specification**  

Output the minimum number of bits required for the representing in binary.  


**Sample Input and Output**

Input: 4  
Output:3  
Input: 16  
Output: 5  



**Problem 2:**

Given N(<=26) followed by N distinct characters, we can find all possible 2N words(sequence of characters) which preserve the ordering in the input (assuming that all words are valid words in the language). For example, if N is 3 and chatacters are A, B and C, the words in the alphabet order are A, AB, ABC, AC, B, BC and C. Your task now, is to find the index of the word in the dictionary. i.e., if input is AC, output is 4. You may avoid generating all the words and comparing the word with every word in the dictionary.


**Input Specification**

Input contains a number N representing the number of alphabets(<=26) followed by a space and N characters in the dictionary listed in lexicographic order and then a valid word present in dictionary.


**Output Specification**

Output must be the index of the word in the dictionary.


**Sample Input and Output**

Input: 3 A B C AC  
Output: 4  
Input: 3 A B C BC  
Output: 6  



