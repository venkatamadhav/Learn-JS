function BMI(mass,height){
    let BMI = mass / (height * height);
    return BMI;
}
// Find the Higher BMI using if Else Statement
// Test Data 1, Mark Weight is 78kg and Height is 1.69m , John Weight is 92kg and Height is 1.95m
// Test Data 2, Mark Weight is 95kg and Height is 1.88m , John Weight is 85kg and Height is 1.76m
let markBMI1 = BMI(78,1.69);
let johnBMI1 = BMI(92,1.95);
let markBMI2 = BMI(95,1.88);
let johnBMI2 = BMI(85,1.76);

function compareBMI(markBMI,johnBMI){
    if(markBMI > johnBMI){
        return "Mark BMI is higher than John";
    }else{
        return "John BMI is higher than Mark";
    }
}
console.log(`Comparing BMI1: ${compareBMI(markBMI1,johnBMI1)}`);
console.log(`Comparing BMI2: ${compareBMI(markBMI2,johnBMI2)}`);