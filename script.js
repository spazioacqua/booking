document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission

    const form = e.target;
    const data = {
        name: form.Nome.value,
        email: form.Email.value,
        date: form.Data.value,
        adults: form.Adulti.value,
        children: form.Bimbi.value,
        type: form.Tipo.value
    };

    // URL for Google Sheets API (using Google Sheets as JSON)
    const sheetURL = 'https://script.google.com/macros/s/AKfycbxJzyhGudep8qGt3LDEZ8Vv3WJUS0wSG0fbaAg7w5Jom_6edhfgJIz6peIvgWQFunqM/exec';

    // Send data to Google Sheets using fetch
    fetch(sheetURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('message').textContent = "Booking successful!";
        form.reset();  // Reset the form
    })
    .catch(error => {
        document.getElementById('message').textContent = "Sorry, there was an error. Please try again later.";
        console.error('Error:', error);
    });
});
