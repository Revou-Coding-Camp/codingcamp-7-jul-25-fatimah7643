document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("todo-form");
  const todoInput = document.getElementById("todo-input");
  const dateInput = document.getElementById("date-input");
  const tableBody = document.getElementById("todo-tbody");
  const deleteAllBtn = document.getElementById("delete-all");

  let todos = [];

  function renderTodos() {
    tableBody.innerHTML = "";

    if (todos.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="4" class="text-center text-gray-400 py-4">No task found</td>
        </tr>`;
      return;
    }

    todos.forEach((todo, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="border border-blue-500/20 px-4 py-2 text-center">${todo.task}</td>
        <td class="border border-blue-500/20 px-4 py-2 text-center">${todo.dueDate || '-'}</td>
        <td class="border border-blue-500/20 px-4 py-2 text-center">
          <span class="px-2 py-1 rounded text-xs ${todo.completed ? 'bg-green-500 text-white' : 'bg-yellow-400 text-black'}">
            ${todo.completed ? 'Completed' : 'Pending'}
          </span>
        </td>
        <td class="border border-blue-500/20 px-4 py-2 text-center">
          <button class="text-white bg-green-600 hover:bg-green-700 px-2 py-1 rounded text-sm toggle-btn" data-index="${index}">
            ${todo.completed ? 'Undo' : 'Done'}
          </button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const task = todoInput.value.trim();
    const dueDate = dateInput.value;

    if (!task) return;

    todos.push({
      task,
      dueDate,
      completed: false
    });

    todoInput.value = "";
    dateInput.value = "";
    renderTodos();
  });

  tableBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("toggle-btn")) {
      const index = e.target.dataset.index;
      todos[index].completed = !todos[index].completed;
      renderTodos();
    }
  });

  deleteAllBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all tasks?")) {
      todos = [];
      renderTodos();
    }
  });

  renderTodos();
});
