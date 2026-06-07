const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterButtons =
document.querySelectorAll(".filter-btn");

let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

function saveTasks(){
localStorage.setItem(
"tasks",
JSON.stringify(tasks)
);
}

function renderTasks(){

taskList.innerHTML = "";

let filteredTasks = tasks.filter(task => {

if(currentFilter === "active")
return !task.completed;

if(currentFilter === "completed")
return task.completed;

return true;

});

filteredTasks.forEach(task => {

const li = document.createElement("li");

li.dataset.id = task.id;

li.innerHTML = `
<span class="${
task.completed ? "completed" : ""
}">
${task.text}
</span>

<div class="actions">

<button class="complete-btn">
${task.completed ? "Undo" : "Done"}
</button>

<button class="delete-btn">
Delete
</button>

</div>
`;

taskList.appendChild(li);

});

}

function addTask(){

const text = taskInput.value.trim();

if(text === "") return;

tasks.push({
id: Date.now(),
text: text,
completed: false
});

saveTasks();
renderTasks();

taskInput.value = "";

}

addBtn.addEventListener(
"click",
addTask
);

taskInput.addEventListener(
"keypress",
function(e){

if(e.key === "Enter"){
addTask();
}

}
);

/* Event Delegation */

taskList.addEventListener(
"click",
function(e){

const li = e.target.closest("li");

if(!li) return;

const id = Number(li.dataset.id);

if(e.target.classList.contains(
"complete-btn"
)){

tasks = tasks.map(task =>

task.id === id
? {
...task,
completed:
!task.completed
}
: task

);

saveTasks();
renderTasks();

}

if(e.target.classList.contains(
"delete-btn"
)){

tasks = tasks.filter(
task => task.id !== id
);

saveTasks();
renderTasks();

}

}
);

filterButtons.forEach(btn => {

btn.addEventListener(
"click",
function(){

filterButtons.forEach(
b => b.classList.remove("active")
);

this.classList.add("active");

currentFilter =
this.dataset.filter;

renderTasks();

});

});

renderTasks();
