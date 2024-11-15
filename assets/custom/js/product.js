// Fetch dữ liệu từ file booklist.json
fetch("../data/booklist.json")
    .then((response) => response.json())
    .then((jsonData) => {
        // Hiển thị tất cả sách từ các danh mục trong jsonData vào container #product-list
        displayAllProducts(jsonData);
    })
    .catch((error) => console.error("Error loading booklist.json:", error));

// Hàm này sẽ duyệt qua từng danh mục và hiển thị tất cả sản phẩm trong container #product-list
function displayAllProducts(bookList) {
    const container = document.getElementById("product-list");

    // Xóa nội dung cũ trong container
    container.innerHTML = "";

    // Duyệt qua từng danh mục trong bookList
    Object.keys(bookList).forEach((category) => {
        const books = bookList[category];

        // Duyệt qua từng sách trong danh mục hiện tại
        books.forEach((book) => {
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
                                onclick="getBookDetail('${book.type}_${book.id}')">
                            See Details
                        </button>
                    </div>
                </div>
            `;

            // Thêm sản phẩm vào container
            container.appendChild(productElement);
        });
    });
}
function getBookDetail(key) {
    const [type, id] = key.split("_");
    const bookInfo = { type, id };
    localStorage.setItem("bookInfo", JSON.stringify(bookInfo));
    window.location.href = "bookDetail.html";
}


