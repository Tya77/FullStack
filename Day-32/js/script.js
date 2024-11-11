import { client } from "./client.js";

const formSearch = document.querySelector(".form-search");
const inputSearch = document.querySelector(".form-search input");
const btnAdd = document.querySelector(".btn-add");
const btnSave = document.querySelector(".btn-save");
const btnCancel = document.querySelector(".btn-cancel");
const btnCompleted = document.querySelector(".btn-completed");
const popup = document.querySelector(".popup");
const overlay = document.querySelector(".overlay");
const listTodoNotComplete = document.querySelector(".not-complete");
const listTodoComplete = document.querySelector(".completed");
const inputAddTodo = document.querySelector(".add-todo");
const loading = document.querySelector(".loading");

var isEdit = false;

formSearch.addEventListener("submit", (e) => {
  e.preventDefault();
});

const addPopup = () => {
  popup.classList.add("active");
  overlay.classList.add("active");
};

const removePopup = () => {
  popup.classList.remove("active");
  overlay.classList.remove("active");
  inputAddTodo.value = "";
};
btnAdd.addEventListener("click", addPopup);
btnCancel.addEventListener("click", removePopup);

btnCompleted.addEventListener("click", function () {
  this.classList.toggle("active");
});
const renderTodo = async () => {
  loading.style.display = "block";
  try {
    //  Gọi API để lấy dữ liệu danh sách công việc

    // todos chứa các công việc chưa hoàn thành
    const { data: todos } = await client.get("/todoList?completed=false");
    // todosNot chứa công việc đã hoàn thành
    const { data: todosNot } = await client.get("/todoList?completed=true");

    const html = todos
      .map(
        (todoList) => `
    <div class="todo-item" data-id="${todoList.id}">
      <span class="title-todo">${todoList.title}</span>
      <div class="list-action">
        <button class="btn-delete"><i class="fa-regular fa-trash-can"></i></button>
        <button class="btn-edit"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="btn-check"><i class="fa-solid fa-square-check"></i></button>  
      </div>
    </div>
  `
      )
      .join("");
    const htmlNot = todosNot
      .map(
        (todoList) => `
  <div class="todo-item" data-id="${todoList.id}">
    <span class="title-todo">${todoList.title}</span>
    <div class="list-action">
      <button class="btn-delete"><i class="fa-regular fa-trash-can"></i></button>
      <button class="btn-edit"><i class="fa-solid fa-pen-to-square"></i></button>
      <button class="btn-done"><i class="fa-solid fa-square-check"></i></button>  
    </div>
  </div>
`
      )
      .join("");
    listTodoNotComplete.innerHTML = html;
    listTodoComplete.innerHTML = htmlNot;

    btnCompleted.innerHTML = `Completed Todos ${todosNot.length} <i class="fa-regular fa-circle-right"></i>`;
    const deleteButtons = document.querySelectorAll(".btn-delete");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const todoId = button.closest(".todo-item").getAttribute("data-id");
        deleteTodo(todoId);
      });
    });

    const editButtons = document.querySelectorAll(".btn-edit");
    editButtons.forEach((button) => {
      button.addEventListener("click", function () {
        isEdit = true;
        const todoId = button.closest(".todo-item").getAttribute("data-id");
        addPopup();
        if (isEdit) {
          inputAddTodo.value = button
            .closest(".todo-item")
            .querySelector(".title-todo").innerText;
          btnSave.addEventListener("click", function () {
            updateTodo(todoId, inputAddTodo.value);
            removePopup();
          });
        }
      });
    });

    const completeBtns = document.querySelectorAll(".btn-check");
    completeBtns.forEach((completeBtn, i) => {
      completeBtn.addEventListener("click", async (e) => {
        const { data } = await client.get("/todoList?completed=false");
        updateTodo(data[i].id, data[i].title, true);
      });
    });
    const btnDones = document.querySelectorAll(".btn-done");
    btnDones.forEach((btn, i) => {
      btn.addEventListener("click", async (e) => {
        const { data } = await client.get("/todoList?completed=true");
        updateTodo(data[i].id, data[i].title, false);
      });
    });
  } catch (error) {
    console.error("Fetch error:", error);
  } finally {
    loading.style.display = "none";
  }
};
renderTodo();

const deleteTodo = async (id) => {
  const { response } = await client.delete(`/todoList/${id}`);
  renderTodo();
};

const addTodo = async () => {
  popup.addEventListener("submit", async function (e) {
    e.preventDefault();
    if (!isEdit) {
      let value = inputAddTodo.value;
      value = value;

      removePopup();
      inputAddTodo.value = "";
      const { response } = await client.post("/todoList", {
        title: value,
        completed: false,
      });
      renderTodo();
    }
  });
};
addTodo();

const updateTodo = async (id, value, isCompleted = false) => {
  value = value;

  const { response } = await client.put(`/todoList/${id}`, {
    title: value,
    completed: isCompleted,
  });
  renderTodo();
};

function handleSearch() {
  inputSearch.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    const todos = document.querySelectorAll(".todo-item");
    todos.forEach((todo) => {
      const title = todo.querySelector(".title-todo").textContent.toLowerCase();
      if (title.indexOf(value) === -1) {
        todo.classList.add("hide");
      } else {
        todo.classList.remove("hide");
      }
    });
  });
}
handleSearch();
