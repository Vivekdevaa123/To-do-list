const inputBox = document.getElementById('inputBox');
const AddBtn = document.getElementById('AddBtn');
const todolist = document.getElementById('todolist');

let edittodo = null;

document.addEventListener('DOMContentLoaded', getTodos);
AddBtn.addEventListener("click", addTodo);
todolist.addEventListener("click", update);

function addTodo() {
    const inputtext = inputBox.value.trim();
    if (inputtext.length <= 0) {
        alert("Error: Write Something!");
        return false;
    }

    if (AddBtn.value === "Edit") {
        const oldText = edittodo.innerText;
        edittodo.innerText = inputtext;

        let todos = JSON.parse(localStorage.getItem("todos"));
        const todoIndex = todos.indexOf(oldText);
        if (todoIndex !== -1) {
            todos[todoIndex] = inputtext;
        }
        localStorage.setItem("todos", JSON.stringify(todos));

        AddBtn.value = "Add";
        edittodo = null;

    } else {
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.innerText = inputtext;
        li.appendChild(p);

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Remove";
        deleteBtn.classList.add("btn", "deleteBtn");
        li.appendChild(deleteBtn);

        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.classList.add("btn", "editBtn");
        li.appendChild(editBtn);

        todolist.appendChild(li);
        savetodo(inputtext);
    }
    inputBox.value = "";
}

function update(e) {
    if (e.target.innerHTML === "Remove") {
        const todoItem = e.target.parentElement;
        const todoText = todoItem.querySelector("p").innerText;
        removeTodoFromStorage(todoText);
        todolist.removeChild(todoItem);

    } else if (e.target.innerHTML === "Edit") {
        edittodo = e.target.parentElement.firstElementChild;
        inputBox.value = edittodo.innerText;
        inputBox.focus();
        AddBtn.value = "Edit";
    }
}

function savetodo(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function removeTodoFromStorage(todoText) {
    let todos = JSON.parse(localStorage.getItem("todos"));
    const updatedTodos = todos.filter(item => item !== todoText);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(todo => {
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.innerText = todo;
        li.appendChild(p);

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Remove";
        deleteBtn.classList.add("btn", "deleteBtn");
        li.appendChild(deleteBtn);

        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.classList.add("btn", "editBtn");
        li.appendChild(editBtn);

        todolist.appendChild(li);
    });
}