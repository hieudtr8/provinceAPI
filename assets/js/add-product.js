// SET URL 
const originURl = window.location.origin + "/provinceAPI"
const productManagerURL = originURl + "/product.html"

document.querySelector('#back-to-product-manager').href = productManagerURL;
document.querySelector('#back-product-manager').href = productManagerURL;

// ================ Add product ================
const addProductForm = document.getElementById('add-product-form');
let inputProductID = addProductForm.elements['product-id'];
let inputProductName = addProductForm.elements['product-name'];
let inputProductPrice = addProductForm.elements['price'];
let inputType = addProductForm.elements['product-type'];
let product = {};
let listProducts;

if (localStorage.getItem("listProducts") !== null) {
    listProducts = JSON.parse(localStorage.listProducts);
} else {
    listProducts = [];
}
addProductForm.addEventListener('submit', (event) => {
    // product = {};
    event.preventDefault();
    // Validate username
    validateProduct(inputProductID, inputProductName, inputProductPrice, inputType);
    if (validatedProductObject(product.id, product.productName, product.price, product.type)) {
        listProducts.push(product);
        localStorage.setItem("listProducts", JSON.stringify(listProducts));
        window.location.replace(productManagerURL + "#add-success");
    }
});
function validateProduct (id, name, price, type) {
    //  Validate name
    if (!id.value) {
        setError(id, "Product ID can not be empty!");
    } else if (!isValid(id.value, "price")) {
        setError(id, "Not valid Product ID!");
    } else if (isExist(id.value)) {
        setError(id, "This ID already existed!");
    } else {
        product.id = id.value;
        setSuccess(id);
    }
    if (!name.value) {
        setError(name, "Product name can not be empty!");
    } else if (!isValid(name.value, "name")) {
        setError(name, "Not valid name!");
    } else {
        product.productName = name.value;
        setSuccess(name)
    }
    //  Validate price
    if (!price.value) {
        setError(price, "Price can not be empty!");
    } else if (!isValid(price.value, "price")) {
        setError(price, "Not valid price!");
    } else {
        product.price = price.value;
        setSuccess(price);
    }
    //  Validate type
    if (type.value < 1) {
        setError(type, "Please choose product type!");
    } else {
        product.type = type.value;
        setSuccess(type);
    }
}
function isExist (id) {
    for (let i = 0; i < listProducts.length; i++) {
        if (listProducts[i].id == id) {
            return true;
        } else {
            return false;
        }
    }
}
function isValid (input, type) {
    let regex = "";
    if (type == "name") {
        regex = /^[a-zA-Z0-9 ]*$/;
    } else if (type == "price") {
        regex = /^[0-9]+$/;
    }
    return regex.test(input);
}
function setError (input, message) {
    const parent = input.parentElement;
    parent.className = "error-form mb-3";
    const span = parent.querySelector('span');
    span.innerText = message;
}
function setSuccess (input) {
    const parent = input.parentElement;
    parent.className = "success mb-4";
    const span = parent.querySelector('span');
    if (!span.innerText == "") {
        span.innerText = "";
    }
}
function isEmpty (input) {
    return (input == null || input == undefined || input == '');
}
function validatedProductObject (id, name, price, type) {
    return (!isEmpty(id)) && isValid(id, "price") && !isExist(id) && (!isEmpty(name)) && isValid(name, "name") && !isEmpty(price) && isValid(price, "price") && (type !== undefined);
}