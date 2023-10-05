const input = document.querySelector('#todoInput')
const addButton = document.querySelector('#addButton')
const todoList = document.querySelector('#todoList')


// to add to-do

let todos =  [] 
if(localStorage.getItem('todos') == null){
  localStorage.setItem('todos',JSON.stringify(todos))
}
else{
  todos = JSON.parse(localStorage.getItem('todos'))
}

showTodo()
let counter = 0
function addTodo() {
  const todoText = todoInput.value 
  if(todoText !== '') {
    counter++
    const todo = {
      id: counter,
      text: todoText,
      isCompleted: false
    }
    todos.push(todo)
    localStorage.setItem('todos',JSON.stringify(todos))
    todoInput.value = ''
    showTodo()
  }
}

// a function to delete the todos

function deleteTodo(index) {
  todos.splice(index, 1)
  localStorage.setItem('todos',JSON.stringify(todos))
  showTodo()
}

// a function to edit

function editTodo(index){
  const newTodoText = prompt('Enter the new to-do:' , todos[index].text)
  if(newTodoText !== null) {
    todos[index].text = newTodoText
    localStorage.setItem('todos',JSON.stringify(todos))
   showTodo()
  }
}


// a function to show to-do

function showTodo(){
 todoList.innerHTML = ''
todos.forEach(function(todo, index){
  const li = document.createElement('li')

  li.innerText = todo.id  + ': ' + '  '  +   todo.text
 
  const deleteButton = document.createElement('Button')
const editButton =document.createElement('Button')

  deleteButton.textContent = 'Delete'
 deleteButton.addEventListener('click',function(){
  deleteTodo(index)
 })
 li.appendChild(deleteButton)

 editButton.textContent = 'Edit'
 editButton.addEventListener('click',function(){
  editTodo(index)
 })

 li.appendChild(editButton)
 todoList.appendChild(li)
})
}
addButton.addEventListener('click', addTodo)

//new comment