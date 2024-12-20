// Populate the time dropdown with 15-minute increments from 8:00 AM to 8:00 PM
function populateTimeDropdown() {
    const timeDropdown = document.getElementById('appointment-time');
    const timeIncrements = [0, 15, 30, 45]; // 15-minute increments

    // Define the range: Start at 9AM, end at 4:45 PM
    const startHour = 7;
    const endHour = 16; // 5 PM in 24-hour format

    for (let hour = startHour; hour <= endHour; hour++) {
        for (let increment of timeIncrements) {
            const displayHour = hour > 12 ? hour - 12 : hour; // Convert to 12-hour format
            const period = hour >= 12 ? 'PM' : 'AM'; // Determine AM or PM
            const displayMinutes = increment.toString().padStart(2, '0'); // Format minutes
            const timeValue = `${displayHour}:${displayMinutes} ${period}`;
            const option = document.createElement('option');
            option.value = timeValue;
            option.textContent = timeValue;
            timeDropdown.appendChild(option);
        }
    }
}

// Handle form submission
document.getElementById('schedule-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const firstNameInput = document.getElementById('first-name').value.trim();
    const lastNameInput = document.getElementById('last-name').value.trim();
    const emailInput = document.getElementById('email').value.trim();
    const dateInput = document.getElementById('appointment-date').value;
    const timeInput = document.getElementById('appointment-time').value;
    const carModelInput = document.getElementById('carDropdown').textContent.trim();

    // Format date as mm-dd-yyyy
    const formattedDate = dateInput
        ? (() => {
            const [year, month, day] = dateInput.split('-');
            // Create the date object as local time
            return new Date(year, month - 1, day).toLocaleDateString('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric',
            });
        })()
        : '';
    
    // Validation to ensure the selected date is not in the past
    const selectedDate = new Date(dateInput);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set the time to the start of the day

    if (selectedDate < currentDate) {
        document.getElementById('modal-body').textContent = 'Please select a valid date for your appointment.';
        document.getElementById('staticBackdrop').show;
        return;
    }
    // Validation and display modal if all inputs are filled
    if (firstNameInput && lastNameInput && emailInput && dateInput && timeInput && carModelInput !== 'Audi & BMW Model Selector') {

        // Object to be stored in local storage
        const localInfo = {
            first: firstNameInput,
            last: lastNameInput,
            email: emailInput,
            date: formattedDate,
            time: timeInput,
            carModel: carModelInput
        };

        document.getElementById('modal-body').innerHTML = `Thank you for scheduling your appointment on ${formattedDate} at ${timeInput} for your ${carModelInput}, ${firstNameInput}! We will email you a confirmation at ${emailInput}.`;

        // Save user information to local storage
        localStorage.setItem('localInfo', JSON.stringify(localInfo));
    } else {
        document.getElementById('modal-body').textContent = 'Please fill out all the required fields.';
    }

    // Show the modal
    document.getElementById('staticBackdrop').show;
    console.log(dateInput);
    console.log(formattedDate);

    // Clear the form fields after submission
    document.getElementById('schedule-form').reset();
    document.getElementById('first-name').value = '';
    document.getElementById('last-name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('carDropdown').textContent = 'Audi & BMW Model Selector';
});

// Event listener for car model selection
document.getElementById('carDropdownMenu').addEventListener('click', function (event) {
    if (event.target && event.target.matches('.dropdown-item')) {
        event.preventDefault(); // Prevent scrolling to the top
        const selectedCarModel = event.target.textContent.trim();
        const carIcon = event.target

        // Update the car dropdown button text
        document.getElementById('carDropdown').innerHTML = carIcon.innerHTML;
    }
});

// Populate the time dropdown when the page loads
document.addEventListener('DOMContentLoaded', populateTimeDropdown);

// Retrieves the user's information from the local storage to be displayed on the page
function lastAppointment() {
    if ('localInfo' in localStorage) {
        document.getElementById('appointmentDisplay').style = "display:inline"
        const localInfo = JSON.parse(localStorage.getItem('localInfo'));
        document.getElementById('lastAppointmentDate').innerHTML = localInfo.date + " " + localInfo.time;
        document.getElementById('lastAppointmentName').innerHTML = localInfo.first + " " + localInfo.last;
        document.getElementById('lastAppointmentModel').innerHTML = localInfo.carModel;
    } else {
        document.getElementById('appointmentDisplay').style = "display:none"

    }
}
lastAppointment();