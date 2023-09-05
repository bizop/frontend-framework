// Initialize tasks from localStorage or use an empty array if nothing is stored
var tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
  var input = document.getElementById('new-task');
  var task = input.value.trim();

  if (task) {
    tasks.push({ id: Date.now(), text: task, editing: false });
    input.value = '';
    saveTasksToLocalStorage(); // Save to localStorage
    renderTasks();
  }
}

function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  saveTasksToLocalStorage(); // Save to localStorage
  renderTasks();
}

function editTask(taskId) {
  tasks.forEach((task) => {
    if (task.id === taskId) {
      task.editing = true;
    }
  });
  renderTasks();
}

function updateTask(taskId, newText) {
  tasks.forEach((task) => {
    if (task.id === taskId) {
      task.text = newText;
      task.editing = false;
    }
  });
  saveTasksToLocalStorage(); // Save to localStorage
  renderTasks();
}

function renderTasks() {
  var list = document.querySelector('.todo-list');
  list.innerHTML = '';

  tasks.forEach((task) => {
    var li = document.createElement('li');

    if (task.editing) {
      li.innerHTML = `
                <input type="text" value="${task.text}" onblur="updateTask(${task.id}, this.value)" autofocus>
            `;
    } else {
      li.innerHTML = `
                ${task.text}
                <button onclick="editTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            `;
    }

    list.appendChild(li);
  });
}

// Initially render tasks when the page loads
renderTasks();
