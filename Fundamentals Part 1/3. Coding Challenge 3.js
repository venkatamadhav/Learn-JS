// Coding Challenge on Conditionals and Operators, Truthy and Falsy Values

// 1. Calculate the average score for each team, using the test data below
// 2. Compare the team's average scores to determine the winner of the competition, 
// and print it to the console. Don't forget that there can be a draw, so test for that 
// as well (draw means they have the same average score)
// 3. Bonus 1: Include a requirement for a minimum score of 100. With this rule, a 
// team only wins if it has a higher score than the other team, and the same time a 
// score of at least 100 points. Hint: Use a logical operator to test for minimum 
// score, as well as multiple else-if blocks �
// 4. Bonus 2: Minimum score also applies to a draw! So a draw only happens when 
// both teams have the same score and both have a score greater or equal 100 
// points. Otherwise, no team wins the trophy
// Test data:
// § Data 1: Dolphins score 96, 108 and 89. Koalas score 88, 91 and 110
// § Data Bonus 1: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 123
// § Data Bonus 2: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 106

// Solution 1
let DolphinsAverageScore = (96 + 108 + 89) / 3;
let KoalasAverageScore = (88 + 91 + 110) / 3;

if(DolphinsAverageScore > KoalasAverageScore){
    console.log(`Dolphins Average Score is ${DolphinsAverageScore} and is greater than Koalas Average Score ${KoalasAverageScore}`);
}
else if(KoalasAverageScore > DolphinsAverageScore){
    console.log(`Koalas Average Score is ${KoalasAverageScore} and is greater than Dolphins Average Score ${DolphinsAverageScore}`);
}
else if(KoalasAverageScore === DolphinsAverageScore){
    console.log(`Dolphins Average Score is ${DolphinsAverageScore} and is equal to Koalas Average Score ${KoalasAverageScore} so both win the cup`);
}

// Solution 2
let DolphinsAverageScore1 = (97 + 112 + 101) / 3;
let KoalasAverageScore1 = (109 + 95 + 123) / 3;
if(DolphinsAverageScore1 > KoalasAverageScore1 && DolphinsAverageScore1 >= 100){
    console.log(`Dolphins Average Score is ${DolphinsAverageScore1} and is greater than Koalas Average Score ${KoalasAverageScore1}`);
}
else if(KoalasAverageScore1 > DolphinsAverageScore1 && KoalasAverageScore1 >= 100){
    console.log(`Koalas Average Score is ${KoalasAverageScore1} and is greater than Dolphins Average Score ${DolphinsAverageScore1}`);
}
else if(KoalasAverageScore1 > DolphinsAverageScore1 && KoalasAverageScore1 < 100){
    console.log(`Koalas Average Score is ${KoalasAverageScore1} and is greater than Dolphins Average Score ${DolphinsAverageScore1} and less than 100 so no one wins`);
}
else if(DolphinsAverageScore1 > KoalasAverageScore1 && DolphinsAverageScore1 < 100){
    console.log(`Dolphins Average Score is ${DolphinsAverageScore1} and is greater than Koalas Average Score ${KoalasAverageScore1} and less than 100 so no one wins`);
}
else if(DolphinsAverageScore1 === KoalasAverageScore1){
    console.log(`Dolphins Average Score is ${DolphinsAverageScore1} and is equal to Koalas Average Score ${KoalasAverageScore1} so both win the cup`);
}

// Solution 3
let DolphinsAverageScore2 = (97 + 112 + 101) / 3;
let KoalasAverageScore2 = (109 + 95 + 106) / 3;
if(DolphinsAverageScore2 > KoalasAverageScore2 && DolphinsAverageScore2 >= 100){
    console.log(`Dolphins Average Score is ${DolphinsAverageScore2} and is greater than Koalas Average Score ${KoalasAverageScore2}`);
}
else if(KoalasAverageScore2 > DolphinsAverageScore2 && KoalasAverageScore2 >= 100){
    console.log(`Koalas Average Score is ${KoalasAverageScore2} and is greater than Dolphins Average Score ${DolphinsAverageScore2}`);
}
else if(KoalasAverageScore2 > DolphinsAverageScore2 && KoalasAverageScore2 < 100){
    console.log(`Koalas Average Score is ${KoalasAverageScore2} and is greater than Dolphins Average Score ${DolphinsAverageScore2} and less than 100 so no one wins`);
}
else if(DolphinsAverageScore2 > KoalasAverageScore2 && DolphinsAverageScore2 < 100){
    console.log(`Dolphins Average Score is ${DolphinsAverageScore2} and is greater than Koalas Average Score ${KoalasAverageScore2} and less than 100 so no one wins`);
}
else if(DolphinsAverageScore2 === KoalasAverageScore2 && DolphinsAverageScore2 >= 100 && KoalasAverageScore2 >= 100){
    console.log(`Dolphins Average Score is ${DolphinsAverageScore2} and is equal to Koalas Average Score ${KoalasAverageScore2} so both win the cup`);
}
else{
    console.log(`Dolphins Average Score is ${DolphinsAverageScore2} and is equal to Koalas Average Score ${KoalasAverageScore2} and less than 100 so no one wins`);
}