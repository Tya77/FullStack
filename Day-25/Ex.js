const table_list = document.querySelector(".table_list");
const tbody_table_list = document.querySelector(".table_list tbody");
const table_cart = document.querySelector(".table_cart");
const btn_cart = document.querySelector(".btn_cart");
const cart_data = document.querySelector(".cart_data");

const products = [
  {
    id: 1,
    name: "Sản phẩm 1",
    price: 1000,
  },
  {
    id: 2,
    name: "Sản phẩm 2",
    price: 2000,
  },
  {
    id: 3,
    name: "Sản phẩm 3",
    price: 3000,
  },
  {
    id: 4,
    name: "Sản phẩm 4",
    price: 4000,
  },
];

const productsJSON = JSON.stringify(products);
localStorage.setItem("products", productsJSON);

function Product() {
  const html = products
    .map(
      (product) =>
        `<tr>
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td>
              <input type="number" value="1" min="1" class="quantity" data-id="${product.id}" />
              <button style="width: 100%" class="btn_add" data-id="${product.id}">Thêm vào giỏ</button>
          </td>
        </tr>`
    )
    .join("");
  tbody_table_list.innerHTML = html;
}
Product();

const btn_add = document.querySelectorAll(".btn_add");
const quantity = document.querySelectorAll(".quantity");

// Lấy giỏ hàng từ localStorage hoặc khởi tạo mảng rỗng nếu chưa có
let carts = getLocalStorage() || [];

// Hàm lấy dữ liệu giỏ hàng từ localStorage
function getLocalStorage() {
  return JSON.parse(localStorage.getItem("carts"));
}

// Hàm lưu giỏ hàng vào localStorage
function setLocalStorage() {
  localStorage.setItem("carts", JSON.stringify(carts));
}

// Xử lý thêm sản phẩm vào giỏ hàng
btn_add.forEach((btn, index) => {
  btn.addEventListener("click", function () {
    table_cart.style.display = "table";
    const productId = parseInt(btn.getAttribute("data-id")); // Lấy ID sản phẩm
    const productQuantity = parseInt(quantity[index].value); // Lấy số lượng sản phẩm

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const existProduct = carts.find(
      (product) => product.product_id === productId
    );

    if (productQuantity < 1) {
      quantity[index].value = 1;
    }

    if (existProduct) {
      // Nếu sản phẩm đã tồn tại, tăng số lượng
      existProduct.quantity += productQuantity;
      existProduct.total = existProduct.quantity * existProduct.price;
    } else {
      // Nếu sản phẩm chưa có trong giỏ, thêm mới
      const newProduct = {
        product_id: productId,
        name: products[index].name,
        price: products[index].price,
        quantity: productQuantity,
        total: productQuantity * products[index].price,
      };
      carts.push(newProduct); // Đẩy sản phẩm mới vào giỏ hàng
    }

    setLocalStorage(); // Lưu giỏ hàng vào localStorage
    renderCart(); // Render giỏ hàng
  });
});

// hiển thị giỏ hàng
function renderCart() {
  // Xóa nội dung cũ trước khi render lại giỏ hàng
  table_cart.innerHTML = "";
  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr>
      <th width="5%">STT</th>
      <th>Tên sản phẩm</th>
      <th width="20%">Giá</th>
      <th width="20%">Số lượng</th>
      <th width="20%">Thành tiền</th>
      <th width="5%">Xoá</th>
    </tr>
  `;
  table_cart.appendChild(thead);
  if (carts.length === 0) {
    table_cart.innerText = "Giỏ hàng không có sản phẩm";
    btn_cart.style.display = "none";
    return;
  }
  btn_cart.style.display = "block";

  carts.forEach((cart, index) => {
    const cartItem = document.createElement("tr");
    cartItem.innerHTML = `
      <td>${index + 1}</td>
      <td>${cart.name}</td>
      <td>${cart.price}</td>
      <td>
        <input type="number" value="${cart.quantity}" class="total-num" />
      </td>
      <td>${cart.total}</td>
      <td>
        <button class="delete-product" data-id="${cart.product_id}">Xóa</button>
      </td>`;
    table_cart.appendChild(cartItem);
  });

  // Tổng
  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `
    <td colspan="3">Tổng</td>
    <td>${carts.reduce((total, product) => total + product.quantity, 0)}</td>
    <td colspan="2">${carts.reduce(
      (total, product) => total + product.total,
      0
    )}</td>
  `;
  table_cart.appendChild(totalRow);

  // Xóa
  const delete_product = document.querySelectorAll(".delete-product");
  delete_product.forEach((btn) => {
    btn.addEventListener("click", function () {
      const productId = parseInt(btn.getAttribute("data-id"));

      const confirmDelete = confirm("Are you sure?");
      if (confirmDelete) {
        carts = carts.filter((cart) => cart.product_id !== productId); // Xóa sản phẩm khỏi giỏ hàng
        setLocalStorage(); // Cập nhật lại localStorage
        renderCart(); // Render lại giỏ hàng
      }
    });
  });
}

// Hàm update All
function updateCart() {
  document.querySelectorAll(".total-num").forEach((input, index) => {
    const newQuantity = parseInt(input.value);
    if (newQuantity > 0) {
      carts[index].quantity = newQuantity;
      carts[index].total = newQuantity * carts[index].price; // Cập nhật tổng
    }
  });
  setLocalStorage();
  renderCart();
}

// Hàm xóa All giỏ hàng
function deleteAllCart() {
  const confirmDeleteAll = confirm(
    "Bạn có chắc chắn muốn xóa tất cả sản phẩm trong giỏ hàng?"
  );
  if (confirmDeleteAll) {
    carts = []; // Xóa giỏ hàng
    setLocalStorage(); // Cập nhật lại localStorage
    renderCart(); // Render lại giỏ hàng
  }
}

const updateAllBtn = document.querySelector(".updateAll_cart");
updateAllBtn.addEventListener("click", updateCart);

const deleteAllBtn = document.querySelector(".deleteAll_cart");
deleteAllBtn.addEventListener("click", deleteAllCart);

renderCart();
