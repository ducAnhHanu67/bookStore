//handle get detail book
/**
 * when user click on getBookDetail button, get type and id from key attribute
 * then store in local storage
 * then redirect to book detail page
 */
const getBookDetailButtons = document.querySelectorAll(".getBookDetail");
for (const button of getBookDetailButtons) {
  button.onclick = () => {
    const key = button.getAttribute("key").split("_");
    const type = key[0];
    const id = key[1];
    const bookInfo = { type, id };
    localStorage.setItem("bookInfo", JSON.stringify(bookInfo));
    window.location.href = "bookDetail.html";
  };
}
