// Getting elements from the html document to target.
const input = document.getElementById('todo-input');
const addBtn = document.getElementById('Add-todo');
const List = document.getElementById('todo-list');

// Saving todos in local storage
const saved = localStorage.getItem('todos');
const todos = saved ? JSON.parse(saved) : [];

// Function to save todos in local storage
function savedTodo() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Function to create a single todo node
function createTodoNode(todo, index) {
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;
        savedTodo();
        render();
    });

    const textSpan = document.createElement('span');
    textSpan.textContent = todo.text;
    textSpan.style.margin = '5px 5px';
    if (todo.completed) {
        textSpan.style.textDecoration = 'line-through';
    }

    // Edit todo on double-click
    textSpan.addEventListener("dblclick", () => {
        const newText = prompt("Edit todo", todo.text);
        if (newText !== null) {
            todo.text = newText.trim();
            savedTodo();
            render();
        }
    });

    // Delete todo
    const delBtn = document.createElement('button');
    delBtn.textContent = "Delete";
    delBtn.addEventListener('click', () => {
        todos.splice(index, 1);
        savedTodo();
        render();
    });

    li.append(checkbox, textSpan, delBtn);
    return li;
}

// Function to render todos in your html document.
function render() {
    List.innerHTML = "";
    todos.forEach((todo, index) => {
        const node = createTodoNode(todo, index);
        List.append(node);
    });
}

// Function to add a new todo
function addTodo() {
    const text = input.value.trim();
    if (!text) return;

    todos.push({ text, completed: false });
    input.value = "";
    savedTodo();
    render();
}

addBtn.addEventListener("click", addTodo);
render();
