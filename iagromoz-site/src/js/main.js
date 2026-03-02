// This file contains JavaScript code that handles the email submission process, including form validation and data handling.

document.addEventListener('DOMContentLoaded', function() {
    const emailForm = document.querySelector('#email-form');
    const emailInput = document.querySelector('#email-input');

    emailForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = emailInput.value.trim();

        if (validateEmail(email)) {
            // Redirect to email-receiver.html with the email as a query parameter
            window.location.href = `email-receiver.html?email=${encodeURIComponent(email)}`;
        } else {
            alert('Please enter a valid email address.');
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});