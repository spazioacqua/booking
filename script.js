document.getElementById('bookingForm').addEventListener('submit', function(e) {
  e.preventDefault();  // Prevent the form from submitting the default way

  const form = e.target;
  const data = {
    nome: form.nome.value,
    email: form.email.value,
    data: form.data.value,
    adulti: form.adulti.value,
    bimbi: form.bimbi.value,
    tipo: form.tipo.value
  };

  const sheetURL = 'https://script.google.com/macros/s/AKfycbxJzyhGudep8qGt3LDEZ8Vv3WJUS0wSG0fbaAg7w5Jom_6edhfgJIz6peIvgWQFunqM/exec';

  // Make the POST request to the Google Apps Script
  fetch(sheetURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)  // Send the data as JSON
  })
  .then(response => response.json())  // Parse the response as JSON
  .then(result => {
    if (result.result === 'success') {
      alert("Prenotazione avvenuta con successo!");
      form.reset();  // Reset the form fields after successful submission
    } else {
      alert("Errore durante la prenotazione.");
    }
  })
  .catch(error => {
    console.error('Errore:', error);
    alert("Errore nella connessione. Riprova più tardi.");
  });
});

