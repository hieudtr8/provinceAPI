
loadProvinceAPI();

// let submitButton = document.getElementById("btnSubmit");
// submitButton.addEventListener('click', Register);

function loadProvinceAPI () {
    url = 'https://provinces.open-api.vn/api/?depth=3';
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // ======== List City ============
            for (let i = 0; i < data.length; i++) {
                // console.log(data);
                optionCity = document.createElement("option");
                optionCity.innerHTML = data[i].name;
                optionCity.value = data[i].codename;
                document.getElementById("city").appendChild(optionCity);
            }
            // ============ List distrisct according to chosen city ============
            const selectCity = document.getElementById("city");
            selectCity.addEventListener('change', (event) => {

                // Reset list district on city change
                let tmp_district = [];
                let prev_districts = document.getElementById("district").childNodes;
                for (let i = (prev_districts.length - 1); i >= 0; i--) {
                    let district = prev_districts[i];
                    district.parentNode.removeChild(district);
                }

                // Create district element  
                for (let i = 0; i < data.length; i++) {
                    if (data[i].codename == event.target.value) {
                        listDistrict = data[i].districts;
                        for (let j = 0; j < listDistrict.length; j++) {
                            tmp_district.push(listDistrict[j])
                            optionDistrict = document.createElement("option");
                            optionDistrict.innerHTML = tmp_district[j].name;
                            optionDistrict.setAttribute("class", "district");
                            optionDistrict.value = tmp_district[j].codename;
                            document.getElementById("district").appendChild(optionDistrict);
                        }
                    }
                }
            });
        })
        .catch((error) => {
            console.log('Error: ', error);
        });
};
// ===========  Register action =============
form = document.getElementById('register-form');
let inputUsername = form.elements['username'];
let inputPassword = form.elements['password'];
let inputCity = form.elements['city'];
let inputDistrict = form.elements['district'];
let registerAccount = {};
let error = [];
form.addEventListener('submit', (event) => {
    event.preventDefault();
    // Validate username
    if (isEmpty(inputUsername.value)) {
        setError(inputUsername, "Username can not be empty!");
    } else if (!isValidUsername(inputUsername.value)) {
        setError(inputUsername, "Not valid username![6 - 20 characters]");
    } else {
        registerAccount.username = inputUsername.value;
        setSuccess(inputUsername);
    }
    // Validate password
    if (isEmpty(inputPassword.value)) {
        setError(inputPassword, "Password can not be empty!");
    } else if (!isValidPassword(inputPassword.value)) {
        setError(inputPassword, "Password must contain at least 8 characters and one uppercase character!");
    } else {
        registerAccount.password = inputPassword.value;
        setSuccess(inputPassword);
    }
    // Validate input city
    if (inputCity.value < 1) {
        setError(inputCity, "Please choose your city!")
    } else {
        registerAccount.city = inputCity.value;
        setSuccess(inputCity);
        registerAccount.district = inputDistrict.value;
    }
    // Add validated user to storage
    if (validatedRegister(registerAccount.username, registerAccount.password, registerAccount.city)) {
        // console.log("user", !isEmpty(registerAccount.username) && isValidUsername(registerAccount.username));
        // console.log("password", !isEmpty(registerAccount.password) && isValidPassword(registerAccount.password));
        // console.log("city", registerAccount.city != undefined);
        localStorage.setItem(registerAccount.username, JSON.stringify(registerAccount));
        alert("Register successfully!");
        location.reload();
    };

});

function isEmpty (input) {
    return (input == undefined || input === '');
}
function setError (input, message) {
    const parent = input.parentElement;
    parent.className = "error-form";
    const span = parent.querySelector('span');
    span.innerText = message;
}
function setSuccess (input) {
    const parent = input.parentElement;
    parent.className = "success";
    const span = parent.querySelector('span');
    if (!span.innerText == "") {
        span.innerText = "";
    }
}
function isValidUsername (input) {
    var usernameRegex = /^[a-zA-Z0-9]{6,20}$/;
    return usernameRegex.test(input);
}
function isValidPassword (input) {
    const regext = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.{8,})");
    return regext.test(input);
    // https://www.javascripttutorial.net/javascript-dom/javascript-form-validation/
}
function validatedRegister (username, password, city) {
    return !isEmpty(username) && isValidUsername(username) && !isEmpty(password) && isValidPassword(password) && (city != undefined);
}