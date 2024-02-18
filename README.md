# JavaScript-SBA-308

check my code in:
- solution-1-v1.js: the first version of the solution 1.
- solution-1-v2.js: the simplified version of the solution 1.
- solution-2.js: another solution.

## solution-1-v1.js & solution-1-v2.js:
For this solution, there's no need to find the existing data for the learners, add the score to the existing data, nor remove the extra data.
1. create a list of ```learners``` with a list of submission information. ```learners``` will be:
```
{
  '125': [
    [ 1, '2023-01-25', 47 ],
    [ 2, '2023-02-12', 150 ],
    [ 3, '2023-01-25', 400 ]
  ],
  '132': [ [ 1, '2023-01-24', 39 ], [ 2, '2023-03-07', 140 ] ]
}
```




also put the try/catch inside and at the beginning of the function getLearnerData, it worked.
but in order for the readability,try/catch was decided to put outside the function