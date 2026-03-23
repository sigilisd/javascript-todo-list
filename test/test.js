if (typeof require !== 'undefined') {
  var todoFunctions = require('../logic.js');
}

QUnit.test("add Todo should add a new todo to the list", function(assert) {
  const todos = [];
  const newTodo = { id: 1, description: "Изучить TDD", done: false };
  
  const result = todoFunctions.addTodo(todos, newTodo);
  
  assert.equal(result.length, 1, "Список должен содержать 1 элемент");
  assert.deepEqual(result[0], newTodo, "Добавленный элемент должен совпадать с исходным");
});

QUnit.test("Объект todoFunctions должен существовать", function(assert) {
  assert.ok(typeof todoFunctions !== 'undefined', "Логика загружена");
});

QUnit.test("addTodo должен добавлять новую задачу", function(assert) {
  const todos = [];
  const newTodo = { id: 1, description: "test", done: false };
  const expected = [{ id: 1, description: "test", done: false }];
  
  const result = todoFunctions.addTodo(todos, newTodo);
  assert.deepEqual(result, expected, "Массив должен содержать новый объект");
});

QUnit.test("deleteTodo должен удалять задачу по ID", function(assert) {
  const todos = [
    { id: 1, description: 'первая', done: false },
    { id: 2, description: 'вторая', done: false }
  ];
  const expected = [{ id: 1, description: 'первая', done: false }];
  
  const result = todoFunctions.deleteTodo(todos, 2);
  assert.deepEqual(result, expected, "Вторая задача должна быть удалена");
});

QUnit.test("markTodo должен переключать статус done", function(assert) {
  const todos = [{ id: 1, description: 'тест', done: false }];
  const result = todoFunctions.markTodo(todos, 1);
  
  assert.equal(result[0].done, true, "Статус должен стать true");
  
  const result2 = todoFunctions.markTodo(result, 1);
  assert.equal(result2[0].done, false, "Статус должен вернуться в false");
});

QUnit.test("Функции не должны изменять оригинальный массив (Immutability)", function(assert) {
  const todos = [{ id: 1, description: 'не менять!', done: false }];
  const originalClone = [{ id: 1, description: 'не менять!', done: false }];
  
  todoFunctions.addTodo(todos, { id: 2, description: 'новая' });
  assert.deepEqual(todos, originalClone, "addTodo не должен мутировать оригинал");
  
  todoFunctions.deleteTodo(todos, 1);
  assert.deepEqual(todos, originalClone, "deleteTodo не должен мутировать оригинал");
  
  todoFunctions.markTodo(todos, 1);
  assert.deepEqual(todos, originalClone, "markTodo не должен мутировать оригинал");
});