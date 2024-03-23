// Initializing the Emailjs Library
(function() {
  emailjs.init("ks3ONzO8VfeOvR4BM");
}) ();

// Getting elements
const form = document.getElementsByClassName(contact_form);
const userName = document.getElementById('user_name');
const userEmail = document.getElementById('user_email');
const userMessage = document.getElementById('user_message');
const messageContainer = document.querySelector('.message-container');
const message = document.getElementById('message');

let isValid = false;

const templateParams = {
  name: userName,
  email: userEmail,
  message: userMessage,
}

function validateForm() {
  //  Using Constraint API
  isValid = form.checkValidty();
  //  Style main message for an error
  if(isValid === false){
    message.textContent = "Please fill out all fields";
    message.style.color = 'red';
    messageContainer.style.borderColor = 'red';
  } else if(isValid === true) {
    message.textContent = "Your message is being sent";
    message.style.color = 'orange';
    messageContainer.style.borderColor = 'orange';
  }
}

function processFormData(e){
  e.preventDefault()

  // validating form
  validateForm();

  // Sending the form data
  if(isValid === true) {
    emailjs.send('service_0i7d7iq', 'template_801bg98', templateParams)
    .then(function(response){
      message.textContent = "Thank you very much, I will reply to you as soon as possible";
      message.style.color = 'green';
      messageContainer.style.borderColor = 'green';
      console.log('Success', response.status, response.text);
    }, function(error){
      console.log("Failed", error);
    })
  }
}

form.addEventListener('submit', processFormData);







// Getting elements


//   https://vizionconcept.hashnode.dev/how-to-create-a-contact-form-with-email-js-using-vanilla-javascript-with-validation