// Get elements from HTML
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const emptyMessage = document.getElementById('emptyMessage');

// Load tasks from localStorage when page opens
let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];

// Function to save tasks to localStorage
function saveTasks() {
    localStorage.setItem('myTasks', JSON.stringify(tasks));
}

// Function to render (display) tasks on screen
function renderTasks() {
    taskList.innerHTML = '';

    if (tasks.length === 0) {
        emptyMessage.classList.remove('hidden');
        return;
    } else {
        emptyMessage.classList.add('hidden');
    }

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item';
        if (task.completed) {
            li.classList.add('completed');
        }

        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} data-index="${index}">
            <span>${task.text}</span>
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;

        taskList.appendChild(li);
    });
}

// Add a new task
function addTask() {
    const text = taskInput.value.trim();
    if (text === '') {
        alert('Please enter a task!');
        return;
    }

    tasks.push({ text: text, completed: false });
    taskInput.value = '';
    saveTasks();
    renderTasks();
}

// Event Listeners
addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Handle checkbox toggle and delete button clicks
taskList.addEventListener('click', function (e) {
    const index = e.target.dataset.index;

    if (e.target.type === 'checkbox') {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }

    if (e.target.classList.contains('delete-btn')) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }
});

// Initial render
renderTasks();