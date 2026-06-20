let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let taskInput = document.getElementById("taskInput");
let taskList = document.getElementById("taskList");

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {

    let taskText = taskInput.value.trim();

    if(taskText === ""){
        alert("Please enter a task");
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    saveTasks();
    displayTasks();

    taskInput.value = "";
}

document.getElementById("addBtn").addEventListener("click", addTask);

function displayTasks(filter = "all") {

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if(filter === "active"){
        filteredTasks = tasks.filter(task => task.completed === false);
    }

    if(filter === "completed"){
        filteredTasks = tasks.filter(task => task.completed === true);
    }

    filteredTasks.forEach((task,index) => {

        let li = document.createElement("li");

        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">
                ${task.text}
            </span>

            <div>
                <button onclick="completeTask(${index})">Done</button>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

function completeTask(index){

    tasks[index].completed = !tasks[index].completed;

    saveTasks();
    displayTasks();
}

function editTask(index){

    let newTask = prompt("Edit your task", tasks[index].text);

    if(newTask !== null && newTask.trim() !== ""){
        tasks[index].text = newTask;
    }

    saveTasks();
    displayTasks();
}

function deleteTask(index){

    tasks.splice(index,1);

    saveTasks();
    displayTasks();
}

function showTasks(type){
    displayTasks(type);
}

displayTasks();
