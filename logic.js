const todoFunctions = {
  generateId: function() {
    return Date.now() + Math.floor(Math.random() * 1000);
  },

  addTodo: function(todos, newTodo) {
    return [...todos, newTodo];
  },

  deleteTodo: function(todos, idToRemove) {
    return todos.filter(todo => todo.id !== idToRemove);
  },

  markTodo: function(todos, idToMark) {
    return todos.map(todo => {
      if (todo.id === idToMark) {
        return { ...todo, done: !todo.done };
      }
      return todo;
    });
  }
};

if (typeof module !== 'undefined') {
  module.exports = todoFunctions;
}