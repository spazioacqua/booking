// Function to send booking data to Google Sheets
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
    const sheetURL = 'https://script.google.com/macros/library/d/1LAujobqvhYfCyCAMQ0cB_0XEYO9uuEQgSgeC66DXWdnM-pt_0svhqEum/1';

    // Send data to Google Sheets using fetch
    fetch(sheetURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').textContent = "Booking successful!";
        form.reset();  // Reset the form
    })
    .catch(error => {
        document.getElementById('message').textContent = "Sorry, there was an error. Please try again later.";
        console.error('Error:', error);
    });
});

