const cart = JSON.parse(localStorage.getItem("cart"));
const checkout = document.getElementById("checkout");

const renderCart = () => {
  const cartTable = document.getElementById("cart-table");
  let html = `
          <table class="table table-striped">
            <thead>
              <tr class="row">
                <th class="col-6 text-success">Book Title</th>
                <th class="col-3 text-success">Quantity</th>
                <th class="col-3 text-success">Price</th>
              </tr>
            </thead>
            <tbody>
  `;
  for (let i = 0; i < cart.length; i++) {
    const book = cart[i];
    html += `
            <tr class="row">
            <td class="col-6">
                <div class="d-flex">
                <div class="w-25 d-flex justify-content-center">
                    <img class="cart-img me-2" src="${book.cover}" alt="" />
                </div>
                <div class="d-flex flex-column justify-content-center">
                    <p class="m-0">${book.title}</p>
                    <span
                    class="btn w-25 text-decoration-none text-muted hvr-shrink delete-from-cart"
                    id="${book.id}"
                    >
                    </span>
                </div>
                </div>
            </td>
            <td class="col-3">
                <div class="d-flex justify-content-start ">
                <span class="w-75">${book.quantity}</span>
                </div>
            </td>
            <td class="col-3">
                <p class="m-0" class="price">${book.price.toLocaleString()},000 VNĐ</p>
            </td>
            </tr>
            `;
  }
  cartTable.innerHTML = html + "</tbody></table>";
};

const renderTotalPrice = () => {
  const totalPrice = document.getElementById("total-price");
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const book = cart[i];
    total += book.price * book.quantity;
  }
  totalPrice.innerHTML = `
        <h3 class="text-secondary">
            Total: <span class="text-success">${total.toLocaleString()}.000</span> VNĐ
         </h3>
         <div class="row">
            <button class="btn btn-success hvr-grow-shadow my-3 col-8 col-sm-4 col-lg-3" id="order">
            Place Order
            </button>
        </div>    
         `;
  handleOrder();
};

const handleOrder = () => {
  const orderButton = document.getElementById("order");
  orderButton.onclick = () => {
    if (validateShipmentInfoForm() === false) {
      return;
    }
    localStorage.removeItem("cart");
    checkout.innerHTML = `
        <div class="text-center w-50">
            <h1 class="text-success">Order Successful!</h1>
            <h3 class="text-secondary">Thank you for your purchase!</h3>
            <a href="home.html" class="btn btn-success hvr-grow-shadow my-3 col-8 col-sm-4 col-lg-3">Home</a>
        </div>
        `;
  };
};

renderCart();
renderTotalPrice();

// Validate payment information
const nameError = document.getElementById("name-error");
const addressError = document.getElementById("address-error");
const districtError = document.getElementById("district-error");
const cityError = document.getElementById("city-error");
const phoneNumberError = document.getElementById("phone-number-error");
const payError = document.getElementById("pay-error");

const validateShipmentInfoForm = () => {
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const district = document.getElementById("district").value;
  const city = document.getElementById("city").value;
  const phoneNumber = document.getElementById("phone-number").value;
  const pay = document.getElementById("pay").value;

  if (
    name.trim() === "" &&
    address.trim() === "" &&
    district.trim() === "" &&
    city.trim() === "" &&
    phoneNumber.trim() === "" &&
    pay.trim() === "Select Payment Method"
  ) {
    nameError.innerHTML = "Full name is required";
    addressError.innerHTML = "Address is required";
    districtError.innerHTML = "District is required";
    cityError.innerHTML = "City is required";
    phoneNumberError.innerHTML = "Phone number is required";
    payError.innerHTML = "Payment method is required";
    return false;
  }

  if (name.trim() === "") {
    nameError.innerHTML = "Full name is required";
    return false;
  }

  if (address.trim() === "") {
    addressError.innerHTML = "Address is required";
    return false;
  }

  if (district.trim() === "") {
    districtError.innerHTML = "District is required";
    return false;
  }

  if (city.trim() === "") {
    cityError.innerHTML = "City is required";
    return false;
  }

  if (phoneNumber.trim() === "") {
    phoneNumberError.innerHTML = "Phone number is required";
    return false;
  }

  if (pay.trim() === "Select Payment Method") {
    payError.innerHTML = "Payment method is required";
    return false;
  }

  if (name.length < 6 || name.length > 50) {
    nameError.innerHTML = "Name must be between 6 and 50 characters";
    return false;
  }

  const nameRegex = /^[a-zA-ZÀ-ỹ ]+$/;
  if (name.trim() && !nameRegex.test(name)) {
    nameError.innerHTML = "Name can only contain letters and spaces";
    return false;
  }
  return true;
};

// Handle input change events
const handleOnChangeInput = () => {
  const inputs = document.querySelectorAll("input");
  for (const input of inputs) {
    input.oninput = () => {
      nameError.innerHTML = "";
      addressError.innerHTML = "";
      districtError.innerHTML = "";
      cityError.innerHTML = "";
      phoneNumberError.innerHTML = "";
      payError.innerHTML = "";
    };
  }
};

handleOnChangeInput();
