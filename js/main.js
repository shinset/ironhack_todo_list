
// variable that store in a array the list of item
let todoListItems = [];


//
const todoForm = document.getElementById("todo-form");

todoForm.addEventListener("submit", function (event) {
  /* this preventDefault  method is used  block the default behavior (prevent) of the submit event here which //is the refresh page as we dont want it to refresh on subimiting
  
  https://www.w3schools.com/jsref/event_preventdefault.asp
   */
  event.preventDefault();
  console.log("preventing");

  //Retrieve the input from form
  const todoInput = document.getElementById("todo-input");
  const errorMessageElement = document.getElementById("error-msg")

 // create condition for empty form value
 if(todoInput.value) {

  //check that we retrieve the value of the form 
  console.log("this is form input value: " + todoInput.value);

 //call a functionn that will pass the input value to an array  
 addTodoItem(todoInput.value);
//clear the form after subimiting
 todoInput.value = "";
 // clear any warning message if previous submit was empty
 errorMessageElement.style.display = "none"

 }else{
 errorMessageElement.innerHTML = "!! WARNING ! Empty Form !!"
 /* set css to display block for the html element to display the message as its hidden by default */
 errorMessageElement.style.display = "block"
 };

 })

// create a function that PUSH the form value into an array
    function addTodoItem(someinput){
      console.log("this should be the same value as tododinput: "+ someinput)
      
      //creating an object to store form value to pass to the array with timestamp
      const todoItem = {
        id: Date.now(),
        value:someinput
      }
      
      // now we push the object into the array created at the beginning called "todoItem"
      todoListItems.push(todoItem);
      console.log(todoListItems)

      // call a function to Display the list of stored value from the array
      displayTodoItem(todoItem);
    };
    
    function displayTodoItem(newTodoItem){
      // retrieve the Unorder List html element that will be used to add the new item
      const todoList = document.getElementById("todo-list");
        
        // currentItem will be used for delete button
        const currentItem = document.querySelector(`[data-key='${newTodoItem.id}']`);

  if (newTodoItem.deleted) {
    currentItem.remove();
    return;
  }


      // create a new LI List Item html element 
      const listItemElement = document.createElement("li");
        
        // we set an ID attribute for reference for delete button 
        listItemElement.setAttribute("data-key", newTodoItem.id);

      // Add the new item inside uisng template string style with backtick to avoir using concatenate string + var
      listItemElement.innerHTML=` <div class="todo_item"> 
                                  <span>${newTodoItem.value}</span>
                                  <button id="delete-toto">Delete </button>
                                  <div>
      `;
      // Add/Append the new item to the html 
      todoList.append(listItemElement);
      todoList.style.display = "block";


    };

  // All the following code is for for deleting button

const deleteTodoItem = (itemId) => {
  const todoItemIndexValue = todoListItems.findIndex(
    (todoItem) => todoItem.id === Number(itemId)
  );

  const todoItemWithDeleteField = {
    deleted: true,
    ...todoListItems[todoItemIndexValue],
  };

  todoListItems = todoListItems.filter(
    (todoItem) => todoItem.id !== Number(itemId)
  );

  displayTodoItem(todoItemWithDeleteField);
};
const todoList = document.getElementById("todo-list");

todoList.addEventListener("click", (event) => {
  const todoItemToDelete = event.target.parentElement.parentElement.dataset.key;

  deleteTodoItem(todoItemToDelete);
});