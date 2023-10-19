let cartParse = JSON.parse(localStorage.getItem('cart'));
fetch('http://localhost:3000/api/products/')
  .then(res => res.json())
  .then(data => {
    displayCart(data);

    calcTotalPrice(data);
  });

  function displayCart(dataFromApi) {
    let cartParse = JSON.parse(localStorage.getItem("cart"));
  
    if (cartParse) {
  
      for (let product of cartParse) {
        for (let productData of dataFromApi) {
  
          if (product.id === productData._id) {
            product.price = productData.price;
            product.image = productData.imageUrl;
  
  
  
          };
        };
      };
  
  
      displayInfoProductCart(cartParse);
  
    } else {
  
      document.querySelector("#totalQuantity").innerHTML = "0";
      document.querySelector("#totalPrice").innerHTML = "0";
    };
  
    changeQuantity();
    deleteProduct();
  };

  function calcTotalPrice(dataPriceFromAPI) {
    let cartParse = JSON.parse(localStorage.getItem("cart"));
    let updatePrice = 0;
    if (cartParse) {
        for (let product of cartParse) {
        for (let productData of dataPriceFromAPI) {
        let totalPrice = 0;
        if (product.id === productData._id) {
            product.price = productData.price;
          totalPrice = product.price * product.quantity;          updatePrice += totalPrice;
          const displayTotalPrice = document.getElementById("totalPrice");
            displayTotalPrice.textContent = updatePrice;
          };
        };
      };
    };
  };

  function cartTotalQuantity() {
    //Declaring the variable that will hold the value of the total quantity of all products in cart
    let totalProductQuantityCart = 0;
    for (productQtt in cartParse) {
      const calcFinalQtt = parseInt(cartParse[productQtt].quantity);
      totalProductQuantityCart += calcFinalQtt;
    };
    const updateQtt = document.getElementById("totalQuantity");
    updateQtt.textContent = totalProductQuantityCart;
  };

  function displayInfoProductCart(productInfo) {
    let productInfoCartPage = document.querySelector("#cart__items");
    productInfoCartPage.innerHTML += productInfo.map((product) =>
      `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
      <div class="cart__item__img">
        <img src="${product.image}" alt=${product.alt}>
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${product.name}</h2>
          <p>${product.color}</p>
          <p>${product.price} € </p>
        </div>
        <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Quantity : </p>
          <input type="number" class="itemQuantity" 
          name="itemQuantity" min="1" max="100" value="${product.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Delete</p>
        </div>
      </div>
    </div>
  </article>`
  );

  cartTotalQuantity();
};

function changeQuantity() {
    let cartItems = document.querySelectorAll(".cart__item");
    for (let item of cartItems) {
      item.addEventListener('change', (event) => {
         for (product of cartParse) {
           if (product.id === item.dataset.id && product.color === item.dataset.color) {
             product.quantity = event.target.value;
             localStorage.cart = JSON.stringify(cartParse);
             item.dataset.quantity = event.target.value;
             return location.reload();
          };
        };
      });
    };
  };

  function deleteProduct() {
    const deleteProduct = document.querySelectorAll('.deleteItem');
    for (let productDelete of deleteProduct) {
      productDelete.addEventListener('click', (event) => {
        event.preventDefault();
        for (product in cartParse) {
          if (product.id === productDelete.dataset.id && product.color === productDelete.dataset.color) {
            cartParse.splice(product, 1);
            localStorage.cart = JSON.stringify(cartParse);
            return location.reload();
          };
        };
      });
    };
  };

  const orderBnt = document.getElementById('order');
orderBnt.addEventListener('click', (event) => {
  event.preventDefault();

  if (validControl()) {

    postRequest();
  } else {

    formValidation();
  };
});

let contact = {
  firstName: firstName.value.trim(),
  lastName: lastName.value.trim(),
  address: address.value.trim(),
  city: city.value.trim(),
  email: email.value.trim()
};

function validateFirstName() {
    const firstName = document.getElementById('firstName');
    const firstNameValue = firstName.value.trim()
    const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
  
    //let letters = /[a-zA-Z\s]+$/;
    if (/[a-zA-Z\s]+$/.test(firstNameValue)) {
      firstNameErrorMsg.innerHTML = " ";
      return true;
    } else {
  
      firstNameErrorMsg.innerHTML = "Add valid first name";
      return false;
    }
  };
  
  function validateLastName() {
    const lastName = document.getElementById('lastName');
    const lastNameValue = lastName.value.trim()
    const lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
  
    if (/[a-zA-Z\s]+$/.test(lastNameValue)) {
      lastNameErrorMsg.innerHTML = " ";
      return true;
    } else {
  
      lastNameErrorMsg.innerHTML = "Add valid last name";
    }
  };

  function validateAddress() {
    const address = document.getElementById('address');
    const addressValue = address.value.trim()
    const addressErrorMsg = document.getElementById('addressErrorMsg');
  
    if (/\d{2}[ ]?\d{3}$/.test(addressValue)) {
      addressErrorMsg.innerHTML = " ";
      return true;
    } else {
  
      addressErrorMsg.innerHTML = "Add valid address -> Nr. Street ZIP code XXXXX";
    }
  };
  
  function validateCity() {
    const city = document.getElementById('city');
    const cityValue = city.value.trim()
    const cityErrorMsg = document.getElementById('cityErrorMsg');
  
  
    if (/[a-zA-Z\s]+$/.test(cityValue)) {
      cityErrorMsg.innerHTML = " ";
      return true;
    } else {
  
      cityErrorMsg.innerHTML = "Add valid address";
    }
  };

  function validateEmail() {
    const email = document.getElementById('email');
    const emailValue = email.value.trim()
    const emailErrorMsg = document.getElementById('emailErrorMsg');
  
    if (/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(emailValue)) {
      emailErrorMsg.innerHTML = " ";
      return true;
    } else {
  
      emailErrorMsg.innerHTML = "Add valid email address -> example@example.com";
    }
  };

  function formValidation() {
    validateFirstName();
    validateLastName()
    validateAddress()
    validateCity()
    validateEmail()
  };

  function validControl() {
    if (validateFirstName() && validateLastName() && validateCity() && validateAddress() && validateEmail()) {
      return true;
    } else {
      return false;
    };
  };

  function contactObjInit() {
    if (validControl()) {
      contact = {
        firstName: firstName.value.trim(),
        lastName: lastName.value.trim(),
        address: address.value.trim(),
        city: city.value.trim(),
        email: email.value.trim()
      }
      localStorage.setItem('contactObj', JSON.stringify(contact));
    };
  };

  const products = [];

function productTable() {

  let cartParse = JSON.parse(localStorage.getItem("cart"));

  for (product of cartParse) {

    products.push(product.id);
  };

};

function postRequest() {
    productTable();
    contactObjInit();
    fetch("http://localhost:3000/api/products/order", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          products,
          contact,
        })
      })
      .then(response => response.json())
      .then((data) => {
        let confirmationUrl = "./confirmation.html?id=" + data.orderId;
        window.location.href = confirmationUrl;
      })
      .catch(() => {
        alert("Error");
      }); 
  };