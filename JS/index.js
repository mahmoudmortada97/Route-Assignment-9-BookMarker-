var productName = document.getElementById("product-name");
var productPrice = document.getElementById("product-price");
var productCategory = document.getElementById("product-cat");
var productDescription = document.getElementById("product-desc");
var productList = [];

if (localStorage.getItem("Products") == null) {
  productList = [];
} else {
  productList = JSON.parse(localStorage.getItem("Products"));
  displayProduct(productList);
}

function clearProductFormInputs() {
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDescription.value = "";
}

// Create New Product and push it to the ProductList
function addProduct() {
  var product = {
    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    description: productDescription.value,
  };
  productList.push(product);
  displayProduct(productList);
  // Set the new Product to Local Storage
  localStorage.setItem("Products", JSON.stringify(productList));

  clearProductFormInputs();
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

function clearProductFormInputs() {
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDescription.value = "";
}

function deleteProduct(index) {
  productList.splice(index, 1);
  displayProduct(productList);
  localStorage.setItem("Products", JSON.stringify(productList));
}
function editproduct(index) {
  document.getElementById("addProductBtn").classList.add("d-none");
  document.getElementById("updateProductBtn").classList.remove("d-none");

  productName.value = productList[index].name;
  productPrice.value = productList[index].price;
  productCategory.value = productList[index].category;
  productDescription.value = productList[index].description;

  document.getElementById("updateProductBtn").onclick =
    function updateProduct() {
      productList[index].name = productName.value;
      productList[index].price = productPrice.value;
      productList[index].category = productCategory.value;
      productList[index].description = productDescription.value;
      displayProduct(productList);
      clearProductFormInputs();
      document.getElementById("addProductBtn").classList.remove("d-none");
      document.getElementById("updateProductBtn").classList.add("d-none");
    };
}

var searchProducts = function (term) {
  foundedProductsinSearch = [];
  for (var i = 0; i < productList.length; i++) {
    if (
      productList[i].name.toLowerCase().includes(term.toLowerCase()) == true
    ) {
      productList[i].newName = productList[i].name
        .toLowerCase()
        .replace(
          term.toLowerCase(),
          `<span class="text-danger bg-warning">${term}</span>`
        );
      foundedProductsinSearch.push(productList[i]);
    }
  }
  displayProduct(foundedProductsinSearch);
};
