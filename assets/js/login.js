const registerURL = window.location.origin + "/provinceAPI/register.html"
const productURL = window.location.origin + "/provinceAPI/product.html"

document.getElementById('to-register').href = registerURL

formLogin = document.getElementById('login-form');
let inputUsername = formLogin.elements['username'];
let inputPassword = formLogin.elements['password'];
if (localStorage.getItem("listUsers") !== null) {
    listUsers = JSON.parse(localStorage.listUsers);
} else {
    listUsers = [];
}
formLogin.addEventListener('submit', (event) => {
    event.preventDefault();
    if (isCorrect(inputUsername.value, inputPassword.value)) {
        setSuccess(inputUsername);
        alert("Login success!");
        window.location.replace(productURL);
    } else {
        setError("Incorrect username or password");
    }
});
function isCorrect (username, password) {
    for (let i = 0; i < listUsers.length; i++) {
        if (listUsers[i].username == username && listUsers[i].password == CryptoJS.MD5(password).toString()) {
            return true;
        } else {
            return false;
        }
    }
}
function setError (message) {
    const span = document.querySelector('span');
    span.innerText = message;
}
function setSuccess () {
    const span = document.querySelector('span');
    if (!span.innerText == "") {
        span.innerText = "";
    }
}