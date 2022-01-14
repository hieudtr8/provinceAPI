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
let currentUser = {};
formLogin.addEventListener('submit', (event) => {
    event.preventDefault();
    if (isCorrect(inputUsername.value, inputPassword.value)) {
        console.log("ok");
        setSuccess();
        for (let i = 0; i < listUsers.length; i++) {
            if (listUsers[i].username == inputUsername.value) {
                currentUser = listUsers[i];
            }
        }
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        window.location.replace(productURL);
    } else {
        setError("Incorrect username or password");
    }
});
function isCorrect (username, password) {
    for (let i = 0; i < listUsers.length; i++) {
        if (username == listUsers[i].username && CryptoJS.MD5(password).toString() == listUsers[i].password) {
            return true
        }
    }
    return false;
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
// Awesome noti
if (window.location.hash == "#register-success") {
    new AWN().success('Register successfully');
};
removeNoti();

function removeNoti () {
    const noti_container = document.getElementById("awn-toast-container");
    setTimeout(function () {
        box_message = noti_container.querySelector(".awn-toast-success");
        if (box_message == null) {
            history.pushState("", document.title, window.location.pathname
                + window.location.search);
        }
    }, 5500)

}
