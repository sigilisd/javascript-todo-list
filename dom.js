(function() {
  const container = document.getElementById('todo-container');
  const addTodoForm = document.getElementById('todo-form');
  const itemsLeft = document.getElementById('items-left');

  // состояние приложения
  let currentFilter = 'all'; 
  const saved = localStorage.getItem('myTodos');
  let state = saved ? JSON.parse(saved) : [
    { id: 0, description: 'Пример задачи', done: false }
  ];

  // вспомогательные функции
  const saveToLocal = function(todos) {
    localStorage.setItem('myTodos', JSON.stringify(todos));
  };

  const update = function(newState) {
    state = newState;
    saveToLocal(state);
    renderState(state);
  };

  // создание элемента задачи
const createTodoNode = function(todo) {
    const todoNode = document.createElement('li');
    // Добавляем класс ко всему <li>, если задача выполнена (для зачеркивания)
    if (todo.done) todoNode.classList.add('completed-item');
    
    // 1. Кнопка "Галочка" (Чекбокс)
    const checkButtonNode = document.createElement('button');
    checkButtonNode.className = 'check-btn';
    // Если задача выполнена, добавляем класс 'checked'
    if (todo.done) checkButtonNode.classList.add('checked');
    
    // При клике на галочку меняем статус задачи
    checkButtonNode.addEventListener('click', function() {
      const newState = todoFunctions.markTodo(state, todo.id);
      update(newState); // Обновляем состояние и перерисовываем DOM
    });

    // 2. Текст задачи
    const span = document.createElement('span');
    span.textContent = todo.description;
    span.className = 'todo-text';
    
    // 3. Кнопка удаления
    const deleteButtonNode = document.createElement('button');
    deleteButtonNode.textContent = '✕';
    deleteButtonNode.className = 'delete-btn';
    deleteButtonNode.addEventListener('click', function() {
      const newState = todoFunctions.deleteTodo(state, todo.id);
      update(newState);
    });

    // Собираем всё в один элемент <li>
    todoNode.appendChild(checkButtonNode);
    todoNode.appendChild(span);
    todoNode.appendChild(deleteButtonNode);
    
    return todoNode;
  };

  // отрисовка
  const renderState = function(state) {
    // обновляем счетчик активных задач
    if (itemsLeft) {
      const activeCount = todoFunctions.filterTodos(state, 'active').length;
      itemsLeft.textContent = `Осталось задач: ${activeCount}`;
    }

    // применяем текущий фильтр
    const filteredState = todoFunctions.filterTodos(state, currentFilter);

    const todoListNode = document.createElement('ul');
    filteredState.forEach(function(todo) {
      todoListNode.appendChild(createTodoNode(todo));
    });

    container.replaceChildren(todoListNode);
  };

  // слушатели событий
  if (addTodoForm) {
    addTodoForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const description = event.target.elements.description.value;

      const newTodo = {
        id: todoFunctions.generateId(), 
        description: description,
        done: false
      };

      const newState = todoFunctions.addTodo(state, newTodo);
      update(newState);
      event.target.reset();
    });
  }

  // слушатели для кнопок фильтров
  document.querySelectorAll('.filters button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      
      currentFilter = e.target.id.replace('filter-', '');
      renderState(state);
    });
  });

  // начальный запуск
  renderState(state);
})();