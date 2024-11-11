
import { client } from "./client.js";
import { requestRefresh } from "./token.js";

client.setUrl("https://api.escuelajs.co/api/v1");

const root = document.querySelector("#root");

const isLogin = () => {
  const tokens = localStorage.getItem("login_token");
  return !!tokens;
};

const handleLogout = () => {
  localStorage.removeItem("login_token");
  render();
};

const getProfile = async () => {
  const tokens = localStorage.getItem("login_token");
  if (tokens) {
    const { access_token: accessToken, refresh_token: refreshToken } =
      JSON.parse(tokens);
    if (!accessToken) {
      handleLogout();
    } else {
      client.setToken(accessToken);
      const { response, data } = await client.get("/auth/profile");
      if (!response.ok) {
        const { data: newToken } = await requestRefresh(refreshToken);
        if (newToken) {
          localStorage.setItem("login_token", JSON.stringify(newToken));
          getProfile();
        } else {
          handleLogout();
        }
      } else {
        const profileName = document.querySelector(".profile .name");
        profileName.innerText = data.name;
      }
    }
  }
};

const eventLogin = () => {
  const loginForm = document.querySelector(".login");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailEl = e.target.querySelector(".email");
      const passwordEl = e.target.querySelector(".password");

      const email = emailEl.value;
      const password = passwordEl.value;

      handleLogin({ email, password });
    });
  }
};

const eventSignUp = () => {
  const signUpForm = document.querySelector(".sign-up");
  if (signUpForm) {
    signUpForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailEl = e.target.querySelector(".email");
      const passwordEl = e.target.querySelector(".password");
      const nameEl = e.target.querySelector(".name");

      const email = emailEl.value;
      const password = passwordEl.value;
      const name = nameEl.value;

      handleSignUp({ email, password, name });
    });
  }
};

const eventLogout = () => {
  const logout = document.querySelector(".profile .logout");
  if (logout) {
    logout.addEventListener("click", (e) => {
      e.preventDefault();
      handleLogout();
    });
  }
};

const render = () => {
  if (isLogin()) {
    root.innerHTML = `<div class="container py-3">
    <h2>Chào mừng bạn đã quay trở lại</h2>
    <ul class="list-unstyled d-flex gap-3 profile">
        <li>Chào bạn: <span class="name">Loading...</span></li>
        <li><a href="#" class="logout">Đăng xuất</a></li>
    </ul>
    </div>
    `;
    getProfile();
  } else {
    root.innerHTML = `<div class="container py-3">
    <div class="row justify-content-center">
      <div class="col-7">
        <h2 class="text-center">Đăng nhập</h2>
        <form action="" class="login">
          <div class="mb-3">
            <label>Email</label>
            <input type="email" class="form-control email" placeholder="Email..." />
          </div>
          <div class="mb-3">
            <label>Password</label>
            <input type="password" autocomplete="on" class="form-control password" placeholder="Password..." />
          </div>
          <div class="d-grid">
            <button class="btn btn-primary">Đăng nhập</button>
          </div>
        </form>
        <div class="msg text-danger mt-2 text-center"></div>
        <p class="text-center">Hoặc <a href="#" class="link-signup">Đăng ký tài khoản mới</a></p>
      </div>
    </div>
    </div>`;

    const signUpLink = document.querySelector(".link-signup");
    if (signUpLink) {
      signUpLink.addEventListener("click", (e) => {
        e.preventDefault();
        renderSignUp();
      });
    }
  }

  eventLogin();
  eventLogout();
};

const renderSignUp = () => {
  root.innerHTML = `<div class="container py-3">
    <div class="row justify-content-center">
      <div class="col-7">
        <h2 class="text-center">Đăng ký</h2>
        <form action="" class="sign-up">
          <div class="mb-3">
            <label>Họ và tên</label>
            <input type="text" class="form-control name" placeholder="Họ và tên..." />
          </div>
          <div class="mb-3">
            <label>Email</label>
            <input type="email" class="form-control email" placeholder="Email..." />
          </div>
          <div class="mb-3">
            <label>Password</label>
            <input type="password" autocomplete="on" class="form-control password" placeholder="Password..." />
          </div>
          <div class="d-grid">
            <button class="btn btn-primary">Đăng ký</button>
          </div>
        </form>
        <div class="msg text-danger mt-2 text-center"></div>
        <p class="text-center">Đã có tài khoản? <a href="#" class="link-login">Đăng nhập</a></p>
      </div>
    </div>
    </div>`;

  const loginLink = document.querySelector(".link-login");
  if (loginLink) {
    loginLink.addEventListener("click", (e) => {
      e.preventDefault();
      render();
    });
  }

  eventSignUp();
};

const handleSignUp = async (data) => {
  const msg = document.querySelector(".msg");
  msg.innerText = ``;
  loading();

  if (!data.email || !data.password || !data.name) {
    msg.innerText = "Vui lòng nhập đầy đủ họ tên, email và mật khẩu.";
    loading("remove");
    return;
  }

  try {
    const response = await fetch("https://api.escuelajs.co/api/v1/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
        avatar: "https://api.lorem.space/image/face?w=150&h=220",
      }),
    });

    const result = await response.json();

    if (response.ok) {
      alert("Đăng ký thành công! Vui lòng đăng nhập.");
      render();
    } else {
      console.error("Đăng ký lỗi:", result);
      msg.innerText = `Đăng ký không thành công: ${
        result.message || "Vui lòng thử lại"
      }`;
    }
  } catch (error) {
    console.error("Lỗi kết nối:", error);
    msg.innerText = "Đăng ký không thành công, vui lòng kiểm tra lại kết nối.";
  }

  loading("remove");
};

const loading = (mode = "add") => {
  const btn = document.querySelector(".btn");
  if (btn) {
    if (mode === "add") {
      btn.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Loading`;
      btn.disabled = true;
    } else {
      btn.innerText = btn.classList.contains("btn-primary")
        ? "Đăng nhập"
        : "Đăng ký";
      btn.disabled = false;
    }
  }
};

const handleLogin = async (data) => {
  const msg = document.querySelector(".msg");
  msg.innerText = ``;
  loading();
  const { data: tokens, response } = await client.post("/auth/login", data);
  if (response.ok) {
    localStorage.setItem("login_token", JSON.stringify(tokens));
    render();
  } else {
    msg.innerText = `Thông tin đăng nhập không hợp lệ`;
  }
  loading("remove");
};

render();
