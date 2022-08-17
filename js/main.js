/*
1-  onclick="addProduct()" to the add product button
2-  make a function for the add product button
3-  catch the inputs by ID
4-  make object to group all inputs in one thing
5-  show them in the console
6-  catch the tBody ID
7-  add them to the tBody
8-  make an array to list the items in the tBody to keep the values saved
9-  make a loop to show the items in the array to the tBody
10- localStorage to keep the data saved when i refresh or close the application
11- set the localStorage(key, value)
12- convert the string to json
13- set products in localStorage after pushing in the array
14- if we already have a local storage then get the localStorage in the array and convert it to JSON and display the product -- else make it normal array
*/

var productNameInput = document.querySelector(".productNameInput");
var productPriceInput = document.querySelector(".productPriceInput");
var productCategoryInput = document.querySelector(".productCategoryInput");
var productDescriptionInput = document.querySelector(
  ".productDescriptionInput"
);
var updateBtn = document.getElementById("updateBtn");
var addBtn = document.getElementById("addBtn");
var searchInput = document.getElementById("search");
var tableBody = document.getElementById("tableBody");

var productsContainer;
var updateIndex = 0;

if (localStorage.getItem("My Products") != null) {
  productsContainer = JSON.parse(localStorage.getItem("My Products"));
  displayProducts(productsContainer);
} else {
  productsContainer = [];
}

function addProduct() {
  if (addBtn.innerHTML == "Update") {
    addBtn.innerHTML = "Add Product";
    var products = {
      pName: productNameInput.value,
      pPrice: productPriceInput.value,
      pCategory: productCategoryInput.value,
      pDesc: productDescriptionInput.value,
    };
    productsContainer.splice(updateIndex, 1, products);
  } else {
    var products = {
      pName: productNameInput.value,
      pPrice: productPriceInput.value,
      pCategory: productCategoryInput.value,
      pDesc: productDescriptionInput.value,
    };
    productsContainer.push(products);
  }
  localStorage.setItem("My Products", JSON.stringify(productsContainer));
  clearForm();
  displayProducts(productsContainer);
}

function clearForm() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescriptionInput.value = "";
}

function displayProducts(productList) {
  productsBox = ``;
  for (var i = 0; i < productList.length; i++) {
    productsBox += `<tr>
    <td>${i + 1}</td>
    <td>${productList[i].pName}</td>
    <td>${productList[i].pPrice}</td>
    <td>${productList[i].pCategory}</td>
    <td>${productList[i].pDesc}</td>
    <td>
      <button onclick="setFormForUpdate(${i})" class="btn btn-sm btn-outline-warning">Update</button>
    </td>
    <td><button onclick="deleteProduct(${i})" class="btn btn-sm btn-outline-danger" >delete</button></td>
  </tr>
`;
    tableBody.innerHTML = productsBox;
  }
}

function searchProducts(searchTerm) {
  searchList = [];
  for (var i = 0; i < productsContainer.length; i++) {
    if (
      productsContainer[i].pName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) == true
    ) {
      searchList.push(productsContainer[i]);
      displayProducts(searchList);
    }
  }
}

function deleteProduct(deletedIndex) {
  productsContainer.splice(deletedIndex, 1);
  localStorage.setItem("My Products", JSON.stringify(productsContainer));
  displayProducts(productsContainer);
}

function setFormForUpdate(updatedIndex) {
  productNameInput.value = productsContainer[updatedIndex].pName;
  productPriceInput.value = productsContainer[updatedIndex].pPrice;
  productCategoryInput.value = productsContainer[updatedIndex].pCategory;
  productDescriptionInput.value = productsContainer[updatedIndex].pDesc;
  addBtn.innerHTML = "Update";
  updateIndex = updatedIndex;
}
