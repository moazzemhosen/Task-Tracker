document.addEventListener('DOMContentLoaded', function() {
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskModal = document.getElementById('taskModal');
    const editModal = document.getElementById('editModal');
    const taskForm = document.getElementById('taskForm');
    const editForm = document.getElementById('editForm');
    const statusFilter = document.getElementById('statusFilter');
    const taskList = document.getElementById('taskList');
  
    // Open task modal when "ADD TASK" button is clicked
    addTaskBtn.addEventListener('click', function() {
      taskModal.style.display = 'block';
    });
  
    // Close modals when close button is clicked
    document.querySelectorAll('.close').forEach(function(closeBtn) {
      closeBtn.addEventListener('click', function() {
        taskModal.style.display = 'none';
        editModal.style.display = 'none';
      });
    });
  
    // Display tasks on page load
    displayTasks();
  
    // Add task form submission
    taskForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const taskName = document.getElementById('taskName').value;
      const status = document.querySelector('input[name="status"]:checked').value;
      const assignee = document.getElementById('assignee').value;
      addTask(taskName, status, assignee);
      taskModal.style.display = 'none';
      taskForm.reset();
    });
  
    // Edit task form submission
    editForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const id = document.getElementById('editTaskId').value;
      const taskName = document.getElementById('editTaskName').value;
      const status = document.querySelector('input[name="editStatus"]:checked').value;
      const assignee = document.getElementById('editAssignee').value;
      editTask(id, taskName, status, assignee);
      editModal.style.display = 'none';
    });
  
    // Filter tasks based on status
    statusFilter.addEventListener('change', function() {
      displayTasks();
    });
    
    // Function to add a task
    function addTask(taskName, status, assignee) {
      let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const newTask = { id: Date.now(), taskName, status, assignee };
      tasks.push(newTask);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      displayTasks();
    }
  
    // Function to display tasks
    function displayTasks() {
      const status = statusFilter.value;
      let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      if (status !== 'all') {
        tasks = tasks.filter(task => task.status === status);
      }
      taskList.innerHTML = '';
      tasks.forEach(task => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${task.taskName}</td>
          <td>${task.status}</td>
          <td>${task.assignee}</td>
          <td><button class="edit-btn" onclick="editTaskModal(${task.id})">Edit</button></td>
        `;
        row.classList.add(task.status);
        taskList.appendChild(row);
      });
    }
  
    // Function to edit task and open edit modal
    window.editTaskModal = function(id) {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const task = tasks.find(t => t.id === id);
      if (task) {
        document.getElementById('editTaskId').value = task.id;
        document.getElementById('editTaskName').value = task.taskName;
        document.querySelector(`input[name="editStatus"][value="${task.status}"]`).checked = true;
        document.getElementById('editAssignee').value = task.assignee;
        editModal.style.display = 'block';
      } else {
        alert('Task not found!');
      }
    };
  
    // Function to edit task
    function editTask(id, taskName, status, assignee) {
      let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const index = tasks.findIndex(task => task.id === parseInt(id));
      if (index !== -1) {
        tasks[index].taskName = taskName;
        tasks[index].status = status;
        tasks[index].assignee = assignee;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
      } else {
        alert('Task not found!');
      }
    }
  });
  