const SERVERAPI = `http://localhost:3000/todoList`;

const btnCompleted = document.querySelector(".btn-completed");
const arrow = document.querySelector(".btn-completed i");
const btnAdd = document.querySelector(".btn-add");
const add = document.querySelector(".add");
const btnSave = document.querySelector(".btn-save");
const btnCancel = document.querySelector(".btn-cancel");
const addInput = document.querySelector(".form-add input");
const task_list = document.querySelector(".task-list");

btnCompleted.addEventListener("click", function () {
  arrow.classList.toggle("active");
  btnCompleted.classList.toggle("active");
});

btnAdd.addEventListener("click", function () {
  add.classList.add("active");
});
btnCancel.addEventListener("click", function () {
  add.classList.remove("active");
});

async function getTodo() {
  const response = await fetch(`${SERVERAPI}`);
  const data = await response.json();
  return data;
}

const postTodo = async (data) => {
  const response = await fetch(`${SERVERAPI}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
};

const deleteTodo = async (id) => {
  const response = await fetch(`${SERVERAPI}/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

const updateTodo = async (id, data) => {
  const response = await fetch(`${SERVERAPI}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

async function render() {
  const data = await getTodo();
  console.log(data);

  const todosList = document.querySelector(".todos-list");
  data.forEach((item) => {
    const todoItem = document.createElement("div");
    todoItem.className = "todo-item";
    todoItem.setAttribute("data-id", item.id);
    todoItem.innerHTML = `
        <span>${item.title}</span>
        <div class="item-actions">
            <button class="btn-delete" data-id="${item.id}">
                <i class="fa-solid fa-trash"></i>
            </button>
            <button class="btn-edit">
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="btn-check">
                <i class="fa-solid fa-square-check"></i>
            </button>
        </div>
    `;

    todosList.appendChild(todoItem);
  });
  
  const btnDelete = document.querySelectorAll(".btn-delete");
  // btnDelete.addEventListener("click", async (event) => {
  //   const currentTodoItem = event.target.closest(".todo-item");
  //   const id = currentTodoItem.getAttribute("data-id"); // Lấy id từ thuộc tính data-id của todoItem
  //   if (id) {
  //     await deleteTodo(id); // Gọi hàm để xóa todo item
  //     render(); // Render lại danh sách sau khi xóa
  //   } else {
  //     console.error("ID không hợp lệ:", id); // Xử lý lỗi
  //   }
  // });
  
}

btnSave.addEventListener("click", async () => {
  const valueInput = addInput.value.trim();
  if (!valueInput) return;
  let count = 0;
  const data = {
    // id: count++,
    title: valueInput,
  };
  await postTodo(data);
  addInput.value = "";
  add.classList.remove("active");
  render();
});

deleteTodo();
render();
