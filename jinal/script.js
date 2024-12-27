function saveTaskToLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

window.onload = displayTasks;

// -----------------display------------------
function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; 

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task', task.priority);
        taskElement.innerHTML = `
            <div>
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <p>Due: ${task.dueDate}</p>
                <p>Priority: ${task.priority}</p>
            </div>
            <div class="btn">
                <button id=editbtn onclick="editTask(${task.id})">Edit</button>
                <button id=deletbtn onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(taskElement);
    });
}
// ----------------------adding------------------------
document.getElementById('taskForm').addEventListener('submit', addTask);

function addTask(event) {
    event.preventDefault();

    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const dueDate = document.getElementById('taskDueDate').value;
    const priority = document.getElementById('taskPriority').value;

    if (!title || !dueDate) {
        alert('Title and due date are required');
        return;
    }

    const newTask = {
        id: Date.now(),
        title,
        description,
        dueDate,
        priority
    };

    saveTaskToLocalStorage(newTask);
    displayTasks();
    clearForm();
}

function clearForm() {
    document.getElementById('taskForm').reset();
}
// -----------------edit-------------------
function editTask(taskId) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks.find(t => t.id === taskId);

    if (task) {
        document.getElementById('taskTitle').value = task.title;
        document.getElementById('taskDescription').value = task.description;
        document.getElementById('taskDueDate').value = task.dueDate;
        document.getElementById('taskPriority').value = task.priority;
        
    
        deleteTask(taskId);
    }
}
// -----------------------delet-----------------------
function deleteTask(taskId) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(t => t.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    displayTasks();
}
// ------------------------priority-----------------------------------
document.getElementById('priorityFilter').addEventListener('change', displayTasks);

function displayTasks() {
    const filter = document.getElementById('priorityFilter').value;
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    const filteredTasks = filter === 'all' ? tasks : tasks.filter(task => task.priority === filter);
    
    filteredTasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task', task.priority);
        taskElement.innerHTML = `
            <div>
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <p>Due: ${task.dueDate}</p>
                <p>Priority: ${task.priority}</p>
            </div>
            <div>
                <button onclick="editTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(taskElement);
    });
}
