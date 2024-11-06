const cart = JSON.parse(localStorage.getItem("cart"));

const renderCart = () => {
  const cartTable = document.getElementById("cart-table");
  if (cart.length === 0) {
    cartTable.innerHTML = `<h2 class="text-success text-center m-5">Cart is empty</h2>`;
    return;
  }
  let html = `
        <h1 class="text-center text-muted">Shopping Cart</h1>
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
                    Remove
                    </span>
                </div>
                </div>
            </td>
            <td class="col-3">
                <div class="d-flex justify-content-start ">
                <input
                    type="number"
                    class="form-control w-75 text-center quantity-input"
                    value="${book.quantity}"
                />
                </div>
            </td>
            <td class="col-3">
                <p class="m-0" class="price">${book.price.toLocaleString()} $</p>
            </td>
            </tr>
            `;
  }
  cartTable.innerHTML = html + "</tbody></table>";
  handleChangeQuantity();
  handleDeleteFromCart();
};

const renderTotalPrice = () => {
  const totalPrice = document.getElementById("total-price");
  if (cart.length === 0) {
    totalPrice.innerHTML = "";
    return;
  }
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const book = cart[i];
    total += book.price * book.quantity;
  }
  totalPrice.innerHTML = `
        <h3 class="text-secondary">
            Total: <span class="text-success">${total.toLocaleString()}.</span> $
         </h3>
         <div class="row">
            <button class="btn btn-success hvr-grow-shadow my-3 col-8 col-sm-4 col-lg-3" id="checkout">
            Checkout
            </button>
        </div>    
         `;
  handleCheckout();
};

// handle click delete from cart button
const handleDeleteFromCart = () => {
  const deleteFromCartButtons = document.querySelectorAll(".delete-from-cart");
  for (let i = 0; i < deleteFromCartButtons.length; i++) {
    const button = deleteFromCartButtons[i];
    button.onclick = () => {
      const id = parseInt(button.id);
      deleteFromCart(id);
    };
  }
};

// handle delete book from cart
const deleteFromCart = (id) => {
  const index = findIndex(id, cart);
  if (index !== -1) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    renderTotalPrice();
  }
};

// find book index in cart
const findIndex = (id, cart) => {
  for (let i = 0; i < cart.length; i++) {
    const book = cart[i];
    if (book.id === id) {
      return i;
    }
  }
  return -1;
};

// handle change quantity
const handleChangeQuantity = () => {
  const quantityInputs = document.querySelectorAll(".quantity-input");
  for (let i = 0; i < quantityInputs.length; i++) {
    const input = quantityInputs[i];
    input.onchange = () => {
      const id = parseInt(
        input.parentElement.parentElement.parentElement.querySelector(
          ".delete-from-cart"
        ).id
      );
      var newQuantity = parseInt(input.value);
      if (newQuantity < 1) {
        input.value = 1;
        newQuantity = 1;
      }
      const index = findIndex(id, cart);
      cart[index].quantity = parseInt(newQuantity);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderTotalPrice();
    };
  }
};

const handleCheckout = () => {
  const checkout = document.getElementById("checkout");
  checkout.onclick = () => {
    window.location.href = "checkout.html";
  };
};

renderCart();
renderTotalPrice();
