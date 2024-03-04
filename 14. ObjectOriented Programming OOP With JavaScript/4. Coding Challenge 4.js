// Coding Challenge #4
// Your tasks:
// 1. Re-create Challenge #3, but this time using ES6 classes: create an 'EVCl'
// child class of the 'CarCl' class
// 2. Make the 'charge' property private
// 3. Implement the ability to chain the 'accelerate' and 'chargeBattery'
// methods of this class, and also update the 'brake' method in the 'CarCl'
// class. Then experiment with chaining!
// Test data:
// § Data car 1: 'Rivian' going at 120 km/h, with a charge of 23%
// GOOD LUCK �

class Car1 {
    constructor(company, speed) {
        this.company = company;
        this.speed = speed;
    }
    accelerate() {
        this.speed += 10;
        console.log(`${this.company} is going at ${this.speed} km/h`);
        return this;
    }
    brake() {
        this.speed -= 5;
        console.log(`${this.company} is going at ${this.speed} km/h`);
        return this;
    }
    get speedUS() {
        return this.speed / 1.6;
    }
    set speedUS(speed) {
        this.speed = speed * 1.6;
    }
}

class EV extends Car1 {
    #charge;
    constructor(company, speed, charge) {
        super(company, speed);
        this.#charge = charge;
    }
    chargeBattery(chargeTo) {
        this.#charge = chargeTo;
        return this;
    }
    accelerate() {
        this.speed += 20;
        this.#charge -= 1;
        console.log(`${this.company} is going at ${this.speed} km/h, with a charge of ${this.#charge}%`);
        return this;
    }
}
const Rivian = new EV('Rivian', 120, 23);
Rivian.accelerate().brake().chargeBattery(90).accelerate().accelerate().brake().brake();