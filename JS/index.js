var productName = document.getElementById("product-name");
var productPrice = document.getElementById("product-price");
var productCategory = document.getElementById("product-cat");
var productDescription = document.getElementById("product-desc");
var productList = [];

var ProductListNameinLocalStorage = "Products";

if (!getProductsFromLocalStorage()) {
  productList = [];
} else {
  productList = getProductsFromLocalStorage();
  displayProduct(productList);
}

// Create New Product and push it to the ProductList
function addProduct() {
  if (
    productNameValidation() &&
    productPriceValidation() &&
    productCatValidation() &&
    productDescValidation()
  ) {
    console.log("add");
    var product = {
      name: productName.value,
      price: productPrice.value,
      category: productCategory.value,
      description: productDescription.value,
    };
    productList.push(product);
    displayProduct(productList);
    setProductsinLocalStorage(productList);
    updateProductsInputsWithNewValues();
  }
}

function displayProduct(productList) {
  var cartona = ``;
  for (var i = 0; i < productList.length; i++) {
    cartona += ` <tr>
    <td>${i + 1}</td>
    <td>${
      productList[i].newName ? productList[i].newName : productList[i].name
    }</td>
    <td>${productList[i].price}</td>
    <td>${productList[i].category}</td>
    <td>${productList[i].description}</td>
    <td>
      <button class="btn btn-success btn-sm" onclick="editproduct(${i})">
        Edit
      </button>
    </td>
    <td>
      <button class="btn btn-danger btn-sm" onclick="deleteProduct(${i})">
        Delete
      </button>
    </td>
  </tr>`;
  }
  document.getElementById("product-data").innerHTML = cartona;
}

function deleteProduct(index) {
  productList.splice(index, 1);
  displayProduct(productList);
  setProductsinLocalStorage(productList);
}

function editproduct(index) {
  document.getElementById("addProductBtn").classList.add("d-none");
  document.getElementById("updateProductBtn").classList.remove("d-none");

  updateProductsInputsWithNewValues(productList[index]);

  document.getElementById("updateProductBtn").onclick =
    function updateProduct() {
      if (
        productNameValidation() &&
        productPriceValidation() &&
        productCatValidation() &&
        productDescValidation()
      ) {
        productList[index].name = productName.value;
        productList[index].price = productPrice.value;
        productList[index].category = productCategory.value;
        productList[index].description = productDescription.value;
        displayProduct(productList);
        productList[index].newName = "";

        updateProductsInputsWithNewValues();
        setProductsinLocalStorage(productList);
        document.getElementById("addProductBtn").classList.remove("d-none");
        document.getElementById("updateProductBtn").classList.add("d-none");
      }
    };
}

var searchProducts = function (term) {
  foundedProductsinSearch = [];
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(term.toLowerCase())) {
      foundedProductsinSearch.push(productList[i]);
      foundedProductsinSearch[i].newName = foundedProductsinSearch[i].name
        .toLowerCase()
        .replace(
          term.toLowerCase(),
          `<span class="text-danger bg-warning">${term}</span>`
        );
    }
  }
  displayProduct(foundedProductsinSearch);
};

function updateProductsInputsWithNewValues(flag) {
  productName.value = flag ? flag.name : "";
  productPrice.value = flag ? flag.price : "";
  productCategory.value = flag ? flag.category : "";
  productDescription.value = flag ? flag.description : "";
}

function setProductsinLocalStorage() {
  localStorage.setItem("Products", JSON.stringify(productList));
}

function getProductsFromLocalStorage() {
  return JSON.parse(localStorage.getItem(ProductListNameinLocalStorage))
    ? JSON.parse(localStorage.getItem(ProductListNameinLocalStorage))
    : null;
}

function productNameValidation() {
  var regex = /^[A-Z][a-z]{3,8}$/;
  if (regex.test(productName.value)) {
    document
      .getElementById("product-name-error")
      .classList.replace("d-block", "d-none");
    document.getElementById("product-name").style.border = "1px solid blue";
  } else {
    document
      .getElementById("product-name-error")
      .classList.replace("d-none", "d-block");
    document.getElementById("product-name").style.border = "1px solid red";
  }

  return regex.test(productName.value);
}
function productPriceValidation() {
  var regex = /^([1-9][0-9][0-9][0-9]|10000)$/;
  if (regex.test(productPrice.value)) {
    document
      .getElementById("product-price-error")
      .classList.replace("d-block", "d-none");
    document.getElementById("product-price").style.border = "1px solid blue";
  } else {
    document
      .getElementById("product-price-error")
      .classList.replace("d-none", "d-block");
    document.getElementById("product-price").style.border = "1px solid red";
  }
  return regex.test(productPrice.value);
}

function productCatValidation() {
  var regex = /^(TV|Mobile|Watch)$/;
  if (regex.test(productCategory.value)) {
    document
      .getElementById("product-cat-error")
      .classList.replace("d-block", "d-none");
    document.getElementById("product-cat").style.border = "1px solid blue";
  } else {
    document
      .getElementById("product-cat-error")
      .classList.replace("d-none", "d-block");
    document.getElementById("product-cat").style.border = "1px solid red";
  }
  return regex.test(productCategory.value);
}
function productDescValidation() {
  var regex = /^(.){0,250}$/;
  if (regex.test(productDescription.value)) {
    document
      .getElementById("product-desc-error")
      .classList.replace("d-block", "d-none");
    document.getElementById("product-desc").style.border = "1px solid blue";
  } else {
    document
      .getElementById("product-desc-error")
      .classList.replace("d-none", "d-block");
    document.getElementById("product-desc").style.border = "1px solid red";
  }
  return regex.test(productDescription.value);
}
