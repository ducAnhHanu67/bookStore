const signinForm = document.getElementById("signin-form");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
/**
 * get data from local storage
 */
var users = JSON.parse(localStorage.getItem("USER_RESGISTER")) || [];

/**
 * when the user submits the form, get data from email and password fields
 * and check with data in users
 */
signinForm.onsubmit = (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  if (!validateInput(email, password)) {
    return;
  }
  // check email and password
  const user = findUser(email);

  if (user) {
    if (user.password === password) {
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "home.html";
    } else {
      alert("Wrong password");
    }
  } else {
    alert("User not found");
  }
};

/**
 * find user by email
 * if found, return user
 * else return null
 */
const findUser = (email) => {
  for (user of users) {
    if (user.email === email) {
      return user;
    }
  }
  return null;
};

/**
 * validate email and password
 * email: required, email correct format, length <= 50
 */

const validateInput = (email, password) => {
  if (email === "" || password === "") {
    emailError.textContent = "Email là bắt buộc";
    passwordError.textContent = "Mật khẩu là bắt buộc";
    return false;
  }
  if (email.length > 50 || email.length < 6) {
    emailError.textContent = "Email phải từ 6 đến 50 ký tự";
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    emailError.textContent = "Email không đúng định dạng";
    return false;
  }

  if (password.length > 16 || password.length < 6) {
    passwordError.textContent = "Mật khẩu phải từ 6 đến 16 ký tự";
    return false;
  }
  return true;
};

/**
 * on input remove error message
 */

const handleOninput = () => {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.oninput = () => {
      console.log();
      emailError.textContent = "";
      passwordError.textContent = "";
    };
  });
};
handleOninput();
