document.getElementById('bookingForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const form = e.target;
  const data = {
    nome: form.nome.value,
    email: form.email.value,
    data: form.data.value,
    adulti: form.adulti.value,
    bimbi: form.bimbi.value,
    tipo: form.tipo.value
  };

  const sheetURL = 'https://script.google.com/macros/library/d/1Pc_be16zI3Mjz5FiWnXad0wq43-0BZQEH_EQorTTrzJ8E14t4zOYR9dE/4'; // Your Web App URL

  fetch(sheetURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(result => {
    if (result.status === 'success') {
      alert("Booking successful!");
      form.reset();
      document.getElementById('successMessage').classList.remove('hidden');
      setTimeout(() => {
        window.location.href = '/';  // Redirect to homepage (if it exists)
      }, 3000);
    } else {
      alert("Error during booking: " + result.message);
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert("Connection error. Please try again later.");
  });
});

// Predefine allowed dates and max people per day
const ALLOWED_DATES = [
  '2025-05-10', '2025-05-11', '2025-05-17', '2025-05-18', '2025-05-24', '2025-05-25'
];

const MAX_ADULTS_PER_DAY = 20;

// Google Apps Script (doPost) will handle the backend logic
