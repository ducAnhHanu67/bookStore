document.addEventListener("DOMContentLoaded", function () {
    const bookContainer = document.getElementById("book-container");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    let currentIndex = 0;
    const itemsToShow = 3; // Số lượng item hiển thị cùng lúc
    let books = [];

    // Sử dụng fetch để lấy dữ liệu từ booklist.json
    fetch("../data/booklist.json")
        .then((response) => response.json())
        .then((jsonData) => {
            // Kiểm tra xem có dữ liệu cho mục "Comic & Graphic novels" hay không
            if (jsonData["Comic & Graphic novels"]) {
                books = jsonData["Comic & Graphic novels"];
                displayBooks();
            }
        })
        .catch((error) => console.error("Error loading booklist.json:", error));

    // Hàm hiển thị các sách dựa trên chỉ mục hiện tại
    function displayBooks() {
        // Xóa nội dung cũ
        bookContainer.innerHTML = "";

        // Lấy danh sách sách cho chỉ mục hiện tại
        const booksToShow = books.slice(currentIndex, currentIndex + itemsToShow);

        // Tạo phần tử HTML cho mỗi sách
        booksToShow.forEach((book) => {
            const bookDiv = document.createElement("div");
            bookDiv.classList.add("col-12", "col-sm-6", "col-lg-4", "d-flex", "justify-content-center", "mt-4", "row");

            bookDiv.innerHTML = `
          <div class="col-9 bg-white rounded-2 p-2 product-container rounded-3">
            <img src="${book.cover}" class="h-50 mx-auto d-block hvr-grow" />
            <div class="d-flex flex-column align-items-center justify-content-between h-25">
              <h5 class="fs-6 fw-bold mt-2 btn hvr-grow text-success">${book.title}</h5>
              <p class="fw-bold text-success text-center">
                ${book.price.toLocaleString("en-US", { style: "currency", currency: "VND" })}
              </p>
              <div class="w-100 d-flex justify-content-evenly">
                <button class="btn btn-outline-success hvr-pu-grow">Xem thêm</button>
                <button type="button" class="btn btn-outline-success hvr-grow-shadow w-25">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        `;

            bookContainer.appendChild(bookDiv);
        });

        // Ẩn hiện nút Previous và Next
        prevBtn.style.display = currentIndex === 0 ? "none" : "inline-block";
        nextBtn.style.display = currentIndex + itemsToShow >= books.length ? "none" : "inline-block";
    }

    // Sự kiện cho nút Previous
    prevBtn.addEventListener("click", function () {
        if (currentIndex > 0) {
            currentIndex--; // Lùi lại 1 chỉ mục
            displayBooks();
        }
    });

    // Sự kiện cho nút Next
    nextBtn.addEventListener("click", function () {
        if (currentIndex + itemsToShow < books.length) {
            currentIndex++; // Tiến thêm 1 chỉ mục
            displayBooks();
        }
    });
});
