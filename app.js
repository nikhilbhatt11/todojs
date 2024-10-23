const btn = document.querySelector(".btn");

let alltodo = JSON.parse(localStorage.getItem("todos")) || [];
const displaytodo = (arr1) => {
  const list = document.querySelector(".list");
  list.innerHTML = "";
  arr1.forEach((todo) => {
    const { task, date } = todo;
    const mytodo = document.createElement("div");
    const icon = document.createElement("i");
    icon.classList.add("icon", "fas", "fa-trash", "istyle");
    const datepara = document.createElement("p");
    datepara.classList.add("hiddendate");
    mytodo.innerHTML = `<p>${task}</p>`;
    datepara.innerHTML = `<p>${date}</p>`;
    let showdate = false;
    mytodo.addEventListener("click", () => {
      if (showdate == false) {
        showdate = true;
        datepara.classList.remove("hiddendate");
      } else {
        showdate = false;
        datepara.classList.add("hiddendate");
      }
    });
    mytodo.append(icon);
    list.append(mytodo, datepara);
    icon.addEventListener("click", (e) => {
      removetodo(e.target);
    });
  });
};

const removetodo = (ele) => {
  const parent = ele.parentNode;
  let todopara = parent.firstChild;
  let content = todopara.innerText;
  let indexToDelete = alltodo.findIndex((todo) => todo.task == content);
  if (indexToDelete !== -1) {
    alltodo.splice(indexToDelete, 1);
    localStorage.setItem("todos", JSON.stringify(alltodo));
  }
  displaytodo(alltodo);
};

const addTodo = (arr1) => {
  let task = document.querySelector(".todoinput");
  let taskvalue = task.value;

  if (taskvalue == "") {
    alert("create a valid task to do");
  } else {
    let date = new Date();
    let finaldate = date.toLocaleString();
    arr1.push({ task: taskvalue, date: finaldate });
    localStorage.setItem("todos", JSON.stringify(arr1));
    task.value = "";
    displaytodo(arr1);
  }
};

displaytodo(alltodo);

btn.addEventListener("click", (e) => {
  e.preventDefault();
  addTodo(alltodo);
});
