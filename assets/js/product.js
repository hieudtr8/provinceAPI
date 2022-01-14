
// Only allow to access if login
let currentUser = {};
const originURL = window.location.origin + "/provinceAPI"
const editURL = originURL + "/edit-product.html";
const productManageURL = originURL + "/product.html"
document.getElementById('back-to-product-manage').href = productManageURL
let notifier = new AWN();

if (localStorage.getItem("currentUser") !== null) {
    currentUser = JSON.parse(localStorage.currentUser);
}
if (currentUser.username == undefined) {
    window.location.replace(originURL);
};


// Manage user
let UserInfo = document.querySelector(".user-info")
UserInfo.innerHTML = currentUser.username
const loginURL = window.location.origin + "/provinceAPI"
const addProductURL = loginURL + "/add-product.html"
document.querySelector("#toAddProduct").href = addProductURL;
function logOut () {
    currentUser = {};
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    window.location.replace(loginURL);
}

// Manage product
let listProducts = [];
let table_list = document.getElementById("list-products");
if (localStorage.getItem("listProducts") !== null) {
    listProducts = loadLocalStorage();
    listProducts.forEach(writeListProducts)

}
function removeProduct (id) {
    if (confirm("Do you really want to delete this product?")) {
        for (let i = 0; i < listProducts.length; i++) {
            if (listProducts[i].id == id) {
                listProducts.splice(i, 1);
            }
        }
        updateLocalStorage(listProducts);
    }
    window.location.reload();
}
function updateLocalStorage (list) {
    localStorage.setItem("listProducts", JSON.stringify(list));
}
function loadLocalStorage () {
    return listProducts = JSON.parse(localStorage.listProducts)
}
function writeListProducts (product, i) {
    // index
    let index = document.createElement("td");
    index.innerHTML = i;
    // product name
    let productName = document.createElement("td");
    productName.innerHTML = product.productName;
    // price
    let productPrice = document.createElement("td");
    productPrice.innerHTML = product.price;
    //price 
    let productType = document.createElement("td");
    productType.innerHTML = product.type;
    productType.classList.add("text-capitalize");
    // btn edit 
    let btnAction = document.createElement("td");
    let btnEdit = document.createElement("a");
    btnEdit.className = "btnAction btn-edit"
    btnEdit.setAttribute("id", i);
    btnEdit.setAttribute("href", editURL + "?id=" + product.id);

    let iconEdit = document.createElement("i");
    iconEdit.className = 'fas fa-edit'
    // btn remove 
    let btnRemove = document.createElement("span");
    btnRemove.className = "btnAction btn-remove"
    btnRemove.setAttribute("onclick", "removeProduct(" + product.id + ")");
    let iconRemove = document.createElement("i");
    iconRemove.className = "fas fa-trash";
    btnRemove.appendChild(iconRemove);
    btnEdit.appendChild(iconEdit);
    // add 2 btn to action
    btnAction.appendChild(btnEdit);
    btnAction.appendChild(btnRemove);

    // append multiple child 
    let tr = document.createElement("tr");
    let documentFragment = document.createDocumentFragment();
    documentFragment.appendChild(tr);
    tr.appendChild(index)
    tr.appendChild(productName)
    tr.appendChild(productPrice)
    tr.appendChild(productType);
    tr.appendChild(btnAction);
    table_list.appendChild(documentFragment);
}
// Awesome noti
if (window.location.hash == "#add-success") {
    new AWN().success('Add product successfully');
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
        console.log("ok");
    }, 5500)

}
