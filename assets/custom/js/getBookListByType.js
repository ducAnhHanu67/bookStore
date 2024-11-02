const bookListContainer = document.querySelector(".book-list-container");

// get book list by type from booklist.json
// type is ForeignLiterature, VietnameseLiterature and Kids, store in id
var bookList;
const getBookListByType = (type) => {
  fetch("../data/booklist.json")
    .then((res) => res.json())
    .then((data) => {
      bookList = data[type] || [];
      bookListContainer.innerHTML = renderBookList(bookList);
      handleGetBookDetail();
      handleAddToCartByKey();
    });
};

// render book list
const renderBookList = (bookList) => {
  var html = "";
  // console.log(bookList);
  if (bookList) {
    for (const book of bookList) {
      html += renderBook(book);
    }
  }
  // console.log(html);
  return html;
};

// render book
const renderBook = (book) => {
  return ` <div
                  class="col-12 col-sm-6 col-lg-4 d-flex justify-content-center mt-4 row"
                >
                  <div
                    class="col-9 bg-white rounded-2 p-2 product-container rounded-3"
                  >
                    <img
                      src="${book.cover}"
                      class="h-50 mx-auto d-block hvr-grow"
                    />
                    <div
                      class="d-flex flex-column align-items-center justify-content-between h-25"
                    >
                      <h5
                        class="fs-6 fw-bold mt-2 btn hvr-grow text-success getBookDetail"
                        key="${bookListContainer.id}_${book.id}"
                      >
                        ${book.title}
                      </h5>
                      <p class="fw-bold text-success text-center">
                        ${book.price}.000
                        <span
                          class="text-decoration-line-through text-secondary"
                          >${Math.floor(book.price * 1.4) + ".000"}</span
                        >
                        VNĐ
                      </p>
                      <div class="w-100 d-flex justify-content-evenly">
                      <button
                        class="btn btn-outline-success hvr-pu-grow getBookDetail"
                        key="${bookListContainer.id}_${book.id}"
                      >
                        Xem thêm
                      </button>  
                      <button
                          type="button"
                          class="btn btn-outline-success hvr-grow-shadow w-25 add-to-cart-by-key"
                          key="${bookListContainer.id}_${book.id}"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-cart"
                            viewBox="0 0 16 16"
                          >
                            <path
                              d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>`;
};

const handleGetBookDetail = () => {
  const getBookDetailButtons = document.querySelectorAll(".getBookDetail");
  for (const button of getBookDetailButtons) {
    button.onclick = () => {
      console.log("clicked");
      const key = button.getAttribute("key").split("_");
      const type = key[0];
      const id = key[1];
      const bookInfo = { type, id };
      localStorage.setItem("bookInfo", JSON.stringify(bookInfo));
      window.location.href = "bookDetail.html";
    };
  }
};

getBookListByType(bookListContainer.id);
renderBookList(bookList);
