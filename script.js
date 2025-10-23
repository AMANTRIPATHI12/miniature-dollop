const input = document.getElementById();
const addBtn = document.getElementById();
const List = document.getElementById();

const saved = localStorage.getItem('todos');
const todos = saved?JSON.parse(saved):[];

function savedTodo(){
    localStorage.setItem('todos', JSON.stringify(todos));
}

function createTodoNode(text , index){
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = checkbox;
    checkbox.checked = !!todos.completed;
    checkbox.addEventListener("change" , ()=> {
        todos.completed = checkbox.checked;
        savedTodo();
    })
    const textSpan = document.createElement('span');
    textSpan.textContent = todos.text;
    textSpan.style.margin = '5px 5px';
    if(todos.completed){
        textSpan.style.textDecoration = 'line-through';
    }
}

function render(){
    List.innerHTML = "";

    todos.forEach((todos , index) => {
        const node = createTodoNode(todos , index);
        List.append(node);
    });
}

render();