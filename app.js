const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

form.addEventListener('submit', function(e) {
  e.preventDefault(); // предотвращаем перезагрузку страницы
  addTodo(input.value);
  input.value = ''; // очистка поля ввода
});

function addTodo(text) {
  const li = document.createElement('li');
  
  // текст задачи
  const span = document.createElement('span');
  span.textContent = text;
  span.addEventListener('click', () => {
    span.parentElement.classList.toggle('completed');
  });

  // кнопка удаления
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '✕';
  deleteBtn.className = 'delete-btn';
  deleteBtn.onclick = function() {
    li.remove();
  };

  li.appendChild(span);
  li.appendChild(deleteBtn);
  todoList.appendChild(li);
}