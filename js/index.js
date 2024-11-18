document.addEventListener("DOMContentLoaded", () => {
  console.log("I am working");
  const todosList = JSON.parse(localStorage.getItem("todosList")) || [];
  console.log(todosList);

  function renderTodos(todosList) {
    const tableBody = document.querySelector(".table-body");
    tableBody.innerHTML = ""; // Clear previous rows to avoid duplication

    todosList.forEach((todo, index) => {
      const row = document.createElement("tr"); // Create a new row for each todo item

      row.innerHTML = `
              <td>${todo.description}</td>
              <td>${todo.date}</td>
              <td><input type="checkbox" class="status-checkbox" ${
                todo.completed ? "checked" : ""
              }></td>
              <td>
                  <button class="delete-btn" data-index="${index}">Delete</button>
              </td>
          `;

      // Apply "unhighlighted" class if the todo is completed
      if (todo.completed) {
        row.classList.add("unhighlighted");
      }

      // Add event listener to checkbox to toggle completion
      const checkbox = row.querySelector(".status-checkbox");
      checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked; // Update the completion state
        localStorage.setItem("todosList", JSON.stringify(todosList)); // Save to local storage
        row.classList.toggle("unhighlighted", todo.completed); // Toggle class
      });

      //deleting a todo list
      const deleteButtons = row.querySelectorAll(".delete-btn");
      if (deleteButtons) {
        deleteButtons.forEach((deleteButton) => {
          deleteButton.addEventListener("click", (e) => {
            e.preventDefault();

            const id = e.target.getAttribute("data-index");
            console.log(id);

            todosList.splice(id, 1);
            localStorage.setItem("todosList", JSON.stringify(todosList));
            renderTodos(todosList);
          });
        });
      }

      // Append row to table body
      tableBody.appendChild(row);
    });
  }

  renderTodos(todosList);

  const todoDescription = document.getElementById("todo-description");
  const todoDueDate = document.getElementById("todo-due-date");
  const addTodoButton = document.getElementById("add-todo-btn");

  // Add new todo on button click
  addTodoButton.addEventListener("click", (e) => {
    e.preventDefault();

    let todosList = JSON.parse(localStorage.getItem("todosList")) || [];

    const todo = {
      description: todoDescription.value.trim(),
      date: todoDueDate.value.trim(),
      completed: false,
    };

    if (todo.description && todo.date) {
      // Check if inputs are non-empty
      todosList.push(todo);
      localStorage.setItem("todosList", JSON.stringify(todosList));
      renderTodos(todosList); // Render the updated list
    }

    // Clear the input fields
    todoDescription.value = "";
    todoDueDate.value = "";
  });
});
