// Bài 1
var errors = {
  name: {
    required: "Vui lòng nhập họ tên",
    min: "Họ tên phải từ 5 ký tự",
  },
  email: {
    email: "Định dạng email không hợp lệ",
    unique: "Email đã có người sử dụng",
    required: "Vui lòng nhập địa chỉ email",
  },
  password: {
    required: "Vui lòng nhập mật khẩu",
    same: "Mật khẩu phải khớp với mật khẩu nhập lại",
  },
};
function getError(field) {
  if (errors[field]) {
    for (var key in errors[field]) {
      return errors[field][key];
    }
  } else {
    return "Not error!";
  }
}

console.log(getError("name"));

// bài 2
const customers = [
  { name: "Nguyễn Văn A", age: 11, address: "Ha Noi" },
  { name: "Nguyễn Văn B", age: 2, address: "Hai Phong" },
  { name: "Nguyễn Văn C", age: 12, address: "TP.HCM" },
];

const result = createCustomers(customers);
function createCustomer(name, age, address) {
  return { name, age, address };
}

function createCustomers(customers) {
  return customers
    .map((customer) => {
      const nameI = customer.name.split(" ");
      const shortName = `${nameI[0]} ${nameI[nameI.length - 1]}`;
      return { ...customer, shortName };
    })
    .sort((a, b) => a.age - b.age);
}
console.log(result);

// Bài 3
const data = [];

function handleRegister(name, password, email) {
  if (!name || !password || !email) {
    console.error("Thông tin không đầy đủ");
    return;
  }

  const newUser = {
    name,
    password,
    email,
    role: "user",
  };

  data.push(newUser);

  return newUser;
}

function handleLogin(email, password) {
  const user = data.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    return user;
  } else {
    console.error("Thông tin đăng nhập không hợp lệ");
    return null;
  }
}

// Đăng ký người dùng
const dataRegister = handleRegister(
  "Nguyen Van A",
  "123456",
  "nguyenvana@email.com"
);
const dataRegister2 = handleRegister(
  "Nguyen Van B",
  "1234567",
  "nguyenvanb@email.com"
);

const dataLogin = handleLogin("nguyenvana@email.com", "123456");

console.log("data =", data);
console.log("dataLogin =", dataLogin);
