document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('bookingForm');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const sheetURL = 'https://script.google.com/macros/s/AKfycbz0VpLshlzQCCjVEDaR9iNOGmJHKf3-mf0KLVtgtvCmLBSeYk2zoOg5Rde_22HfXz0HnA/exec'; // Replace this

    const data = {
      nome: form.nome.value.trim(),
      email: form.email.value.trim(),
      data: form.data.value,
      adulti: parseInt(form.adulti.value, 10),
      bimbi: parseInt(form.bimbi.value, 10),
      tipo: form.tipo.value
    };

    try {
      const response = await fetch(sheetURL, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result.status === 'success') {
        showMessage('Prenotazione avvenuta con successo!');
        form.reset();
        setTimeout(() => {
          window.location.href = '/'; // Replace with your homepage URL once it exists
        }, 3000);
      } else {
        showMessage(result.message || 'Errore durante la prenotazione.', true);
      }
    } catch (error) {
      console.error('Errore:', error);
      showMessage('Errore nella connessione. Riprova più tardi.', true);
    }
  });

  function showMessage(message, isError = false) {
    let msg = document.querySelector('.success-message');
    if (!msg) {
      msg = document.createElement('div');
      msg.className = 'success-message';
      form.appendChild(msg);
    }
    msg.style.backgroundColor = isError ? '#f8d7da' : '#d4edda';
    msg.style.color = isError ? '#721c24' : '#155724';
    msg.textContent = message;
  }
});
