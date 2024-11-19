// Function to load tasks from localStorage
function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach(task => {
    addTaskToTable(task.name, task.status);
  });
}

// Function to save tasks to localStorage
function saveTasks() {
  const rows = document.querySelectorAll('#taskTable tr');
  const tasks = [];

  rows.forEach(row => {
    const taskName = row.cells[0].textContent;
    const taskStatus = row.cells[1].textContent.trim();
    tasks.push({ name: taskName, status: taskStatus });
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to add a task to the table (also called during loading)
function addTaskToTable(taskName, taskStatus) {
  const table = document.getElementById('taskTable');
  const row = table.insertRow();
  const taskCell = row.insertCell(0);
  const statusCell = row.insertCell(1);
  const actionCell = row.insertCell(2);

  // Set cell values
  taskCell.textContent = taskName;
  statusCell.innerHTML = `<span class="status ${taskStatus.toLowerCase()}">${taskStatus}</span>`;
  actionCell.innerHTML = `
    <select onchange="updateStatus(this)">
      <option value="Pending" ${taskStatus === 'Pending' ? 'selected' : ''}>Pending</option>
      <option value="In Progress" ${taskStatus === 'In Progress' ? 'selected' : ''}>In Progress</option>
      <option value="Completed" ${taskStatus === 'Completed' ? 'selected' : ''}>Completed</option>
    </select>
  `;
}

// Function to add a new task
function addTask() {
  const taskName = document.getElementById('taskName').value;
  const taskStatus = document.getElementById('taskStatus').value;

  if (taskName.trim() === '') {
    alert('Please enter a task name.');
    return;
  }

  // Add the task to the table
  addTaskToTable(taskName, taskStatus);

  // Save updated tasks to localStorage
  saveTasks();

  // Clear input
  document.getElementById('taskName').value = '';
}

// Function to update the task status
function updateStatus(selectElement) {
  const status = selectElement.value;
  const row = selectElement.parentElement.parentElement;
  const statusCell = row.cells[1];
  statusCell.innerHTML = `<span class="status ${status.toLowerCase()}">${status}</span>`;

  // Save updated tasks to localStorage
  saveTasks();
}

// Load tasks when the page loads
window.onload = function() {
  loadTasks();
};
