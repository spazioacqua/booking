// Function to send booking data to Google Sheets
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission

    const form = e.target;
    const data = {
        name: form.name.value,
        email: form.email.value,
        date: form.data.value,
        adults: form.adulti.value,
        children: form.bimbi.value,
        type: form.tipo.value
    };

    // URL for Google Sheets API (using Google Sheets as JSON)
    const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSbCtiVRP78qQyCMKWUbF_iRtpEGwSSiG0kLi3akv9wsx8hMBS_fqL_UnzgHfLsyLK_J1d7Hne3G9au/pubhtml';

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

