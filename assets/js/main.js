
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
form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (isEmpty(inputUsername.value)) {
        // alert("Please enter username");
        showError('username')
    } else {
        registerAccount.username = inputUsername.value;
        document.getElementById('username').parentElement.querySelector("span").remove();
    }
    if (isEmpty(inputPassword.value)) {
        showError('password')
    } else {
        registerAccount.password = CryptoJS.MD5(inputPassword.value).toString();
        document.getElementById('password').parentElement.querySelector("span").remove();

    }
    if (inputCity.value < 1) {
        showError('city')
    } else {
        registerAccount.city = inputCity.value;
        document.getElementById('city').parentElement.querySelector("span").remove();
    }

})

function isEmpty (input) {
    return (!input || input.length === 0);
}
function showError (input) {
    let span = document.getElementById(input).parentElement.querySelector("span");
    span.innerText = "Please input " + input;
}