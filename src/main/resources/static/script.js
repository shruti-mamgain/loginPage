document.getElementById('signupForm').addEventListener('submit', async function(event) { // async : function takes time to execute, because response will be given by the server
    event.preventDefault(); // Tells the browser not to refresh the page when the form is submitted

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('message');


    const data = {
        username: username,
        email: email,
        password: password
    };

    try {
        const response = await fetch('http://localhost:8080/api/auth/signup', {  //sends a request to Spring Boot backend.
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)  //JSON.stringify converts javascript object into a simple text string that can travel over the internet.
        });

        const result = await response.text(); // Java backend returns a simple sentence  example : " User registered successfully!".

        if (response.ok) {    //checks the "status code" sent by Spring Boot.
            messageElement.style.color = "green";
            messageElement.textContent = result;
            document.getElementById('signupForm').reset();
        } else {
            messageElement.style.color = "red";
            messageElement.textContent = result;
        }
    } catch (error) {
        console.error('Error:', error);
        messageElement.style.color = "red";
        messageElement.textContent = "Failed to connect to the server.";
    }
});