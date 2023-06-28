/**** LOGIN PAGE ****/

const header =document.querySelector("header");
header.classList.add("header-logout"); 

const form = document.getElementById('form');
form.addEventListener('submit', submitForm);

// Function to submit the form
async function submitForm(event) {
    event.preventDefault();

  
    try {
   // POST request to send data to the API    
      const url = 'http://localhost:5678/api/users/login';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value
        })
      });
  
      const responseData = await response.json();

    // Check the server response status code
      if (response.status === 200) {
        const token = responseData.token;
        
    // Registration of the token and redirection to the home page
        window.localStorage.setItem("token", token);
        window.location.href = './index.html';
    // Display of different error messages depending on the code received
      } else if (response.status === 401) {
        displayErrorMessage("L'email ou et le mot de passe n'est pas valide.<br>La connexion n'est pas autorisée !!!", "#error");

      } else if (response.status === 404) {
        displayErrorMessage("L'utilisateur ne se trouve pas dans la base de données.", "#error");
      }
      
    // Display an error message if no connection to the server  
    } catch (error) {
      displayErrorMessage("Une erreur est survenue lors de la connexion.<br>Veuillez réessayer plus tard.", "#error");
    }
};
