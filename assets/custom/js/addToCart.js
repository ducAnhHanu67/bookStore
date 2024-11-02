handleAddToCartByKey();
function handleAddToCartByKey() {
  const addToCartByKeyBtn = document.querySelectorAll(".add-to-cart-by-key");

  // get and store BOOKLIST to local storage
  var bookList;
  const getBookList = () => {
    fetch("../data/booklist.json")
      .then((res) => res.json())
      .then((data) => {
        bookList = data || [];
        localStorage.setItem("BOOKLIST", JSON.stringify(bookList));
      });
  };
  getBookList();

  // get book by key
  const getBookByKey = (key) => {
    const type = key.split("_")[0];
    const id = parseInt(key.split("_")[1]);
    const bookList = JSON.parse(localStorage.getItem("BOOKLIST"))[type];
    if (bookList) {
      for (let book of bookList) {
        if (book.id === id) {
          console.log(book);
          return book;
        }
      }
    }
    return null;
  };

  // add book to cart
  const addBookToCart = (book) => {
    if (book) {
      var cart = JSON.parse(localStorage.getItem("cart"));
      if (!cart) {
        cart = [];
      }
      const bookIndex = findBookIndex(book.id, cart);
      if (bookIndex === -1) {
        const bookData = {
          author: book.author,
          cover: book.cover,
          id: book.id,
          price: book.price,
          quantity: 1,
          title: book.title,
          type: book.type,
        };
        cart.push(bookData);
      } else {
        cart[bookIndex].quantity += 1;
      }
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  const findBookIndex = (id, cart) => {
    for (let i = 0; i < cart.length; i++) {
      const book = cart[i];
      if (book.id === id) {
        return i;
      }
    }
    return -1;
  };
  // add event listener to all add to cart button

  for (const btn of addToCartByKeyBtn) {
    btn.addEventListener("click", () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        alert("Bạn cần Log In để mua hàng");
        window.location.href = "signin.html";
        return;
      }
      const key = btn.getAttribute("key");
      const book = getBookByKey(key);
      if (book) {
        addBookToCart(book);
        const buyNow = confirm(
          "Add to Cart thành công!\nThanh toán ngay."
        );
        if (buyNow) {
          window.location.href = "checkout.html";
        }
      } else {
        alert(
          "Có lỗi xảy ra, quý khách có thể thử thêm sản phẩm ở trang chi tiết.\n Xin lỗi vì sự bất tiện này!"
        );
      }
    });
  }
}
