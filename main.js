document.addEventListener('DOMContentLoaded', function () {
  const checkButton = document.querySelector('.check-button');

  if (checkButton) {
    checkButton.addEventListener('click', () => {
      const dateInput = document.querySelector('#checkin-date');
      const roomTypeInput = document.querySelector('#room-type');
      const result = document.querySelector('.availability-result');

      const date = dateInput ? dateInput.value : null;
      const roomType = roomTypeInput ? roomTypeInput.value : 'single';

      if (!date) {
        alert('Please select a check-in date.');
        return;
      }

      fetch(`http://localhost:5000/api/hotels/availability?date=${date}&roomType=${roomType}`)
        .then(response => response.json())
        .then(data => {
          if (result) {
            result.textContent = data.available ? 'Room is available!' : 'Room is not available.';
            result.style.color = data.available ? 'green' : 'red';
          } else {
            alert(data.available ? 'Room is available!' : 'Room is not available.');
          }
        })
        .catch(err => {
          console.error('Error checking availability:', err);
          alert('Something went wrong while checking availability.');
        });
    });
  }
});
