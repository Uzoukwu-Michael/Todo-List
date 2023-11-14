const input = document.querySelector('#todoInput')
const addButton = document.querySelector('#addButton')
const todoList = document.querySelector('#todoList')
const registerBtn = document.getElementById('registerBtn')
const loginBtn = document.getElementById('loginBtn')
const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const nameInput = document.getElementById('name')
const loginEmail = document.getElementById('loginEmail')
const loginPassword = document.getElementById('loginPassword')
const login = document.querySelector('#loginBtn')
const register = document.querySelector('#registerBtn')
const registerForm = document.getElementById('registerForm')
const loginForm = document.getElementById('loginForm')
const btns = document.querySelector('.btns')
const resetBtn = document.getElementById('resetBtn')
const searchBtn = document.getElementById('searchBtn')
const cancelBtn = document.querySelector('.cancelBtn')
const cancelBtn1 = document.querySelector('.cancelBtn1')
const addDiv  = document.querySelector('.add')
const loginAppearBtn = document.querySelector('.loginAppearBtn')
const registerAppearBtn  = document.querySelector('.registerAppearBtn')
const welcomeMsg = document.getElementById('welcome')
const profilePic = document.getElementById('profilePic')
const uploadFile = document.getElementById('uploadFile')
const notification = document.getElementById("notification");

let userDb = []
let todos =  [] 
let loggedInUserId = 0


if(localStorage.getItem('user') == null){
  localStorage.setItem('user',JSON.stringify(userDb))
}
else{
 userDb = JSON.parse(localStorage.getItem('user'))
}

// handle loggedInId db
if (sessionStorage.getItem("loggedInUserId") == 0) {
  sessionStorage.setItem("loggedInUserId", JSON.stringify(loggedInUserId));
} else {
  loggedInUserId = JSON.parse(sessionStorage.getItem("loggedInUserId"));
}

// render register button
if(sessionStorage.getItem('loggedInUserId') == 0){
  registerAppearBtn.style.display = 'block'
  loginAppearBtn.textContent= 'Login'
  input.style.display = 'none'
  btns.style.display = 'none'
  welcomeMsg.style.display = 'none'

}
else{
  registerAppearBtn.style.display = 'none'
  loginAppearBtn.textContent= 'Logout'
  input.style.display = 'block'
  btns.style.display = 'block'
  welcomeMsg.style.display = 'block'
  welcomeMsg.textContent = 'Welcome, ' + userDb[loggedInUserId-1].name

  showTodo()

}


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
    
    userDb[loggedInUserId-1].todos.push(todo)
    // userDb[userDb.length -1].id = userDb.length

    // console.log(userDb[loggedInUserId-1].todos)
    localStorage.setItem('user',JSON.stringify(userDb))


    todoInput.value = ''
    showTodo()
  }
}

// a function to delete to-do

function deleteTodo(index) {
  userDb[loggedInUserId-1].todos.splice(index, 1)
  localStorage.setItem('user',JSON.stringify(userDb))
  showTodo()
}

// a function to edit to-do

// function editTodo(index){
//   const newTodoText = prompt('Enter the new to-do:' , todos[index].text)
//   if(newTodoText !== null) {
//    userDb[loggedInUserId-1].todos[index].text = newTodoText
//     localStorage.setItem('user',JSON.stringify(userDb))
//    showTodo()
//   }
// }


function checkTodo(index){
  // const newTodoText = prompt('Enter the new to-do:' , todos[index].text)
  //  if(userDb[loggedInUserId-1].todos[index].isCompleted){
  //   userDb[loggedInUserId-1].todos[index].isCompleted = false
  //   checkButton.textContent = 'Undone'
  //  }
  //  else{
  //   userDb[loggedInUserId-1].todos[index].isCompleted = true
  //  }
  //   localStorage.setItem('user',JSON.stringify(userDb))
  //  showTodo()
}
// a function to show to-do

function showTodo(){

 todoList.innerHTML = ''
//  console.log(userDb)
//  console.log(loggedInUserId)

//  console.log(userDb[loggedInUserId-1].todos)
//  console.log(userDb[loggedInUserId-1])

userDb[loggedInUserId-1].todos.forEach(function(todo, index){
  const span = document.createElement('span')
  const li = document.createElement('li')

  li.innerText = todo.id  + ': ' + '  '  +   todo.text
 
  const deleteButton = document.createElement('button')
const editButton =document.createElement('button')
// const checkButton = document.createElement('button')
  deleteButton.textContent = 'Delete'
 deleteButton.addEventListener('click',function(){
  deleteTodo(index)
 })

//  if(checkButton.textContent = 'Done'){

//  }

//  checkButton.addEventListener('click',function(){
//   if(userDb[loggedInUserId-1].todos[index].isCompleted === true){
//     // checkButton.parentElement.parentElement.style.backgroundColor = 'red'

//     userDb[loggedInUserId-1].todos[index].isCompleted = false
//     // console.log(checkButton.textContent)
//     console.log(userDb[loggedInUserId-1].todos[index])
//   //  console.log(checkButton.parentElement.parentElement)
//     // checkButton.textContent = 'Done'
//    }
//    else{
//     userDb[loggedInUserId-1].todos[index].isCompleted = true
//     console.log(checkButton.textContent)
//     console.log(userDb[loggedInUserId-1].todos[index])

//     // checkButton.textContent = 'UnDone'
//    }
//     localStorage.setItem('user',JSON.stringify(userDb))
//    showTodo()

//  })


 editButton.textContent = 'Edit'
 editButton.addEventListener('click',function(){
  console.log(todo)
  const newTodoText = prompt('Enter the new to-do:' , todo.text)
  if(newTodoText !== null) {
   userDb[loggedInUserId-1].todos[index].text = newTodoText
    localStorage.setItem('user',JSON.stringify(userDb))
   showTodo()
  }

 })

//  span.appendChild(checkButton)
 span.appendChild(editButton)
 span.appendChild(deleteButton)
 li.appendChild(span)
//  if(todo.isCompleted){
//   li.classList.add('liDone')
//  }
//  else{
//   li.classList.add('liUnDone')
 
//  }
 todoList.appendChild(li)
})
}
addButton.addEventListener('click', addTodo)




// registerBtn.addEventListener("click", function (e) {
//   e.preventDefault();
//   console.log("Button clicked");
//   const name = nameInput.value
//   const email = emailInput.value
//   const password = passwordInput.value
//   let registered = false

//   let emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
//   let passRegex =
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
//   let passResult = passRegex.test(password);
//   let result = emailRegex.test(email);
//   if (!result) {
//     showMessage("Email is not valid", "red");
//     return false;
//   } else if (!passResult) {
//     showMessage("weak password", "red");
//     return false;
//   } else {

//     const user = {
//       id: 0,
//       name: name,
//       email: email,
//       password: password,
//       todos: todos
//     }
//     };

//     // check if user already exist in userDb
//     userDb.forEach(user => {
//       if(user.email == email){
//    showMessage("User already registered",'red') 
//    registered = true
//       }

//   if(registered == false){
//       userDb.push(user)
//       userDb[userDb.length -1].id = userDb.length
//        console.log(userDb)
//        localStorage.setItem('user',JSON.stringify(userDb))
//        alert("User created")
//   }
//      showMessage("User created",'red');
//       localStorage.setItem("user", JSON.stringify(userDb));

//     });

  // notification message
function showMessage(mes, kolor) {
  notification.textContent = mes;
  notification.style.backgroundColor = kolor;
  notification.style.display = "block";

  setTimeout(function () {
    notification.style.display = "none";
  }, 3000);
}



registerBtn.addEventListener('click',function(e) {
  e.preventDefault()
  const name = nameInput.value
  const email = emailInput.value
  const password = passwordInput.value
  let registered = false

let emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
let passRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
let passResult = passRegex.test(password);
let result = emailRegex.test(email);
if (!result) {
  showMessage("Email is not valid", "red");
  return false;
} else if (!passResult) {
  showMessage("weak password", "red");
  return false;
} else {


    const user = {
      id: 0,
      name: name,
      email: email,
      password: password,
      todos: todos,
      image: ''
    }
    userDb.forEach(user => {
      if(user.email == email){
   showMessage("User already registered",'red') 
   registered = true
      }
    })  
  if(registered == false){
      userDb.push(user)
      userDb[userDb.length -1].id = userDb.length
       localStorage.setItem('user',JSON.stringify(userDb))
       alert("User created")
  }

}
})


loginBtn.addEventListener('click',function(e){
  e.preventDefault()
  const email = loginEmail.value
  const password = loginPassword.value
  let loggedIn = false
 let  loggedInUser = userDb.find(user => user.email == email && user.password == password)
  if(loggedInUser){
    alert('login successful')
    loggedInUserId = loggedInUser.id
          addDiv.style.display = 'block'
    loginAppearBtn.style.display = 'block'
    loginAppearBtn.textContent = 'Log Out'
    registerAppearBtn.style.display = 'none'
    loginForm.style.display = 'none'
    input.style.display = 'block'
    btns.style.display = 'block'
    showTodo()
  // create and persist a user login session in locale storage
  sessionStorage.setItem('loggedInUserId',JSON.stringify(loggedInUserId))
  window.location.reload()
  }

    else{
    alert("Login failed")
  }

  // userDb.forEach(user => {
  //   if(user.email == email && user.password == password){
  //     alert("Login successful")
  //     loggedIn = true
  //     loggedInUserId = user.id
  //   }
  // })

  // if(loggedIn == true){
  //     addDiv.style.display = 'block'
  //   loginAppearBtn.style.display = 'block'
  //   loginAppearBtn.textContent = 'Log Out'
  //   registerAppearBtn.style.display = 'none'
  //   loginForm.style.display = 'none'
  //   input.style.display = 'block'
  //   btns.style.display = 'block'
  //   showTodo()
  // // create and persist a user login session in locale storage
  // sessionStorage.setItem('loggedInUserId',JSON.stringify(loggedInUserId))
  // window.location.reload()
  // }

  // else{
  //   alert("Login failed")
  // }

  })

function showLoginForm(){
  if(loginAppearBtn.textContent == 'Login'){
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
    // register.style.display = 'none'
    // input.style.display = 'block'
    // btns.style.display = 'block'  
  }

  else{
    loginForm.style.display = 'none'
    registerAppearBtn.style.display = 'block'
    input.style.display = 'none'
    btns.style.display = 'none'
    loginAppearBtn.textContent = 'Login'
    loggedInUserId = 0
    sessionStorage.setItem('loggedInUserId',JSON.stringify(loggedInUserId))
todoList.innerHTML = ''
window.location.reload()
  
  }
}

function showRegisterForm(){
  registerForm.style.display = 'block'
  // login.style.display = 'none'
  // input.style.display = 'none'
  // btns.style.display = 'none'
}

cancelBtn.addEventListener('click',function(){
  loginForm.style.display = 'none'
  // input.style.display = 'block'
  // btns.style.display = 'block'

})

cancelBtn1.addEventListener('click',function(){
  registerForm.style.display = 'none'
  // input.style.display = 'block'
  // btns.style.display = 'block'

})

resetBtn.addEventListener('click',function(){
  window.location.reload()

})

// a function to search to-do

function searchTodos(){ 
  const searchInput = input.value
  
  
  const filtered =  userDb[loggedInUserId-1].todos.filter(item => item.text.search(searchInput) != -1)
  todoList.innerHTML = ''

  filtered.forEach(function(todo, index){
    const span = document.createElement('span')
    const li = document.createElement('li')
  console.log(filtered)
    li.innerText = index+1 + ': ' + '  '  +   todo.text
   
    const deleteButton = document.createElement('Button')
  const editButton =document.createElement('Button')
    deleteButton.textContent = 'Delete'
   deleteButton.addEventListener('click',function(){
    deleteTodo(index)
   })
  
   editButton.textContent = 'Edit'
   editButton.addEventListener('click',function(){
    editTodo(index)
   })
   span.append(editButton)
   span.append(deleteButton)
   li.append(span)
   todoList.append(li)
  })
}   


// function loadImage(event){
//   const image = URL.createObjectURL(event.target.files[0])
//   console.log(image)
//   userDb[loggedInUserId-1].image = image

//   profilePic.src = image 
//   localStorage.setItem('userImage',(image))
// }
// if(localStorage.getItem('userImage' ) !== null){
//   profilePic.src = localStorage.getItem('userImage')
// }
  
// uploadFile.addEventListener('change',function(){
//   const file = uploadFile.files[0]
//   const reader = new FileReader()
//   reader.readAsText(file)
//   reader.onload = function(e){
//     const data = JSON.parse(e.target.result)
//     userDb[loggedInUserId-1].image = data
//     profilePic.src = data
//     localStorage.setItem('user',JSON.stringify(userDb))
//   }
// })

