// --- DOM ELEMENTS ---
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const loginBtn = document.getElementById('showLogin');
const signupBtn = document.getElementById('showSignup');
const messageElement = document.getElementById('message');

// --- TOGGLE LOGIC ---

// 1. Switch to Login View
loginBtn.addEventListener('click', () => {
    loginForm.classList.remove('hidden');   // Show Login
    signupForm.classList.add('hidden');     // Hide Signup
    loginBtn.classList.add('active');       // Highlight Login Tab
    signupBtn.classList.remove('active');   // Un-highlight Signup Tab
    messageElement.textContent = "";        // Clear old messages
});

// 2. Switch to Sign Up View
signupBtn.addEventListener('click', () => {
    signupForm.classList.remove('hidden');  // Show Signup
    loginForm.classList.add('hidden');      // Hide Login
    signupBtn.classList.add('active');      // Highlight Signup Tab
    loginBtn.classList.remove('active');    // Un-highlight Login Tab
    messageElement.textContent = "";        // Clear old messages
});

// --- BACKEND CONNECTION LOGIC ---

// 1. Handle Login Submission
loginForm.addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent page reload

    const data = {
        username: document.getElementById('loginUsername').value,
        password: document.getElementById('loginPassword').value
    };

    // Send to Spring Boot Login Endpoint
    sendRequest('http://localhost:8080/api/auth/login', data);
});

// 2. Handle Sign Up Submission
signupForm.addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent page reload

    const data = {
        username: document.getElementById('signupUsername').value,
        email: document.getElementById('signupEmail').value,
        password: document.getElementById('signupPassword').value
    };

    // Send to Spring Boot Signup Endpoint
    sendRequest('http://localhost:8080/api/auth/signup', data);
});

// Generic function to send data to the backend
async function sendRequest(url, data) {
    messageElement.style.color = "#333";
    messageElement.textContent = "Processing...";

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.text();

        if (response.ok) {
            // Success Case
            messageElement.style.color = "green";
            messageElement.textContent = result;

            // If sign up was successful, automatically switch to login after 1.5 seconds
            if (url.includes("signup")) {
                setTimeout(() => {
                    loginBtn.click(); // Programmatically click the login tab
                    messageElement.textContent = "Please log in with your new account.";
                }, 1500);
            }
        } else {
            // Error Case (e.g., Wrong password, Username taken)
            messageElement.style.color = "red";
            messageElement.textContent = result;
        }
    } catch (error) {
        console.error('Error:', error);
        messageElement.style.color = "red";
        messageElement.textContent = "Server connection failed. Is the backend running?";
    }
}