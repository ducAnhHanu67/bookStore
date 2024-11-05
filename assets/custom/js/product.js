// Fetch dữ liệu từ file booklist.json
fetch("../data/booklist.json")
    .then((response) => response.json())
    .then((jsonData) => {
        // Hiển thị tất cả sách trong jsonData vào container #book-container
        initializeAllBooks(jsonData);
    })
    .catch((error) => console.error("Error loading booklist.json:", error));

// Hàm này sẽ thêm tất cả sách vào container
function initializeAllBooks(bookList) {
    const container = document.getElementById("book-container");

    // Xóa nội dung cũ trong container
    container.innerHTML = "";

    // Lặp qua từng sách trong bookList và tạo phần tử hiển thị
    bookList.forEach((book) => {
        const bookElement = document.createElement("div");
        bookElement.classList.add("col-6", "col-md-4", "col-lg-3", "mb-4");

        bookElement.innerHTML = `
            <div class="card h-100">
                <img src="${book.image}" class="card-img-top" alt="${book.title}">
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <p class="card-text">${book.author}</p>
                </div>
            </div>
        `;

        // Thêm sách vào container
        container.appendChild(bookElement);
    });
}
