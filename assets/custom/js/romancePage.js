// Fetch dữ liệu từ file booklist.json
fetch("../data/booklist.json")
    .then((response) => response.json())
    .then((jsonData) => {
        // Hiển thị sách trong danh mục "comic" vào container #product-list
        displayComicProducts(jsonData);
    })
    .catch((error) => console.error("Error loading booklist.json:", error));

// Hàm này sẽ hiển thị các sản phẩm trong danh mục "comic"
function displayComicProducts(bookList) {
    const container = document.getElementById("product-list");

    // Xóa nội dung cũ trong container
    container.innerHTML = "";

    // Lấy danh sách sách trong danh mục "comic"
    const comicBooks = bookList["Romance"];

    // Kiểm tra nếu danh mục "comic" tồn tại
    if (!comicBooks) {
        console.error("No comic books found in the data.");
        return;
    }

    // Duyệt qua từng sách trong danh mục "comic"
    comicBooks.forEach((book) => {
        const productElement = document.createElement("div");
        productElement.classList.add("col-6", "col-md-4", "col-lg-3", "mb-4");

        // Tính toán giá đã giảm 10%
        const discountedPrice = book.price * 0.9;

        // HTML của mỗi thẻ sản phẩm
        productElement.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${book.cover}" class="card-img-top" alt="${book.title}">
                <div class="card-body text-center">
                    <h5 class="card-title">${book.title}</h5>
                    <p class="card-text text-muted">${book.author}</p>
                    <p class="fw-bold">
                        <span style="text-decoration: line-through; color: #888;">
                            ${book.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                        </span>
                        <span class="text-success ms-2">
                            ${discountedPrice.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                        </span>
                    </p>
                   <button class="btn btn-outline-success btn-see-details"
                            onclick="getBookDetail2('Romance','${book.id}')">
                        See Details
                    </button>
                </div>
            </div>
        `;

        // Thêm sản phẩm vào container
        container.appendChild(productElement);
    });
}
function getBookDetail2(type, id) {
    console.log(type, 'ty', id, 'id');

    const bookInfo = { type, id }; // Lưu type và id của sách
    localStorage.setItem("bookInfo", JSON.stringify(bookInfo));
    window.location.href = "bookDetail.html"; // Chuyển đến trang chi tiết
}
