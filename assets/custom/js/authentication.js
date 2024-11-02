/**
 * check local storage
 * if user is logged in show user name and logout button
 */

const user = JSON.parse(localStorage.getItem("user"));
if (user) {
  const userActionContainer = document.getElementById("user-action-container");
  userActionContainer.innerHTML = `
    <span class="text-muted mx-1">Hi, ${user.name}</span>
    |<span class="text-muted mx-1 btn p-0 hvr-grow" id="logout">Log out</span>`;
}

// handle logout

const logout = document.getElementById("logout");
if (logout) {
  logout.addEventListener("click", () => {
    localStorage.removeItem("user");
    localStorage.removeItem("BOOKLIST");
    localStorage.removeItem("cart");
    window.location.href = "home.html";
  });
}
