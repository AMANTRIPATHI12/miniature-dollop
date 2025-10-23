// Getting elements from the html document to target.
const input = document.getElementById();
const addBtn = document.getElementById();
const List = document.getElementById();

// Saving todos in local storage;
const saved = localStorage.getItem('todos');
const todos = saved?JSON.parse(saved):[];

// Fuction to save todos in local storage
function savedTodo(){
    localStorage.setItem('todos', JSON.stringify(todos));
}


function createTodoNode(text , index){
    const li = document.createElement('li');

    // added checkbox feature to check competed.
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

        // adding event listener to edit todos.
        document.addEventListener("dblclick" , ()=>{
            const newtext = prompt("Edit todo" , todos.text);
            if(newtext !== null){
                todos.text = newtext.trim();
                textSpan.textContent = todos.text;
                savedTodo();
            }
        })

        // delete a todo;
        const delBtn = document.createElement('button');
        delBtn.textContent = "Delete";
        delBtn.addEventListener('click',()=>{
            todos.splice(index , 1);
            render();
            savedTodo();
        })
        li.append(checkbox);
        li.append(textSpan);
        li.append(delBtn);
        return li;
}


// fuction to render todos in your html document.
function render(){
    List.innerHTML = "";

    todos.forEach((todos , index) => {
        const node = createTodoNode(todos , index);
        List.append(node);
    });
}

function addTodo(){
    const text = input.ariaValueMax.trim();
    if(!text){
        return;
    }

    todos.push({text,completed : false});
    input.value = "";
    render();
    savedTodo();
}

addBtn.addEventListener("click" , addTodo);
render();