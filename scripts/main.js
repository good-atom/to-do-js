const input = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// форматирование в HH:MM:SS
function formatTime(seconds) {
  const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
}



// Добавить задачу
function addTask() {
  const text = input.value.trim();
  if (text === "") return;

  const li = document.createElement('li');

  const span = document.createElement('span');
  span.textContent = text;
  span.className = "task-text";

  const actions = document.createElement('div');
  actions.className = 'actions';

  // таймер
  const timer = document.createElement('div');
  timer.className = 'timer';
  const createdAt = Date.now();
  let isDone = false;

  function updateTimer() {
    if (isDone) return; // стоп если задача завершена
    const diffSec = Math.floor((Date.now() - createdAt) / 1000);
    timer.textContent = formatTime(diffSec);
  }
  updateTimer();
  const timerInterval = setInterval(updateTimer, 1000);

  // кнопки
  const doneBtn = document.createElement('button');
  doneBtn.textContent = '✓';
  doneBtn.className = 'small doneBtn';
  doneBtn.onclick = () => {
    li.classList.toggle('done');
    if (li.classList.contains('done')) {
      isDone = true; // стоп таймера
    } else {
      isDone = false; // снова включить
    }
  };

  const editBtn = document.createElement('button');
  editBtn.textContent = '✏';
  editBtn.className = 'small editBtn';
  editBtn.onclick = () => {
    const newText = prompt("Измените задачу:", span.textContent);
    if (newText !== null && newText.trim() !== "") {
      span.textContent = newText.trim();
    }
  };

  const delBtn = document.createElement('button');
  delBtn.textContent = '✕';
  delBtn.className = 'small delBtn';
  delBtn.onclick = () => {
    clearInterval(timerInterval);
    li.remove();
  };

  // собрать
  actions.appendChild(timer);
  actions.appendChild(doneBtn);
  actions.appendChild(editBtn);
  actions.appendChild(delBtn);

  li.appendChild(span);
  li.appendChild(actions);
  taskList.appendChild(li);

  input.value = "";
}

addBtn.addEventListener('click', addTask);
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});
