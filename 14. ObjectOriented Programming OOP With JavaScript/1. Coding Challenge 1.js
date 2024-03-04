// Coding Challenge #1
// Your tasks:
// 1. Use a constructor function to implement a 'Car'. A car has a 'make' and a
// 'speed' property. The 'speed' property is the current speed of the car in
// km/h
// 2. Implement an 'accelerate' method that will increase the car's speed by 10,
// and log the new speed to the console
// 3. Implement a 'brake' method that will decrease the car's speed by 5, and log
// the new speed to the console
// 4. Create 2 'Car' objects and experiment with calling 'accelerate' and
// 'brake' multiple times on each of them
// Test data:
// § Data car 1: 'BMW' going at 120 km/h
// § Data car 2: 'Mercedes' going at 95 km/h

const Car = function (company, speed) {
    this.company = company;
    this.speed = speed;
}
Car.prototype.accelerate = function () {
    this.speed += 10;
    console.log(`${this.company} is going at ${this.speed} km/h`);
}
Car.prototype.brake = function () {
    this.speed -= 5;
    console.log(`${this.company} is going at ${this.speed} km/h`);
}
const BMW = new Car('BMW', 120);
const Mercedes = new Car('Mercedes', 95);
BMW.accelerate();
Mercedes.accelerate();
BMW.brake();
Mercedes.brake();
BMW.accelerate();
Mercedes.accelerate();

// Resolved using ES6 Classes
class Car1 {
    constructor(company, speed) {
        this.company = company;
        this.speed = speed;
    }
    accelerate() {
        this.speed += 10;
        console.log(`${this.company} is going at ${this.speed} km/h`);
    }
    brake() {
        this.speed -= 5;
        console.log(`${this.company} is going at ${this.speed} km/h`);
    }
}
const BMW1 = new Car1('BMW', 120);
const Mercedes1 = new Car1('Mercedes', 95);
BMW1.accelerate();
Mercedes1.accelerate();
BMW1.brake();
Mercedes1.brake();
BMW1.accelerate();
Mercedes1.accelerate();