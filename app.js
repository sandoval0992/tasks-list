const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task
    taskList.addEventListener('click', removeTask);
    // Clear task event
    clearBtn.addEventListener('click', clearTasks);
    // FIlter tasks
    filter.addEventListener('keyup', filterTasks);
}

// Add task
function addTask(e) {
    e.preventDefault();

    if (taskInput.value === '') {
        return;
    }

    /*
    const li = document.createElement('li');
    console.log(li)
    li.innerText = taskInput.value;
    taskList.appendChild(li);
    */

    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    // Add class to link
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);
    // Clear taskInput
    taskInput.value = '';


}

function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();
        }
    }

}

// Clear tasks
function clearTasks() {
    //taskList.innerHTML = '';

    // Faster
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    // https://jsperf.com/innerhtml-vs-removechild
}

// Filter tasks

function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function (task) {
        console.log(task);
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

//console.log(taskInput);