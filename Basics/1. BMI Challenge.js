function BMI(mass,height){
    let BMI = mass / (height * height);
    return BMI;
}
// Test Data 1, Mark Weight is 78kg and Height is 1.69m , John Weight is 92kg and Height is 1.95m
// Test Data 2, Mark Weight is 95kg and Height is 1.88m , John Weight is 85kg and Height is 1.76m
let markBMI1 = BMI(78,1.69);
console.log('markBMI1: ', markBMI1);
let johnBMI1 = BMI(92,1.95);
console.log('johnBMI1: ', johnBMI1);
console.log("Is Mark BMI higher than John? " + (markBMI1 > johnBMI1));

let markBMI2 = BMI(95,1.88);
console.log('markBMI2: ', markBMI2);
let johnBMI2 = BMI(85,1.76);
console.log('johnBMI2: ', johnBMI2);
console.log("Is Mark BMI higher than John? " + (markBMI2 > johnBMI2));