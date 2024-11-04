document.addEventListener("DOMContentLoaded", function () {
    const categories = [
        { key: "Comic & Graphic novels", containerId: "book-container-comic", prevBtnId: "prev-btn-comic", nextBtnId: "next-btn-comic" },
        { key: "Science fiction & fantasy", containerId: "book-container-scifi", prevBtnId: "prev-btn-scifi", nextBtnId: "next-btn-scifi" },
        { key: "Romance", containerId: "book-container-romance", prevBtnId: "prev-btn-romance", nextBtnId: "next-btn-romance" },
        { key: "Humor & Entertainment", containerId: "book-container-humor", prevBtnId: "prev-btn-humor", nextBtnId: "next-btn-humor" },
    ];

    const itemsToShow = 3; // Số lượng item hiển thị cùng lúc

    // Fetch book data from booklist.json
    fetch("../data/booklist.json")
        .then((response) => response.json())
        .then((jsonData) => {
            categories.forEach(category => {
                if (jsonData[category.key]) {
                    initializeCategory(jsonData[category.key], category.containerId, category.prevBtnId, category.nextBtnId);
                }
            });
        })
        .catch((error) => console.error("Error loading booklist.json:", error));

    function initializeCategory(books, containerId, prevBtnId, nextBtnId) {
        const bookContainer = document.getElementById(containerId);
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);

        let currentIndex = 0;

        function displayBooks() {
            bookContainer.innerHTML = "";

            // Select books for current index range
            const booksToShow = books.slice(currentIndex, currentIndex + itemsToShow);

            booksToShow.forEach((book) => {

                const bookDiv = document.createElement("div");
                bookDiv.classList.add("col-12", "col-sm-6", "col-lg-4", "d-flex", "justify-content-center", "mt-4", "row");

                // Create inner HTML for each book item with the "See details" button linking to the book detail
                bookDiv.innerHTML = `
                    <div class="col-9 bg-white rounded-2 p-2 product-container rounded-3">
                        <img src="${book.cover}" class="h-50 mx-auto d-block hvr-grow" />
                        <div class="d-flex flex-column align-items-center justify-content-between h-25">
                            <h5 class="fs-6 fw-bold mt-2 btn hvr-grow text-success">${book.title}</h5>
                            <p class="fw-bold text-success text-center">
                                ${book.price.toLocaleString("en-US", { style: "currency", currency: "VND" })}
                            </p>
                            <div class="w-100 d-flex justify-content-evenly">
                                <button class="btn btn-outline-success hvr-pu-grow" onclick="getBookDetail('${book.type}_${book.id}')">See details</button>
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

            // Handle visibility of navigation buttons
            prevBtn.style.display = currentIndex === 0 ? "none" : "inline-block";
            nextBtn.style.display = currentIndex + itemsToShow >= books.length ? "none" : "inline-block";
        }

        // Previous button functionality
        prevBtn.addEventListener("click", function () {
            if (currentIndex > 0) {
                currentIndex--;
                displayBooks();
            }
        });

        // Next button functionality
        nextBtn.addEventListener("click", function () {
            if (currentIndex + itemsToShow < books.length) {
                currentIndex++;
                displayBooks();
            }
        });

        displayBooks(); // Initial display of books
    }
});

// Define the getBookDetail function to store book info in local storage and navigate to the detail page
function getBookDetail(key) {
    const [type, id] = key.split("_");
    const bookInfo = { type, id };
    localStorage.setItem("bookInfo", JSON.stringify(bookInfo));
    window.location.href = "bookDetail.html";
}
