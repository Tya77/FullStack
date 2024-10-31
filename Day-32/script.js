const btnCompleted = document.querySelector(".btn-completed");
const arrow = document.querySelector(".btn-completed i ");
const btnAdd = document.querySelector(".btn-add");
const add = document.querySelector(".add");
const btnSave = document.querySelector(".btn-save");
const btnCancel = document.querySelector(".btn-cancel");
const addInput = document.querySelector(".form-add input");
const todosWrapper = document.querySelector(".todos-wrapper");
const todosForm = document.querySelector(".todos-form");
const todoIndex = document.querySelector(".todo-index");

// fetch(`https://7htq2x-8080.csb.app/users`, {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({ name: "John" }),
// })
//   .then((res) => res.json())
//   .then((data) => {});

let editingTodoItem = null;

btnCompleted.addEventListener("click", function () {
  arrow.classList.toggle("active");
  btnCompleted.classList.toggle("active");
});

btnAdd.addEventListener("click", function () {
  add.classList.add("active");
});
btnCancel.addEventListener("click", function () {
  add.classList.remove("active");
  // addInput.removeAttribute("required");
});

const todosList = document.querySelector(".todos-list");
btnSave.addEventListener("click", function () {
  const todoText = addInput.value;

  if (editingTodoItem) {
    const todoId = editingTodoItem.getAttribute("data-id");

    // Gửi yêu cầu PUT đến API để cập nhật todo với id
    fetch(`https://7htq2x-8080.csb.app/users/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: todoText }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Không thể cập nhật todo với id ${todoId}`);
        }
        return res.json();
      })
      .then((data) => {
        // Cập nhật nội dung todo trên giao diện
        const span = editingTodoItem.querySelector("span");
        span.textContent = todoText;

        // Reset trạng thái chỉnh sửa
        editingTodoItem = null;
        addInput.value = "";
        add.classList.remove("active");
      })
      .catch((error) => {
        console.error("Có lỗi khi cập nhật todo:", error);
      });
  } else {
    // Thêm todo mới vào API
    fetch(`https://7htq2x-8080.csb.app/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: todoText }),
    })
      .then((res) => res.json())
      .then((data) => {
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");
        todoItem.setAttribute("data-id", data.id);
        todosList.appendChild(todoItem);

        const span = document.createElement("span");
        span.textContent = todoText;

        const itemActions = document.createElement("div");
        itemActions.classList.add("item-actions");

        const btnDelete = document.createElement("button");
        btnDelete.classList.add("btn-delete");
        btnDelete.innerHTML = '<i class="fa-solid fa-trash"></i>';
        btnDelete.addEventListener("click", function () {
          const todoId = todoItem.getAttribute("data-id");

          fetch(`https://7htq2x-8080.csb.app/users/${todoId}`, {
            method: "DELETE",
          })
            .then((res) => {
              if (!res.ok) {
                throw new Error(`Không thể xóa todo với id ${todoId}`);
              }
              todosList.removeChild(todoItem);
            })
            .catch((error) => {
              console.error("Có lỗi khi xóa todo:", error);
            });
        });

        const btnEdit = document.createElement("button");
        btnEdit.classList.add("btn-edit");
        btnEdit.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
        btnEdit.addEventListener("click", function () {
          editingTodoItem = todoItem;
          add.classList.add("active");
          addInput.value = span.textContent;
        });

        const btnCheck = document.createElement("button");
        btnCheck.classList.add("btn-check");
        btnCheck.innerHTML = '<i class="fa-solid fa-square-check"></i>';

        btnCheck.addEventListener("click", function () {
          const todoItems = document.querySelectorAll(".todo-item").length;
          todoIndex.textContent = `${todoItems}`;
          btnCheck.classList.add("active");
        });

        itemActions.appendChild(btnDelete);
        itemActions.appendChild(btnEdit);
        itemActions.appendChild(btnCheck);

        todoItem.appendChild(span);
        todoItem.appendChild(itemActions);

        todosList.appendChild(todoItem);

        addInput.value = "";
        add.classList.remove("active");
        editingTodoItem = null;
      });
  }
});
