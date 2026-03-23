// сохранение
function saveToLocal(todos) {
  localStorage.setItem('myTodos', JSON.stringify(todos));
}

// загрузка при старте
const saved = localStorage.getItem('myTodos');
let state = saved ? JSON.parse(saved) : [];