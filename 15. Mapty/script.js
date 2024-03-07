'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class Workout {
    date = new Date();
    id = Date.now();
    constructor(coords, distance, duration) {
        this.coords = coords;
        this.distance = distance;
        this.duration = duration;
    }
}
class running extends Workout {
    type = 'running';
    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace();
    }
    calcPace() {
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}
class cycling extends Workout {
    type = 'cycling';
    constructor(coords, distance, duration, elevationGain) {
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.calcSpeed();
    }
    calcSpeed() {
        this.speed = this.distance / (this.duration / 60);
        return this.speed;
    }
}
// /////////////////////////////////////////
class App {
    #map; #mapEvent; #workouts = [];
    constructor() {
        this._getPosition();
        form.addEventListener('submit', this._newWorkout.bind(this));
        inputType.addEventListener('change', this._toggleElevationField);
    }
    _getPosition() {
        if (navigator.geolocation)
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function () {
                alert('Could not get your position');
            });
    }
    _loadMap(position) {
        const [{ latitude }, { longitude }] = [position.coords, position.coords];
        const coords = [latitude, longitude];
        this.#map = L.map('map').setView(coords, 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);
        this.#map.on('click', this._showForm.bind(this));
    }
    _showForm(mapE) {
        this.#mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();
    }
    _toggleElevationField() {
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    }
    _newWorkout(e) {
        e.preventDefault();
        const NonEmptyInputs = (...inputs) => inputs.every(inp => inp !== '');
        const validInputs = (...inputs) => inputs.every(inp => Number.isFinite(inp));
        const allPositive = (...inputs) => inputs.every(inp => inp > 0);
        const { lat, lng } = this.#mapEvent.latlng;
        const type = inputType.value;
        const distance = +inputDistance.value;
        const duration = +inputDuration.value;
        let workout;
        if (type === 'running') {
            const cadence = +inputCadence.value;
            console.log(NonEmptyInputs(distance, duration, cadence) && validInputs(distance, duration, cadence) && allPositive(distance, duration, cadence));
            if (NonEmptyInputs(distance, duration, cadence) &&
                validInputs(distance, duration, cadence) &&
                allPositive(distance, duration, cadence)) {
                workout = new running([lat, lng], distance, duration, cadence);
            }
            else {
                return alert('Please enter proper inputs');
            }
        }
        else {
            const elevation = +inputElevation.value;
            if (NonEmptyInputs(distance, duration, elevation) &&
                validInputs(distance, duration, elevation) &&
                allPositive(distance, duration)) {
                workout = new cycling([lat, lng], distance, duration, elevation);
            }
            else {
                return alert('Please enter proper inputs');
            }
        }
        if (workout) {
            this.#workouts.push(workout);
            this.renderWorkoutMarker(workout);
        }
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';

    }
    renderWorkoutMarker(workout) {
        L.marker(workout.coords).addTo(this.#map)
            .bindPopup(L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: `${workout.type}-popup`
            }))
            .setPopupContent('Workout')
            .openPopup();
    }

}
const app = new App();
