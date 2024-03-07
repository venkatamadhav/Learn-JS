'use strict';

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
    _setDescription() {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
            'October', 'November', 'December'];
        this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`;
    }
}
class running extends Workout {
    type = 'running';
    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace();
        this._setDescription();
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
        this._setDescription();
    }
    calcSpeed() {
        this.speed = this.distance / (this.duration / 60);
        return this.speed;
    }
}
// /////////////////////////////////////////
class App {
    #map; #mapEvent; #workouts = []; #modify = false;
    constructor() {
        this._getPosition();
        this._getLocalStorage();
        form.addEventListener('submit', this._newWorkout.bind(this));
        inputType.addEventListener('change', this._toggleElevationField);
        containerWorkouts.addEventListener('click', this._movetoLocation.bind(this));
        containerWorkouts.addEventListener('click', this._editWorkout.bind(this));
        containerWorkouts.addEventListener('click', this._deleteWorkout.bind(this));
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
        this.#workouts.forEach(work => this._renderWorkoutMarker(work));
    }
    _showForm(mapE) {
        this.#mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();
    }
    _hideForm() {
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';
        form.style.display = 'none';
        form.classList.add('hidden');
        setTimeout(() => form.style.display = 'grid', 1000);
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
            this._renderWorkoutMarker(workout);
            this._renderWorkout(workout);
        }
        this._hideForm();
        this._setLocalStorage();
        this.#modify === true ? this._displayPopup('Workout Modified Successfully!') : this._displayPopup('Workout Added Successfully!');
        this.#modify === true ? this.#modify = false : true;
    }
    _renderWorkoutMarker(workout) {
        L.marker(workout.coords, { id: `${workout.id}` }).addTo(this.#map)
            .bindPopup(L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: `${workout.type}-popup`,
            }))
            .setPopupContent(`${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`)
            .openPopup();
    }
    _renderWorkout(workout) {
        let html = `
        <li class="workout workout--${workout.type}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.description} 
            <div>
            <button class="edit_btn btn" data-id1="${workout.id}"> ✏️
            </button>
            <button class="delete_btn btn" data-id2="${workout.id}"> ❌
            </button>
            </div>
          </h2>
          <div class="workout__details">
            <span class="workout__icon">${workout.type === "running" ? '🏃‍♂️' : '🚴‍♀️'}</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>
          `;
        if (workout.type === 'running') {
            html += `
                <div class="workout__details">
                    <span class="workout__icon">⚡️</span>
                    <span class="workout__value">${workout.pace}</span>
                    <span class="workout__unit">spm</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">🦶🏼</span>
                    <span class="workout__value">${workout.cadence}</span>
                    <span class="workout__unit">m</span>
                </div>
                </li>
            `;
        }
        else if (workout.type === 'cycling') {
            html += `
                <div class="workout__details">
                    <span class="workout__icon">⚡️</span>
                    <span class="workout__value">${workout.speed}</span>
                    <span class="workout__unit">km/h</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">⛰</span>
                    <span class="workout__value">${workout.elevationGain}</span>
                    <span class="workout__unit">m</span>
                </div>
                </li>
                `;
        }
        form.insertAdjacentHTML('afterend', html);
    }
    _movetoLocation(e) {
        const workoutEl = e.target.closest('.workout');
        if (e.target.classList.contains('edit_btn')) return;
        if (!workoutEl) return;
        const workout = this.#workouts.find(work => work.id === +workoutEl.dataset.id);
        this.#map.setView(workout.coords, 13, {
            animate: true,
            pan: {
                duration: 1
            }
        });
    }
    _editWorkout(e) {
        const editBtn = e.target.closest('.edit_btn');
        if (!editBtn) return;
        const workoutEl = e.target.closest('.workout');
        if (!workoutEl) return;
        if (!e.target.classList.contains('edit_btn')) return;
        console.log(e.target.dataset.id1);
        const workout = this.#workouts.find(work => work.id === +workoutEl.dataset.id);
        this.#workouts = this.#workouts.filter(work => work.id !== +e.target.dataset.id1);
        this._setLocalStorage();
        workoutEl.remove();
        this._showForm({ latlng: { lat: workout.coords[0], lng: workout.coords[1] } });
        if (inputType.value !== workout.type) {
            inputType.value = workout.type;
            inputType.dispatchEvent(new Event('change'));
        }
        if (workout.type === 'running') {
            inputCadence.value = workout.cadence;
            inputElevation.value = '';
        }
        else {
            inputElevation.value = workout.elevationGain;
            inputCadence.value = '';
        }
        inputDistance.value = workout.distance;
        inputDuration.value = workout.duration;
        this._deleteMarker(workoutEl);
        this.#modify = true;
    }
    _setLocalStorage() {
        localStorage.setItem('workouts', JSON.stringify(this.#workouts));
    }
    _getLocalStorage() {
        const data = JSON.parse(localStorage.getItem('workouts'));
        if (!data) return;
        this.#workouts = data;
        this.#workouts.forEach(work => this._renderWorkout(work));
    }
    _deleteMarker(workoutEl) {
        this.#map.eachLayer(layer => {
            if (layer.options && (+layer.options.id === +workoutEl.dataset.id)) {
                this.#map.removeLayer(layer);
            }
        });
    }
    _deleteWorkout(e) {
        const deleteBtn = e.target.closest('.delete_btn');
        if (!deleteBtn) return;
        const workoutEl = e.target.closest('.workout');
        if (!workoutEl) return;
        this.#workouts = this.#workouts.filter(work => work.id !== +e.target.dataset.id2);
        this._setLocalStorage();
        workoutEl.remove();
        this._deleteMarker(workoutEl);
        this._displayPopup('Workout Deleted Successfully!');
    }
    _displayPopup(message) {
        popup.textContent = message;
        popup.style.display = 'block';
        setTimeout(() => popup.style.display = 'none', 5000);
    }
}
const app = new App();
let popup = document.createElement('div');
popup.className = "popupmessage";
document.body.append(popup);