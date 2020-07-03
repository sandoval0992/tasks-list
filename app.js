const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();

function loadEventListeners() {
    document.addEventListener('DOMContentLoaded', createTasksList);
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearTasks);
    filter.addEventListener('keyup', filterTasks);
}

function createTasksList() {
    let tasks = getTasksFromLocalStorage();
    tasks.forEach(function (taskName) {
        createListItem(taskName);
    });
}

function addTask(e) {
    e.preventDefault();
    let taskName = taskInput.value.trim();
    if (taskName !== '') {
        if (taskExists(taskName)) {
            alert(`Task '${taskName}' already exists`);
        } else {
            createListItem(taskName);
            storeTaskInLocalStorage(taskName);
            taskInput.value = '';
        }
    }
}

function taskExists(taskName) {
    const tasks = getTasksFromLocalStorage();
    return (tasks.length > 0 && tasks.indexOf(taskName) >= 0) ? true : false;

}

function createListItem(taskName) {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskName));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    taskList.appendChild(li);
}

function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            const item = e.target.parentElement.parentElement
            item.remove();
            removeTaskFromLocalStorage(item);
        }
    }
}

function clearTasks() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    clearTasksFromLocalStorage();
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
            console.log('block');
        } else {
            task.style.display = 'none';
            console.log('none');
        }
    });
}

function storeTaskInLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();
    tasks.forEach(function (element, index) {
        if (task.textContent === element) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasksFromLocalStorage() {
    localStorage.clear();
}

function getTasksFromLocalStorage() {
    const tasksList = localStorage.getItem('tasks');
    return tasksList === null ? [] : JSON.parse(tasksList);
}

