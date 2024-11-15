const bookImage = document.getElementById("book-image");
const bookTitle = document.getElementById("book-title");
const bookType = document.getElementById("book-type");
const bookPrice = document.getElementById("book-price");
const bookPriceOld = document.getElementById("book-price-old");
const bookAuthor = document.getElementById("book-author");
const bookPublisher = document.getElementById("book-publisher");
const bookYear = document.getElementById("book-year");
const bookPage = document.getElementById("book-page");
const bookdescription = document.getElementById("book-description");

// get type and id from local storage
const bookInfo = JSON.parse(localStorage.getItem("bookInfo"));

console.log(bookInfo, 'bookInfor');

const bookTypes = {
  Comic: "Comic & Graphic novels",
  Science: "Science fiction & fantasy",
  Romance: "Romance",
  Humor: "Humor",
  Mystery: "Mystery"
};

/**
 * get data from booklist.json
 * then show book detail
 */

// if has bookInfo, get book detail from data else redirect to home page
if (bookInfo) {
  const type = bookInfo.type;
  const id = parseInt(bookInfo.id);

  console.log(type, 'type', id);


  var bookData;
  fetch("../data/booklist.json")
    .then((res) => res.json())
    .then((data) => {
      console.log(data, 'dattttta');

      // get book detail
      bookList = data[type];
      console.log(bookList);
      console.log(id);
      bookData = findBookById(id, bookList);

      // update book detail to html
      bookTitle.innerHTML = bookData.title;
      bookType.innerHTML = bookTypes[type];
      bookType.href = `${type}.html`;
      bookPrice.innerHTML = bookData.price;
      bookPriceOld.innerHTML = Math.floor(bookData.price * 1.4) + ".00";
      bookAuthor.innerHTML = bookData.author;
      bookPublisher.innerHTML = bookData.publisher;
      bookYear.innerHTML = bookData.year;
      bookPage.innerHTML = bookData.page;
      bookdescription.innerHTML = bookData.description;
      bookImage.innerHTML = renderBookImage(bookData.cover, bookData.detailImg);
    });
} else {
  alert("Book not found");
  setTimeout(() => {
    window.location.href = "home.html";
  }, 1000);
}

// find book by id
const findBookById = (id, bookList) => {
  for (let i = 0; i < bookList.length; i++) {
    const book = bookList[i];
    if (book.id === id) {
      return book;
    }
  }
};

// render book image
const renderBookImage = (cover, detailImg) => {
  var html = `<div class="carousel-item active mt-4">
                <img
                  src="${cover}"
                  class="d-block w-50 m-auto hvr-grow"
                  alt="..."
                />
              </div>`;
  if (detailImg) {
    for (img of detailImg) {
      html += `<div class="carousel-item mt-4">
                <img
                  src="${img}"
                  class="d-block w-50 m-auto"
                  alt="..."
                />
              </div>`;
    }
  }
  return html;
};

// HANDLE ADD TO CART

const addToCartButton = document.getElementById("add-to-cart-btn");
const buyNowButton = document.getElementById("buy-now-btn");
const quantityInput = document.getElementById("quantity-input");
const subtractQuantityButton = document.getElementById("subtract-quantity-btn");
const addQuantityButton = document.getElementById("add-quantity-btn");

addQuantityButton.onclick = () => {
  quantityInput.value = parseInt(quantityInput.value) + 1;
};

subtractQuantityButton.onclick = () => {
  if (quantityInput.value > 1) {
    quantityInput.value = parseInt(quantityInput.value) - 1;
  }
};

// handle add to cart
/**
 * when user click add to cart button
 * check local storage
 * if user is logged in
 *  add book to cart
 * else
 * alert please login
 * then redirect to login page
 */

const handleAddToCart = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    addBookToCart();
    alert("Đã Add to Cart");
  } else {
    alert("Bạn cần Log In để mua hàng");
    window.location.href = "signin.html";
  }
};

// handle buy now button
/**
 * when user click buy now button
 * check local storage
 * if user is logged in
 *  add book to cart
 *  redirect to cart page
 * else
 * alert please login
 * then redirect to login page
 */

const handleBuyNow = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    addBookToCart();
    window.location.href = "cart.html";
  } else {
    alert("Bạn cần Log In để mua hàng");
    window.location.href = "signin.html";
  }
};

/**
 * add book to cart
 * if cart is empty
 * create cart
 * add book to cart
 * if book is already in cart
 * increase quantity
 * else
 * add book to cart
 *
 * finally set cart to local storage
 */

const addBookToCart = () => {
  var cart = JSON.parse(localStorage.getItem("cart"));
  console.log(cart);
  if (!cart) {
    cart = [];
  }
  const book = {
    id: bookData.id,
    title: bookData.title,
    author: bookData.author,
    type: bookData.type,
    price: bookData.price,
    cover: bookData.cover,
    quantity: parseInt(quantityInput.value || 1),
  };
  const bookIndex = findBookIndex(book.id, cart);
  console.log(bookIndex);
  if (bookIndex === -1) {
    cart.push(book);
  } else {
    cart[bookIndex].quantity += book.quantity;
  }
  localStorage.setItem("cart", JSON.stringify(cart));
};

// find book index in cart
const findBookIndex = (id, cart) => {
  for (let i = 0; i < cart.length; i++) {
    const book = cart[i];
    if (book.id === id) {
      return i;
    }
  }
  return -1;
};

addToCartButton.onclick = handleAddToCart;
buyNowButton.onclick = handleBuyNow;
