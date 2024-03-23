// Is the issue with this functionality because I'm not running this project on a build - static html file?

// Initializing the Emailjs Library
(function () {
  emailjs.init("ks3ONzO8VfeOvR4BM");
})();

// Getting elements
const form = document.getElementById("contact__form");
const toName = document.getElementById("user_name");
const fromName = document.getElementById("user_email");
const userMessage = document.getElementById("user_message");
const messageContainer = document.querySelector(".message_container");
const message = document.getElementById("message");

let isValid = false;

function validateForm() {
  //  Using Constraint API
  isValid = form.checkValidity();
  //  Style main message for an error
  if (isValid === false) {
    message.textContent = "Please fill out all fields";
    message.style.color = "red";
    message.style.visibility = "visible";
    message.style.border = "solid 4px red";
    message.style.height = "32px";
    messageContainer.style.height = "32px";
  } else if (isValid === true) {
    message.textContent = "Your message is being sent";
    message.style.color = "orange";
    message.style.visibility = "visible";
    message.style.border = "solid 4px orange";
    message.style.height = "32px";
    messageContainer.style.height = "32px";

  }
}

function processFormData(e) {
  e.preventDefault();

  const templateParams = {
    name: toName.value,
    email: fromName.value,
    message: userMessage.value,
  };

  // validating form
  validateForm();

  console.log("processFormData ->", templateParams);

  // Sending the form data
  if (isValid === true) {
    emailjs.send("service_0i7d7iq", "template_801bg98", templateParams).then(
      function (response) {
        message.textContent = "Thank you, I will reply as soon as possible";
        message.style.color = "whitesmoke";
        message.style.border = "solid 4px rgb(63, 195, 128)";
        message.style.visibility = "visible";
        message.style.height = "40px";
        messageContainer.style.height = "40px";
        console.log("Success", response.status, response.text);
      },
      function (error) {
        console.log("Failed", error);
      }
    );
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  processFormData(event);
  // console.log(processFormData.templateParams);
});

// https://medium.com/@remcojonk/contact-form-withvanilla-javascript-and-emailjs-cdad241736df#:~:text=Creating%20the%20contact%20form&text=We'll%20start%20by%20creating,message%2C%20and%20a%20submit%20button.

//   https://vizionconcept.hashnode.dev/how-to-create-a-contact-form-with-email-js-using-vanilla-javascript-with-validation
