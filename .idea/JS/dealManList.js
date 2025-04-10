    "use strict"
const url = "https://6709508caf1a3998baa11eb3.mockapi.io/api/v1/todos";
const TaskContainer = document.querySelector(".main__list");
const addTaskButton  = document.querySelector(".main__confirm-button");
const taskHeader= document.querySelector(".main__head-input");
const taskDescription = document.querySelector(".main__main-text-input");
const CurrentTime = getTime();
let tasksArray = [];
function getTime() {
        const now = new Date();
        const options = {
            weekday: 'short',
            month: 'short',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'long'
        };
        const dateTimeString = now.toLocaleString('ru', options);
        const timeZoneOffset = now.getTimezoneOffset();
        const gmtOffset = `GMT${timeZoneOffset > 0 ? '-' : '+'}${Math.abs(timeZoneOffset / 60).toString().padStart(2, '0')}00`;
        return `${dateTimeString} ${gmtOffset}`;
    };
function addArrayTasks(json) {
    for (let object of json) {
        let arrayObject = {
            id:     object.id,
            title: object.title,
            description: object.description,
            done: object.done,
            createdAt: object.createdAt,
        }
        tasksArray.push(arrayObject);
    }
};
async function addTask(object) {
    let promise = await fetch(url,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(object),
    });
};
async function getTasks() {
    let promise = await fetch(`https://6709508caf1a3998baa11eb3.mockapi.io/api/v1/todos`);
    let json = await promise.json();
    await addArrayTasks(json);
};
async function deleteTask(id) {
    let promise = await fetch(`https://6709508caf1a3998baa11eb3.mockapi.io/api/v1/todos/${id}`, {
        method: "DELETE"
    });
};
function createTask(object) {
    let task = document.createElement('li');
    task.classList.add(object.id);
    let taskHeader = task.appendChild(document.createElement("h4"));
    taskHeader.textContent = object.title;
    let taskDescription = task.appendChild(document.createElement("p"));
    taskDescription.textContent = object.description;
    let taskCloseButton = task.appendChild(document.createElement("div"));
    taskCloseButton.className = "close-button";
    taskCloseButton.textContent = "x";
    taskCloseButton.addEventListener("click", ()=>{
        let taskId = taskCloseButton.parentElement.classList.value;
        taskCloseButton.parentElement.remove();
        deleteTask(taskId)
            .then(() => {
            tasksArray = tasksArray.filter((task) => task.id != taskId);
        })
            .catch((error) => {
                console.log(error);
            })

    });
    TaskContainer.appendChild(task);
}
function renderTasks(json){
    for (let objects of json){
        createTask(objects);
        };
}
function removeRenderedTasks(){
    for (let li of document.querySelectorAll('li')){
        li.remove();
    }
}
getTasks().then(result => {
    renderTasks(tasksArray);
});
addTaskButton.addEventListener("click", function (event) {
    const taskHeaderValue = taskHeader.value;
    const taskDescriptionValue = taskDescription.value;
    if (taskHeaderValue) {
        let taskObject = {
            id: ""+ (+tasksArray.at(-1).id + 1),
            createdAt: CurrentTime,
            title: taskHeaderValue,
            description: taskDescriptionValue,
            done: false,
        };
        taskHeader.value = '';
        taskDescription.value = '';
        createTask(taskObject);
        addTask(taskObject)
            .then(result => {
                tasksArray.push(taskObject);
            })
            .catch((error) => {
                console.log(error);
            })
    };
});
document.querySelector(".sort-to-lower-button").addEventListener("click", function (event) {
    removeRenderedTasks();
    tasksArray.sort(function (a, b) {return a.title.length - b.title.length});
    renderTasks(tasksArray);
});
document.querySelector(".sort-to-higher-button").addEventListener("click", function (event) {
    removeRenderedTasks();
    tasksArray.sort(function (a, b) {return b.title.length - a.title.length});
    renderTasks(tasksArray);
});
