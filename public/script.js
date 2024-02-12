function validateForm() {
    var firstName = document.getElementById("fname").value;
    var lastName = document.getElementById("lname").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    // Validate first name
    if (firstName.length < 5) {
        alert("First name must be at least 5 characters long.");
        return false;
    }

    // Validate last name
    if (lastName.length < 5) {
        alert("Last name must be at least 5 characters long.");
        return false;
    }

    // Validate username
    var usernameRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{5,}$/;
    if (!usernameRegex.test(username)) {
        alert("Username must contain at least 1 capital letter, 1 number, 1 special character, and be at least 5 characters long.");
        return false;
    }

    // Validate password
    var passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    if (!passwordRegex.test(password)) {
        alert("Password must contain at least 1 capital letter, 1 number, 1 special character, and be at least 8 characters long.");
        return false;
    }

    // Validate password match
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return false;
    }
    return true;
}
