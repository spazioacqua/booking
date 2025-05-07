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

  const sheetURL = 'https://script.google.com/macros/s/AKfycbz0VpLshlzQCCjVEDaR9iNOGmJHKf3-mf0KLVtgtvCmLBSeYk2zoOg5Rde_22HfXz0HnA/exec'; // Your Web App URL

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
