// Select elemnts from DOM
const form = document.querySelector('#task-form');
const taskList = document.querySelector('ul.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


loadEventListeners();

// add event listeners to elements
function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', getTasks);
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeTask);
  clearBtn.addEventListener('click', clearTasks);
  filter.addEventListener('input', filterTasks);
}


// add task functionality
function addTask(e) {
  const task = taskInput.value;
  if (task === '') {
    alert('Add a task');
  } else {
    // create li item and append it to taskList
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.setAttribute('href', '#');
    link.innerHTML = '<i class="fa fa-remove"></i>'
    li.appendChild(link)
    taskList.appendChild(li);
    taskInput.value = '';

    // persist to local storage
    storeTaskInLocalStorage(task);
  }

  e.preventDefault();
}


// Store each item in local storage
function storeTaskInLocalStorage(task) {
  // store task in local storage
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  if (tasks === null) {
    tasks = [];
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Put all task items from local storage to DOM
function getTasks(e) {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  if (tasks !== null) {
    // loop through tasks and add lis
    tasks.forEach(function (task) {
      const li = document.createElement('li');
      li.className = 'collection-item';
      li.appendChild(document.createTextNode(task));
      const link = document.createElement('a');
      link.className = 'delete-item secondary-content';
      link.setAttribute('href', '#');
      link.innerHTML = '<i class="fa fa-remove"></i>'
      li.appendChild(link)
      taskList.appendChild(li);
    })
  }
}


// Remove a task from DOM by clicking ❌
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      const task = e.target.parentElement.parentElement;
      task.remove();

      removeTaskFromLocalStorage(task.textContent);
    }
  }
  e.preventDefault();
}


// Remove a task from the local storage
function removeTaskFromLocalStorage(task) {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks.splice(tasks.indexOf(task), 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Remove all tasks from DOM
function clearTasks(e) {

  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  e.preventDefault();

  clearTasksFromLocalStorage();
}

// Remove all tasks from local storage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}


// Filter tasks using filter input
function filterTasks(e) {
  let value = e.target.value.toLowerCase();
  // loop through the list
  console.log('filter')
  const taskItems = Array.from(taskList.children);


  taskItems.forEach(function (item) {
    if (!item.textContent.includes(value)) {
      item.style.display = 'none';
    } else {
      item.style.display = 'block';
    }
  })

}