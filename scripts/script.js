const taskInput = document.getElementById('taskInput');
const taskDescriptionInput = document.getElementById('taskDescriptionInput');
const dueDateInput = document.getElementById('dueDateInput');
const statusFilter = document.getElementById('statusFilter');
const sortFilter = document.getElementById('sortFilter');
const taskList = document.getElementById('taskList');
const deleteCompletedButton = document.getElementById('deleteCompleted');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
updateUI();

document.getElementById('submitTask').addEventListener('click', handleAddTask);
taskInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        handleAddTask();
    }
});
deleteCompletedButton.addEventListener('click', deleteCompletedTasks);

taskList.addEventListener('change', function (event) {
    if (event.target.type === 'checkbox') {
        const index = event.target.dataset.index;
        markAsCompleted(index);
    }
});

statusFilter.addEventListener('change', updateUI);
sortFilter.addEventListener('change', updateUI);

function handleAddTask() {
    const taskText = taskInput.value.trim();
    const taskDescription = taskDescriptionInput.value.trim();
    const dueDate = dueDateInput.value;
    const status = statusFilter.value;
    addTask(taskText, taskDescription, dueDate, status);
    taskInput.value = '';
    taskDescriptionInput.value = '';
    dueDateInput.value = '';
}

function addTask(taskText, taskDescription, dueDate, status) {
    if (taskText !== '') {
        const newTask = { text: taskText, description: taskDescription, dueDate: dueDate, status: status, completed: false, createdAt: new Date().toISOString() };
        tasks.push(newTask);
        updateLocalStorage();
        updateUI();
    }
}

function markAsCompleted(index) {
    tasks[index].completed = !tasks[index].completed;
    tasks[index].status = tasks[index].completed ? 'done' : 'todo';
    updateLocalStorage();
    updateUI();
}

function deleteCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    updateLocalStorage();
    updateUI();
}

function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateUI() {

    const sortBy = sortFilter.value;
    let filteredTasks = filterTasksByStatus(tasks, statusFilter.value);
    filteredTasks = sortTasks(filteredTasks, sortBy);

    taskList.innerHTML = '';

    filteredTasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add(task.completed ? 'completed' : null);

        const remainingTimeText = calculateRemainingTime(task.dueDate);
        const remainingTime = document.createElement('span');
        remainingTime.textContent = `Time left: ${remainingTimeText}`;
        listItem.appendChild(remainingTime);

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.dataset.index = index;

        const taskText = document.createElement('span');
        const formattedDueDate = formatDate(task.dueDate);
        taskText.textContent = `${task.text} - ${task.description} (For the: ${formattedDueDate})`;

        // Définir le sélecteur de statut
        const statusSelector = document.createElement('select');
        ['todo', 'doing', 'done'].forEach(status => {
            const option = document.createElement('option');
            option.value = status;
            option.textContent = status.charAt(0).toUpperCase() + status.slice(1);
            option.selected = task.status === status;
            statusSelector.appendChild(option);
        });
        statusSelector.addEventListener('change', () => updateTaskStatus(index, statusSelector.value));


        const deleteButton = document.createElement('button');
        deleteButton.classList.add('taskDeleteBtn');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTask(index));


        const controlsDiv = document.createElement('div');
        controlsDiv.classList.add('task-controls');
        controlsDiv.appendChild(statusSelector);
        controlsDiv.appendChild(deleteButton);

        listItem.appendChild(checkbox);
        listItem.appendChild(taskText);
        listItem.appendChild(controlsDiv);
        taskList.appendChild(listItem);
    });
}



function filterTasksByStatus(tasks, status) {
    if (status === 'all') {
        return tasks;
    } else {
        return tasks.filter(task => task.status === status);
    }
}


function formatDate(dateString) {
    if (!dateString) return 'No Due Date';
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function deleteTask(index) {
    tasks.splice(index, 1);
    updateLocalStorage();
    updateUI();
}
function updateTaskStatus(index, newStatus) {
    tasks[index].status = newStatus;
    updateLocalStorage();
    updateUI();
}
function calculateRemainingTime(dueDate) {
    const now = new Date();
    const due = new Date(dueDate);
    const diffInMs = due - now;

    if (diffInMs <= 0) {
        return 'Past due';
    }

    const minutes = Math.floor(diffInMs / (1000 * 60));
    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (days > 0) {
        return `in ${days} day(s)`;
    } else if (hours > 0) {
        return `in ${hours} hour(s)`;
    } else {
        return `in ${minutes} minute(s)`;
    }
}

function sortTasks(tasks, sortBy) {
    if (sortBy === 'time') {
        return tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else if (sortBy === 'title') {
        return tasks.sort((a, b) => a.text.localeCompare(b.text));
    }
    return tasks;
}
taskInput.addEventListener("change", function () {
    const inputLength = taskInput.value.length;
    if (inputLength < 2 || inputLength > 256) {
        alert("The task name should be between 2 and 256 characters.");
    }
});

taskDescriptionInput.addEventListener("change", function () {
    const descriptionLength = taskDescriptionInput.value.length;
    if (descriptionLength < 5 || descriptionLength > 1024) {
        alert("The task description should be between 5 and 1024 characters.");
    }
});