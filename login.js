// Handle login form submission
document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Get username and password
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Dummy credentials for simplicity
  const validUsername = "user";
  const validPassword = "password123";

  // Check if credentials are correct
  if (username === validUsername && password === validPassword) {
    // Store login status in localStorage
    localStorage.setItem("loggedIn", "true");

    // Redirect to ads page
    window.location.href = "ads.html";
  } else {
    // Display error message if login fails
    document.getElementById('error-message').textContent = "Invalid username or password!";
  }
});
