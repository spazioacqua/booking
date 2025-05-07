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

    // Using a CORS proxy to bypass the restriction
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // CORS proxy URL
    const sheetURL = 'https://script.google.com/macros/s/AKfycbz0VpLshlzQCCjVEDaR9iNOGmJHKf3-mf0KLVtgtvCmLBSeYk2zoOg5Rde_22HfXz0HnA/exec'; // Your Google Apps Script URL

    fetch(proxyUrl + sheetURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.result === 'success') {
            alert("Booking successful!");
            form.reset();
            window.location.href = '/';  // Redirect to homepage
        } else {
            alert("Error during booking.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Connection error. Please try again later.");
    });
});
