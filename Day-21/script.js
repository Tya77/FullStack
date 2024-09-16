const form_main = document.querySelector(".form-main");
const btn = document.querySelector(".btn-click");
const overlay = document.querySelector(".overlay");
const loginTab = document.querySelector(".loggin");
const registerTab = document.querySelector(".register");
const loginForm = document.querySelector(".login-wrapper");
const registerForm = document.querySelector(".register-wrapper");
const eye = document.querySelector(".eye");

const i_eye_register = document.querySelector(".i-eye-register");
const eye_slash_register = document.querySelector(".eye-slash-register");

const eye_slash_login = document.querySelector(".eye-slash-login");

const i_eye_login = document.querySelector(".i-eye-login");

const warning_acc = document.querySelector(".warning.warning-acc");
const btn_login = document.querySelector(".btn-login");

console.log(warning_acc);

const warning_email_login = document.querySelector(
  ".warning.warning-email-login"
);
const warning_password_login = document.querySelector(
  ".warning.warning-password-login"
);
const warning_name_register = document.querySelector(
  ".warning.warning-name-register"
);
const warning_email_register = document.querySelector(
  ".warning.warning-email-register"
);
const warning_password_register = document.querySelector(
  ".warning-password-register"
);
const email_login = document.getElementById("email-login");
const pass_login = document.getElementById("password-login");
const name_register = document.getElementById("name-register");
const email_register = document.getElementById("email-register");
const pass_register = document.getElementById("password-register");
btn.addEventListener("click", function () {
  form_main.classList.add("active");
  overlay.classList.add("active");
  loginTab.classList.add("active");
  registerTab.classList.remove("active");
  loginForm.classList.add("active");
  i_eye_register.classList.add("active");
  i_eye_login.classList.add("active");
});
overlay.addEventListener("click", function () {
  form_main.classList.remove("active");
});
loginTab.addEventListener("click", function () {
  loginForm.classList.add("active");
  registerForm.classList.remove("active");
  registerTab.classList.remove("active");
  loginTab.classList.add("active");
  eye_slash_login.classList.remove("active");
  i_eye_login.classList.add("active");
});
registerTab.addEventListener("click", function () {
  registerForm.classList.add("active");
  loginForm.classList.remove("active");
  registerTab.classList.add("active");
  loginTab.classList.remove("active");
  eye_slash_register.classList.remove("active");
  i_eye_register.classList.add("active");
});

function validateEmail(mail, e) {
  if (mail.value === "") {
    e.innerHTML = "Vui lòng nhập thông tin";
  } else {
    e.innerHTML = "";
  }
}

function validatePass(pass, e) {
  if (pass.value === "") {
    e.innerHTML = "Vui lòng nhập thông tin";
  } else {
    if (pass.value.length >= 6 && pass.value.length < 20) {
      e.innerHTML = "";
    } else {
      e.innerHTML = "mật khẩu từ 6-20 ký tự";
    }
  }
}

function ValidateName(name, e) {
  if (name.value === "") {
    e.innerHTML = "Vui lòng nhập thông tin";
  } else {
    e.innerHTML = "";
  }
}

pass_login.addEventListener("input", function () {
  validatePass(pass_login, warning_password_login);
});

email_login.addEventListener("input", function () {
  validateEmail(email_login, warning_email_login);
});
pass_login.addEventListener("blur", function () {
  if (pass_login.value === "" && email_login.value === "") {
    warning_password_login.innerHTML = "Vui lòng nhập thông tin";
    warning_email_login.innerHTML = "Vui lòng nhập thông tin";
  }
});
email_login.addEventListener("blur", function () {
  if (pass_login.value === "" && email_login.value === "") {
    warning_password_login.innerHTML = "Vui lòng nhập thông tin";
    warning_email_login.innerHTML = "Vui lòng nhập thông tin";
  }
});

name_register.addEventListener("input", function () {
  ValidateName(name_register, warning_name_register);
});

pass_register.addEventListener("input", function () {
  validatePass(pass_register, warning_password_register);
});

email_register.addEventListener("input", function () {
  validateEmail(email_register, warning_email_register);
});
name_register.addEventListener("blur", function () {
  if (
    pass_register.value === "" &&
    email_register.value === "" &&
    name_register.value === ""
  ) {
    warning_password_register.innerHTML = "Vui lòng nhập thông tin";
    warning_email_register.innerHTML = "Vui lòng nhập thông tin";
    warning_name_register.innerHTML = "Vui lòng nhập thông tin";
  }
});
pass_register.addEventListener("blur", function () {
  if (
    pass_register.value === "" &&
    email_register.value === "" &&
    name_register.value === ""
  ) {
    warning_password_register.innerHTML = "Vui lòng nhập thông tin";
    warning_email_register.innerHTML = "Vui lòng nhập thông tin";
    warning_name_register.innerHTML = "Vui lòng nhập thông tin";
  }
});
email_register.addEventListener("blur", function () {
  if (
    pass_login.value === "" &&
    email_login.value === "" &&
    name_register.value === ""
  ) {
    warning_password_login.innerHTML = "Vui lòng nhập thông tin";
    warning_email_login.innerHTML = "Vui lòng nhập thông tin";
    warning_name_register.innerHTML = "Vui lòng nhập thông tin";
  }
});
eye.addEventListener("click", function () {
  const pass_loginType = pass_login.getAttribute("type");
  pass_login.setAttribute(
    "type",
    pass_loginType === "password" ? "text" : "password"
  );
});
i_eye_register.addEventListener("click", function () {
  const pass_registerType = pass_register.getAttribute("type");
  pass_register.setAttribute(
    "type",
    pass_registerType === "password" ? "text" : "password"
  );
});

btn_login.addEventListener("click", function () {
  warning_acc.innerHTML = "Account not exist";
});

btn_login.addEventListener("click", function () {
  warning_acc.innerHTML = "Account not exist";
});
i_eye_login.addEventListener("click", function () {
  eye_slash_login.classList.add("active");
  i_eye_login.classList.remove("active");
});
eye_slash_login.addEventListener("click", function () {
  eye_slash_login.classList.remove("active");
  i_eye_login.classList.add("active");
});

i_eye_register.addEventListener("click", function () {
  eye_slash_register.classList.add("active");
  i_eye_register.classList.remove("active");
});
eye_slash_register.addEventListener("click", function () {
  eye_slash_register.classList.remove("active");
  i_eye_register.classList.add("active");
});
