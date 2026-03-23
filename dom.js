(function () {
  const container = document.getElementById("todo-container");
  const addTodoForm = document.getElementById("todo-form");
  const itemsLeft = document.getElementById("items-left");
  const controls = document.querySelector(".controls");
  const separator = document.querySelector(".separator");

  // Состояние приложения
  let currentFilter = "all";
  const saved = localStorage.getItem("myTodos");

  // Если хочешь, чтобы при первом заходе было пусто и всё скрыто — ставь []
  let state = saved ? JSON.parse(saved) : [];

  // Вспомогательные функции
  const saveToLocal = function (todos) {
    localStorage.setItem("myTodos", JSON.stringify(todos));
  };

  const update = function (newState) {
    state = newState;
    saveToLocal(state);
    renderState(state);
  };

  // Функция скрытия/показа контроллов
  function updateControlsVisibility(state) {
    if (!controls) return;
    if (state.length === 0) {
      controls.classList.add("hidden");
      if (separator) separator.classList.add("hidden");
    } else {
      controls.classList.remove("hidden");
      if (separator) separator.classList.remove("hidden");
    }
  }

  // Создание элемента задачи
  const createTodoNode = function (todo) {
    const todoNode = document.createElement("li");
    if (todo.done) todoNode.classList.add("completed-item");

    const checkButtonNode = document.createElement("button");
    checkButtonNode.className = "check-btn";
    if (todo.done) checkButtonNode.classList.add("checked");

    checkButtonNode.addEventListener("click", function () {
      const newState = todoFunctions.markTodo(state, todo.id);
      update(newState);
    });

    const span = document.createElement("span");
    span.textContent = todo.description;
    span.className = "todo-text";

    const deleteButtonNode = document.createElement("button");
    deleteButtonNode.textContent = "✕";
    deleteButtonNode.className = "delete-btn";
    deleteButtonNode.addEventListener("click", function () {
      const newState = todoFunctions.deleteTodo(state, todo.id);
      update(newState);
    });

    todoNode.appendChild(checkButtonNode);
    todoNode.appendChild(span);
    todoNode.appendChild(deleteButtonNode);

    return todoNode;
  };

  // Отрисовка (ОДНА ФУНКЦИЯ)
  const renderState = function (state) {
    // 1. Управляем видимостью фильтров
    updateControlsVisibility(state);

    // 2. Обновляем счетчик активных задач
    if (itemsLeft) {
      const activeCount = todoFunctions.filterTodos(state, "active").length;
      itemsLeft.textContent = `Осталось задач: ${activeCount}`;
    }

    // 3. Применяем текущий фильтр
    const filteredState = todoFunctions.filterTodos(state, currentFilter);

    // 4. Очищаем старое и рисуем новое
    const todoListNode = document.createElement("ul");
    filteredState.forEach(function (todo) {
      todoListNode.appendChild(createTodoNode(todo));
    });

    container.replaceChildren(todoListNode);
  };

  // Слушатель формы (Enter)
  if (addTodoForm) {
    addTodoForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const description = event.target.elements.description.value.trim();
      if (!description) return; // Не добавляем пустые задачи

      const newTodo = {
        id: todoFunctions.generateId(),
        description: description,
        done: false,
      };

      const newState = todoFunctions.addTodo(state, newTodo);
      update(newState);
      event.target.reset();
    });
  }

  // Слушатели для фильтров
  document.querySelectorAll(".filters button").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      document
        .querySelectorAll(".filters button")
        .forEach((b) => b.classList.remove("active"));
      e.target.classList.add("active");

      currentFilter = e.target.id.replace("filter-", "");
      renderState(state);
    });
  });

  // Начальный запуск
  renderState(state);
})();
