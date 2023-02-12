var siteName = document.querySelector("#site-name");
var siteURL = document.querySelector("#site-url");
var submitBtn = document.querySelector("#submitBtn");
var bookMarkList = [];
var clearBtn;
var siteNameErrorMsg = document.querySelector("#site-name-error");
var siteURLErrorMsg = document.querySelector("#website-url-error");
console.log(siteName);
console.log(siteURL);

submitBtn.addEventListener("click", function (event) {
  if (validateSiteName() && validatesiteURL()) {
    var bookmark = {
      name: siteName.value,
      url: siteURL.value,
    };
    bookMarkList.push(bookmark);
    displayBookmarks(bookMarkList);
    clearInputs();
  } else if (!validateSiteName() && validatesiteURL()) {
    siteNameErrorMsg.classList.replace("d-none", "d-block");
  } else if (!validatesiteURL() && validateSiteName()) {
    siteURLErrorMsg.classList.replace("d-none", "d-block");
  } else {
    siteNameErrorMsg.classList.replace("d-none", "d-block");
    siteURLErrorMsg.classList.replace("d-none", "d-block");
  }
});
siteName.addEventListener("change", function () {
  if (!validateSiteName()) {
    siteNameErrorMsg.classList.replace("d-none", "d-block");
  } else {
    siteNameErrorMsg.classList.replace("d-block", "d-none");
  }
});

siteURL.addEventListener("change", function () {
  if (!validatesiteURL()) {
    siteURLErrorMsg.classList.replace("d-none", "d-block");
  } else {
    siteURLErrorMsg.classList.replace("d-block", "d-none");
  }
});

function displayBookmarks(List) {
  cartona = "";
  for (var i = 0; i < List.length; i++) {
    cartona += ` <div
    class="bookmark-item d-flex justify-content-between align-items-center p-4 mb-4"
  >
    <h4 class="text-primary">${List[i].name}</h4>
    <div class="pe-4">
      <a href="https://${List[i].url}" class="btn btn-success" target="_blank">Visit</a>
      <button class="btn btn-danger mx-auto clearBtn" >Clear</button>
    </div>
  </div>`;
  }
  document.querySelector("#bookmarks").innerHTML = cartona;

  clearBtn = Array.from(document.querySelectorAll(".clearBtn"));
  console.log(clearBtn);

  for (let index = 0; index < clearBtn.length; index++) {
    clearBtn[index].addEventListener("click", function () {
      bookMarkList.splice(index, 1);
      displayBookmarks(bookMarkList);
    });
  }
}

function validateSiteName() {
  var regex = /^[A-Z][a-z]{2,}$/;
  return regex.test(siteName.value);
}

function validatesiteURL() {
  var regex =
    /^[(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  return regex.test(siteURL.value);
}

function clearInputs() {
  siteName.value = "";
  siteURL.value = "";
}
