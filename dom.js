(function() {
  const container = document.getElementById('todo-container');
  const addTodoForm = document.getElementById('todo-form');

  // загрузка данных из LocalStorage при старте
  const saved = localStorage.getItem('myTodos');
  let state = saved ? JSON.parse(saved) : [
    { id: 0, description: 'Пример задачи', done: false }
  ];

  // функция сохранения
  const saveToLocal = function(todos) {
    localStorage.setItem('myTodos', JSON.stringify(todos));
  };

  const createTodoNode = function(todo) {
    const todoNode = document.createElement('li');
    
    const span = document.createElement('span');
    span.textContent = todo.description;
    if (todo.done) span.classList.add('completed');
    
    span.addEventListener('click', function() {
      const newState = todoFunctions.markTodo(state, todo.id);
      update(newState);
    });

    const deleteButtonNode = document.createElement('button');
    deleteButtonNode.textContent = '✕';
    deleteButtonNode.className = 'delete-btn';
    deleteButtonNode.addEventListener('click', function() {
      const newState = todoFunctions.deleteTodo(state, todo.id);
      update(newState);
    });

    todoNode.appendChild(span);
    todoNode.appendChild(deleteButtonNode);
    return todoNode;
  };

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

  const update = function(newState) {
    state = newState;
    saveToLocal(state);
    renderState(state);
  };

  const renderState = function(state) {
    const todoListNode = document.createElement('ul');
    state.forEach(function(todo) {
      todoListNode.appendChild(createTodoNode(todo));
    });
    container.replaceChildren(todoListNode);
  };

  renderState(state);
})();