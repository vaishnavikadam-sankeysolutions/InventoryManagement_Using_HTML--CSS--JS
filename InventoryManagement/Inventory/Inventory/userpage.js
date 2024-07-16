document.addEventListener('DOMContentLoaded', function() {
    const userForm = document.getElementById('User-Form');

    // Array to store usernames
    const usernames = [];

    userForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Get the values from the form inputs
        const userName = document.getElementById('user_name').value.trim();
        const userEmail = document.getElementById('user_email').value.trim();

        // Store the username in the array
        if (userName) {
            usernames.push(userName);
        }

        // Redirect to index.html with the username as a URL parameter
        window.location.href = `index5.html?username=${encodeURIComponent(userName)}`;
    });
});



document.addEventListener('DOMContentLoaded', function() {
    const userNameInput = document.getElementById('user_name');
    const emailInput = document.getElementById('user_email');
    const nameError = document.getElementById('name_error');
    const emailError = document.getElementById('email_error');

    userNameInput.addEventListener('input', function() {
        const userName = userNameInput.value.trim();
        if (userName === '') {
            nameError.textContent = 'Username should not be empty';
        } else if (!/^[a-zA-Z\s]+$/.test(userName)) {
            nameError.textContent = 'Username should only contain alphabets and spaces';
        } else {
            nameError.textContent = '';
        }
    });

    emailInput.addEventListener('input', function() {
        const userEmail = emailInput.value.trim();
        if (userEmail === '') {
            emailError.textContent = 'Email ID should not be empty';
        } else if (!isValidEmail(userEmail)) {
            emailError.textContent = 'Email should be in proper format';
        } else {
            emailError.textContent = '';
        }
    });

    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    document.getElementById('User-Form').addEventListener('submit', function(event) {
        // Validate one more time on submit
        const userName = userNameInput.value.trim();
        const userEmail = emailInput.value.trim();

        if (userName === '') {
            nameError.textContent = 'Username should not be empty';
            event.preventDefault(); // Prevent form submission
        }

        if (userEmail === '') {
            emailError.textContent = 'Email ID should not be empty';
            event.preventDefault(); // Prevent form submission
        } else if (!isValidEmail(userEmail)) {
            emailError.textContent = 'Email should be in proper format';
            event.preventDefault(); // Prevent form submission
        }
    });
});