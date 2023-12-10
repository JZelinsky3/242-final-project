const hamburgerMenu = document.querySelector('.hamburger-menu');
const mainNav = document.getElementById('mainNav');

hamburgerMenu.addEventListener('click', () => {
    mainNav.classList.toggle('show');
});

const displayText = () => {
    const productName = document.getElementById("product-name").value;
    let html = '<section class="toutput"> <h3>' + productName + '</h3></section>';
    const element = document.createElement('div');
    element.innerHTML = html;
    document.getElementById("responses").appendChild(element);
};

const displayText2 = () => {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    let html = '<section class="toutput"><h3>' + username + '</h3> <p>' + email + '</p></section>';
    const element = document.createElement('div');
    element.innerHTML = html;
    document.getElementById("responses").appendChild(element);
};

window.onload = () => {
    document.getElementById("submit").onclick = displayText;
};

const showEmailResult = async (e) => {
    e.preventDefault();
    const result = document.getElementById("result");
    let response = await getEmailResult();
    if (response.status == 200) {
      result.innerHTML = "Email Successfully Sent";
    } else {
      result.innerHTML = "Unfortunately, your email was unable to be sent.";
    }
  };
  
  const getEmailResult = async (e) => {
    const form = document.getElementById("cform");
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    const result = document.getElementById("result");
    result.innerHTML = "Please wait...";
  
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });
      return response;
    } catch (error) {
      console.log(error);
      document.getElementById("result").innerHTML =
        "Sorry your email couldn't be sent";
    }
  };
  
  document.getElementById("cform").onsubmit = showEmailResult;
