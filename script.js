const todoInput = document.querySelector("#todo-input");
const todosContainer = document.querySelector(".todos");
const completedCount = document.querySelector(".completedCount");
const remarks = document.querySelector(".remarks");

var elem = null;
let todos = [];

todoInput.addEventListener("keyup", function (e){
    if (e.key === "Enter" || e.keyCode === 13) {
        todos.push({value: e.target.value, checked: false});
        newTodo(e.target.value);
        todoInput.value = "";
        countCompleted();
    }
});

function updateTodos(value, bool) {
    todos.forEach((t)=>{
        if(t.value===value){
            t.checked=bool;
        }
    });    
}

function countCompleted() {
    completedCount.textContent= `${
        todos.filter((t) => t.checked === false).length
    } item left` ;
}

function changeTheme(){
    document.body.classList.toggle("light");
}

function clearCompleted() {
    document.querySelectorAll(".todo").forEach((todo)=>{
        if(todo.querySelector("input").checked){
            todo.remove();
        }
    });
}

function showAll(e) {
    document.querySelectorAll(".filters div").forEach((d, i)=> {
        if (i === 0) {
            d.classList.add("filterActive");
        }else{
            d.classList.remove("filterActive");
        }
    });
    document.querySelectorAll(".todo").forEach((todo)=> {
        todo.style.display = "grid";
    });
}
function filterCompleted() {
    document.querySelectorAll(".filters div").forEach((d, i)=> {
        if (i === 2) {
            d.classList.add("filterActive");
        }else{
            d.classList.remove("filterActive");
        }
    });
    document.querySelectorAll(".todo").forEach((todo)=>{
        todo.style.display = "grid";
        if (!todo.querySelector("input").checked){
            todo.style.display="none";
        }
    });
}
function filterActive(e) {
    document.querySelectorAll(".filters div").forEach((d, i)=> {
        if (i === 1) {
            d.classList.add("filterActive");
        }else{
            d.classList.remove("filterActive");
        }
    });
    document.querySelectorAll(".todo").forEach((todo) => {
        todo.style.display = "grid";
        if (todo.querySelector("input").checked){
            todo.style.display="none";
        }
    });
}










function newTodo(value) {
    const todo = document.createElement("div");
    const todoText = document.createElement("p");
    const todoCheckbox = document.createElement("input");
    const todoCheckboxLabel = document.createElement("label");
    const todoCross = document.createElement("span");

    todoText.textContent = value;
    todoCheckbox.type = "checkbox";
    todoCheckbox.name = "checkbox";
    todoCheckboxLabel.htmlFor = "checkbox";

    todoCheckboxLabel.addEventListener("click", function(e){
        if (todoCheckbox.checked) {
            todoCheckbox.checked = false;
            todoText.style.textDecoration = "none";
            todoCheckboxLabel.classList.remove("active");
            updateTodos(value, false);
            countCompleted();
        }else {
            updateTodos(value, true);
            countCompleted();
            todoCheckbox.checked=true;
            todoText.style.textDecoration = "Line-through";
            todoCheckboxLabel.classList.add("active");
        }
    });

    todoCross.addEventListener("click", function(e){
        e.target.parentElement.remove();
        todos = todos.filter((t) => t.value !==value);
        countCompleted();
    });

    todo.classList.add("todo");
    todoCheckboxLabel.classList.add("circle");
    todoCross.classList.add("cross");

    todo.appendChild(todoCheckbox);
    todo.appendChild(todoCheckboxLabel);
    todo.appendChild(todoText);
    todo.appendChild(todoCross);

    todo.draggable=true;
    todo.addEventListener("dragstart", (e) => {
        e.dataTransfer.effectAllowed="move";
        elem = e.target;
    });

    todo.addEventListener("dragover", (e) => {
        let el1;
        e.preventDefault();
        if(e.target.classList.contains("todo")){
            el1 = e.target;
        }else{
            el1 = e.target.parentElement;
        }

        if(isBefore(elem, el1)){
            el1.parentNode.insertBefore(elem, el1);
        }else{
            el1.parentNode.insertBefore(elem, el1.nextSibling);
        }
    });

    todo.addEventListener("dragend", ()=>{
        elem = null;

        let index = todos.findIndex((t)=> t.value === value);
        todos.splice(index, 1);

        if (todo.nextSibling){
            let index1 = todos.findIndex((t)=> t.value ===todo.nextSibling.querySelector("p").textContent);

            todos.splice(index1, 0, {
                value:value,
                checked:todo.querySelector("input").checked,
            });
        }else{
            todos.push({
                value:value,
                checked:todo.querySelector("input").checked,
            });
        }
    });

    todosContainer.appendChild(todo);
}

function isBefore(elem1, el2) {
    for(
        var cur = elem1.previousSibling;
        cur && cur.nodeType !==9;
        cur = cur.previousSibling
    )
    if (cur===el2) {
        return true;
    }return false;
}

