// get sign up form

const signupForm = document.getElementById("signup-form");
const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const confirmPasswordError = document.getElementById("confirm-password-error");

// handle submit form
/**
 * validate name, email and password
 * if valid show success message
 * else show error message
 */

signupForm.onsubmit = (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  if (!validateInput(name, email, password, confirmPassword)) {
    return;
  }
  // store to local storage
  const USER_RESGISTER = "USER_RESGISTER";
  const user = {
    name,
    email,
    password,
  };
  const users = JSON.parse(localStorage.getItem(USER_RESGISTER)) || [];
  users.push(user);
  localStorage.setItem(USER_RESGISTER, JSON.stringify(users));
  const signupTitle = document.getElementById("signup-title");
  signupTitle.classList.add(
    "animate__animated",
    "animate__tada",
    "animate__infinite"
  );
  signupTitle.innerHTML = "Đăng ký thành công!";

  setTimeout(() => {
    window.location.href = "signin.html";
  }, 1000);
};

/**
 * validate name, email and password
 * name >6 characters and < 50 characters, can inlcude a-z,A-Z, space and Vietnamese characters
 * email: required, email correct format, length <= 50, length >= 6
 * password: required, length >= 6, length <= 16
 */

const validateInput = (name, email, password, confirmPassword) => {
  if (
    name.trim() === "" &&
    email === "" &&
    password === "" &&
    confirmPassword === ""
  ) {
    nameError.innerHTML = "Tên đẩy đủ là bắt buộc";
    emailError.innerHTML = "Email là bắt buộc";
    passwordError.innerHTML = "Mật khẩu là bắt buộc";
    confirmPasswordError.innerHTML = "Xác nhận mật khẩu là bắt buộc";
    return false;
  }

  if (name.trim() === "") {
    nameError.innerHTML = "Tên đẩy đủ là bắt buộc";
    return false;
  }

  if (email === "") {
    emailError.innerHTML = "Email là bắt buộc";
    return false;
  }

  if (password === "") {
    passwordError.innerHTML = "Mật khẩu là bắt buộc";
    return false;
  }

  if (confirmPassword === "") {
    confirmPasswordError.innerHTML = "Xác nhận mật khẩu là bắt buộc";
    return false;
  }

  if (name.length < 6 || name.length > 50) {
    nameError.innerHTML = "Tên phải từ 6 đến 50 ký tự";
    return false;
  }
  const nameRegex = /^[a-zA-ZÀ-ỹ ]+$/;
  if (name.trim() && !nameRegex.test(name)) {
    nameError.innerHTML =
      "Tên chỉ được chứa chữ cái và khoảng trống giữa các từ";
    return false;
  }

  if (email.length > 50 || email.length < 6) {
    emailError.innerHTML = "Email phải từ 6 đến 50 ký tự";
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    emailError.innerHTML = "Email không đúng định dạng";
    return false;
  }

  if (password.length > 16 || password.length < 6) {
    passwordError.innerHTML = "Mật khẩu phải từ 6 đến 16 ký tự";
    return false;
  }
  if (password !== confirmPassword) {
    confirmPasswordError.innerHTML = "Mật khẩu xác nhận không khớp";
    return false;
  }
  return true;
};

/**
 * on input error message remove
 */

const handleOninput = () => {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.oninput = () => {
      nameError.innerHTML = "";
      emailError.innerHTML = "";
      passwordError.innerHTML = "";
      confirmPasswordError.innerHTML = "";
    };
  });
};
handleOninput();
