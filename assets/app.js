// Populate the time dropdown with 15-minute increments from 8:00 AM to 8:00 PM
function populateTimeDropdown() {
    const timeDropdown = document.getElementById('appointment-time');
    const timeIncrements = [0, 15, 30, 45]; // 15-minute increments

    // Define the range: Start at 8 AM, end at 8 PM
    const startHour = 8;
    const endHour = 20; // 8 PM in 24-hour format

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
document.getElementById('schedule-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const firstNameInput = document.getElementById('first-name').value.trim();
    const lastNameInput = document.getElementById('last-name').value.trim();
    const emailInput = document.getElementById('email').value.trim();
    const dateInput = document.getElementById('appointment-date').value;
    const timeInput = document.getElementById('appointment-time').value;

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

    // Validation and display modal if all inputs are filled
    if (firstNameInput && lastNameInput && emailInput && dateInput && timeInput) {

        // Object to be stored in local storage
        const localInfo = {
            first: firstNameInput,
            last: lastNameInput,
            email: emailInput,
            date: formattedDate,
            time: timeInput,
        };

        document.getElementById('modal-body').innerHTML = `Thank you for scheduling your appointment on ${formattedDate} at ${timeInput}, ${firstNameInput}! We will email you at ${emailInput}.`;

        // Save user information to local storage
        localStorage.setItem('localInfo', JSON.stringify(localInfo));
    } else {
        document.getElementById('modal-body').textContent = 'Please fill out all the required fields.';
    }

    // Show the modal
    document.getElementById('staticBackdrop').show;
    console.log(dateInput);
    console.log(formattedDate);
});

// Populate the time dropdown when the page loads
document.addEventListener('DOMContentLoaded', populateTimeDropdown);