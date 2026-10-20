const input = document.getElementById('input');
const list = document.getElementById('list');

let tasks = [];

try {
    let saved = localStorage.getItem('tasks');
    if (saved) tasks = JSON.parse(saved);
} catch (e) {}

showTasks();

function addTask() {
    let text = input.value.trim();
    if (text === '') return;

    tasks.push({ text: text, completed: false });
    input.value = '';
    saveAndShow();
}

function showTasks() {
    list.innerHTML = '';

    tasks.forEach((task, i) => {
        let li = document.createElement('li');

        li.innerHTML = `
            <span class="task-text ${task.completed ? 'done' : ''}" onclick="toggle(${i})">
                <input type="checkbox" ${task.completed ? 'checked' : ''}> ${task.text}
            </span>
            <button class="del-btn" onclick="del(${i})">Видалити</button>
        `;

        list.appendChild(li);
    });
}

function toggle(i) {
    tasks[i].completed = !tasks[i].completed;
    saveAndShow();
}

function del(i) {
    tasks.splice(i, 1);
    saveAndShow();
}

function saveAndShow() {
    try {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (e) {}
    showTasks();
}