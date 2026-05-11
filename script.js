let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const moonIcon = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>';
const sunIcon = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>';

window.onload = function () {
    loadTheme();
    setMinimumDueDate();
    renderTasks();
};

function getTodayDateString() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function setMinimumDueDate() {
    const dateInput = document.getElementById("dateInput");
    dateInput.min = getTodayDateString();
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const dateInput = document.getElementById("dateInput");
    const error = document.getElementById("error");

    const name = taskInput.value.trim();
    const date = dateInput.value;

    if (!name || !date) {
        error.textContent = "Please fill in both task and due date";
        error.classList.remove("hidden");
        return;
    }

    if (date < getTodayDateString()) {
        error.textContent = "Due date cannot be in the past";
        error.classList.remove("hidden");
        return;
    }

    error.classList.add("hidden");

    const task = {
        id: Date.now(),
        name,
        date
    };

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";
    dateInput.value = "";

    renderTasks();
}

function renderTasks() {
    const container = document.getElementById("taskList");
    container.innerHTML = "";

    tasks.forEach(task => {
        container.innerHTML += `
        <div class="bg-white rounded-2xl shadow-md border border-gray-100 p-5
                    hover:shadow-xl hover:-translate-y-1 transition duration-300 dark:bg-gray-900 dark:border-gray-700">

            <h4 class="text-lg font-bold text-gray-800 dark:text-white">${task.name}</h4>

            <p class="text-sm text-gray-500 mt-2 dark:text-gray-300">
            Due: <span class="font-medium text-indigo-600 dark:text-indigo-300">${task.date}</span>
            </p>

            <button onclick="deleteTask(${task.id})"
            class="mt-4 w-full bg-red-50 text-red-600 py-2 rounded-xl
                    hover:bg-red-100 transition font-semibold dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50">
            Delete Task
            </button>
        </div>
        `;
    });
}

function deleteTask(id) {
    const confirmDelete = confirm("Are you sure you want to delete this task?");

    if (!confirmDelete) {
        return;
    }

    tasks = tasks.filter(t => t.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function setDarkTheme() {
    const themeBtn = document.getElementById("themeBtn");
    const themeIcon = document.getElementById("themeIcon");

    document.documentElement.className = "dark";
    themeIcon.innerHTML = moonIcon;
    themeBtn.dataset.theme = "dark";
    localStorage.setItem("theme", "dark");
}

function setLightTheme() {
    const themeBtn = document.getElementById("themeBtn");
    const themeIcon = document.getElementById("themeIcon");

    document.documentElement.className = "";
    themeIcon.innerHTML = sunIcon;
    themeBtn.dataset.theme = "light";
    localStorage.setItem("theme", "light");
}

function loadTheme() {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        setDarkTheme();
    } else {
        setLightTheme();
    }
}

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", function () {
    if (themeBtn.dataset.theme === "dark") {
        setLightTheme();
    } else {
        setDarkTheme();
    }
});
