document.getElementById('bookingForm').addEventListener('submit', function(e) {
  e.preventDefault();  // Prevent default form submission behavior

  const form = e.target;  // The form that triggered the submit event
  const data = {
    nome: form.nome.value,
    email: form.email.value,
    data: form.data.value,
    adulti: form.adulti.value,
    bimbi: form.bimbi.value,
    tipo: form.tipo.value
  };

  const sheetURL = 'https://script.google.com/macros/s/AKfycbxJzyhGudep8qGt3LDEZ8Vv3WJUS0wSG0fbaAg7w5Jom_6edhfgJIz6peIvgWQFunqM/exec';

  fetch(sheetURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)  // Sending data as JSON
  })
  .then(response => response.json())
  .then(result => {
    if (result.result === 'success') {
      alert("Prenotazione avvenuta con successo!");
      form.reset();  // Reset form after successful submission
    } else {
      alert("Errore durante la prenotazione.");
    }
  })
  .catch(error => {
    console.error('Errore:', error);
    alert("Errore nella connessione. Riprova più tardi.");
  });
});
