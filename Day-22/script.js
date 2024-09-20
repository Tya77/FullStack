const app_form = document.querySelector(".app_form");
const app_input = document.querySelector(".app_input");
const btn_add = document.querySelector(".btn_add");
const edit = document.querySelector(".edit");
const delet = document.querySelector(".delete");
const task_form = document.querySelector(".task_form");
const task_wrapper = document.querySelector(".task_wrapper");
const task_input = document.querySelector(".task_input");
const task_list = document.querySelector(".task_list");

function addTask() {
  const task_wrapper = document.createElement("div");
  task_wrapper.classList.add("task_wrapper");

  const task_input = document.createElement("input");
  task_input.type = "text";
  task_input.value = app_input.value;
  task_input.setAttribute("readonly", "readonly");
  task_input.classList.add("task_input");
  task_input.style.width = "85%";

  const edit = document.createElement("i");
  edit.classList.add("fa-solid");
  edit.classList.add("fa-pen-to-square");

  const delet = document.createElement("i");
  delet.classList.add("fa-solid");
  delet.classList.add("fa-trash");

  const label = document.createElement("label");
  label.innerText = "Add Task";
  label.style.display = "none";
  label.style.cursor = "pointer";
  label.classList.add("btn_task");

  edit.addEventListener("click", function () {
    task_input.removeAttribute("readonly");
    task_input.focus();
    task_input.style.background = "none";
    task_input.style.border = "1px solid #8758ff";
    task_input.style.padding = "8px 16px";
    task_input.style.width = "79%";
    task_wrapper.style.background = "none";
    task_wrapper.style.padding = "0px";
    // task_wrapper.style.justifyContent = "initial";

    edit.style.display = "none";
    delet.style.display = "none";
    label.style.display = "block";
    label.style.background = "#8758ff";
    label.style.paddingTop = "7.7px";
    label.style.paddingLeft = "7px";
  });

  delet.addEventListener("click", function () {
    task_list.removeChild(task_wrapper);
  });

  label.addEventListener("click", function () {
    edit.style.display = "block";
    delet.style.display = "block";
    label.style.display = "none";
    task_input.style.width = "85%";
    task_input.style.border = "none";

    task_wrapper.style.background = "#8758ff";
    // task_wrapper.style.gap = "10px";
    task_wrapper.style.padding = "4px 16px";
  });

  task_wrapper.appendChild(task_input);
  task_wrapper.appendChild(edit);
  task_wrapper.appendChild(delet);
  task_wrapper.appendChild(label);
  task_list.appendChild(task_wrapper);

  app_input.value = "";
}

btn_add.addEventListener("click", addTask);
// Enter
app_input.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});
