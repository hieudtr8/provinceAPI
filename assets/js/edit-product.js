
listProducts = loadLocalStorage();
const base_url = window.location.href;
let url = new URL(base_url);
let id = url.searchParams.get("id")
document.getElementById('back-to-product-manager').href = productManageURL

loadCurrentProduct();

const editProductForm = document.getElementById('edit-product-form');
let inputProductID = editProductForm.elements['product-id'];
let inputProductName = editProductForm.elements['product-name'];
let inputProductPrice = editProductForm.elements['price'];
let inputType = editProductForm.elements['product-type'];
let product = {};


editProductForm.addEventListener('submit', (event) => {
    product = {};
    event.preventDefault();
    // Validate username
    validateProduct(inputProductName, inputProductPrice, inputType);
    if (validatedProductObject(product.productName, product.price, product.type)) {
        for (let i = 0; i < listProducts.length; i++) {
            if (listProducts[i].id == id) {
                listProducts[i].productName = product.productName;
                listProducts[i].price = product.price;
                listProducts[i].type = product.type;

            }
        }
        localStorage.setItem("listProducts", JSON.stringify(listProducts));
        new AWN().success('Edit product successfully');
    }
});

function loadCurrentProduct () {
    for (let i = 0; i < listProducts.length; i++) {
        if (listProducts[i].id == id) {
            currentProduct = listProducts[i];
        }
    }
    document.getElementById("product-name").value = currentProduct.productName;
    document.getElementById("price").value = currentProduct.price;
    document.getElementById("product-type").value = currentProduct.type;

}
function validateProduct (name, price, type) {
    //  Validate name
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
function validatedProductObject (name, price, type) {
    return (!isEmpty(name)) && isValid(name, "name") && !isEmpty(price) && isValid(price, "price") && (type !== undefined);
}