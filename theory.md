This experiment is based on two fundamental principles in computer science:

**1. Binary Representation of Numbers**
Computers store and process numbers in binary (base-2) form, where each digit (bit) is either 0 or 1. The minimum number of bits required to represent a positive integer $N$ is given by:

$$ n = \lceil \log_2(N+1) \rceil $$

This formula ensures that all numbers from 0 up to $N$ can be uniquely represented. For example, the decimal number 4 in binary is 100, which requires 3 bits. The process of converting a decimal number to binary involves repeated division by 2, recording the remainders.

**2. Lexicographical Indexing of Ordered Subsets**
Given $N$ distinct characters, the number of non-empty ordered subsets (combinations preserving order) is $2^N - 1$. To find the index of a specific word among all such subsets (in dictionary order), combinatorial mathematics is used. This avoids generating all possible words and instead calculates the position directly using binomial coefficients.

For example, for characters A, B, C and word "AC": the ordered subsets are: A, AB, ABC, AC, B, BC, C. "AC" is the 4th word.

---
**Background and Experiment Context**
How are numbers represented in C? In this lab we help you understand how numbers are represented in C and based on that two problems are given. The 1st is simple to solve while the second one is a little tricky.

**Problem 1:**
Given a positive integer (≤ 1,000,000), find the minimum number of bits required to represent it as a binary number.

**Problem 2:**
Given N (≤ 26) followed by N distinct characters, we can find all possible $2^N$ words (sequences of characters) which preserve the ordering in the input (assuming that all words are valid words in the language). For example, if N is 3 and characters are A, B, and C, the words in the alphabet order are A, AB, ABC, AC, B, BC, and C. Your task now is to find the index of the word in the dictionary. (You may avoid generating all the words and comparing the word with every word in the dictionary.)

The experiment demonstrates these principles through programming exercises and algorithmic problem-solving.

**Problem 1: Binary Representation**
Computers represent numbers using binary (base-2) notation, where each digit (bit) is either 0 or 1. The number of bits required to represent a decimal number $N$ is $\lceil \log_2(N+1) \rceil$. For example, to represent the number 4 in binary (100), 3 bits are needed. This experiment explores how to determine the minimum number of bits needed for a given number.

**Example:**
To find the minimum bits for $N=96$:
96 → 48 → 24 → 12 → 6 → 3 → 1 (divide by 2 each time)
Number of steps (including the last 1): 7, so 7 bits are needed.

**Problem 2: Lexicographical Indexing of Ordered Subsets**
Given $N$ distinct characters, the task is to find the index of a word (formed by a subset of these characters, preserving their order) among all possible ordered subsets. This is a combinatorial enumeration problem. The index can be calculated efficiently using combinatorial mathematics without generating all possible words.

**Example:**
For characters A, B, C and word "AC":
The ordered subsets are: A, AB, ABC, AC, B, BC, C. "AC" is the 4th word.

