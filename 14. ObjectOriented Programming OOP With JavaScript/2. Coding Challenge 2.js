// Coding Challenge #2
// Your tasks:
// 1. Re-create Challenge #1, but this time using an ES6 class (call it 'CarCl')
// 2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide
// by 1.6)
// 3. Add a setter called 'speedUS' which sets the current speed in mi/h (but
// converts it to km/h before storing the value, by multiplying the input by 1.6)
// 4. Create a new car and experiment with the 'accelerate' and 'brake'
// methods, and with the getter and setter.
// Test data:
// § Data car 1: 'Ford' going at 120 km/h
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
    get speedUS() {
        return this.speed / 1.6;
    }
    set speedUS(speed) {
        this.speed = speed * 1.6;
    }
}
const Ford = new Car1('Ford', 120);
console.log(Ford.speedUS)
Ford.accelerate();
Ford.brake();
Ford.accelerate();
Ford.brake();
Ford.accelerate();
Ford.speedUS = 50;