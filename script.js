let todoItems = [];

function addTodo(text){
    const todo = {
        text,
        checked: false,
        id: Date.now()
    };

    todoItems.push(todo);
    
    const list = document.querySelector('.js-todo-list');
    const listItem = document.createElement('li');
    listItem.setAttribute('data-key', `${todo.id}`);
    listItem.classList.add('todo-item');
    listItem.innerHTML = `

        <input id="${todo.id}" type="checkbox" />
        <label for="${todo.id}" class="tick js-tick"></label>
        <span>${todo.text}</span>
        <button class="delete-todo js-delete-todo">
            <svg>
                <use href="#delete-icon"></use>
            </svg>
        </button>

    `;
    //list.insertAdjacentElement('beforeeend',listItems); pr
    //console.log(listItems);
    list.appendChild(listItem);

   
}

const form = document.querySelector('.js-form');
form.addEventListener('submit', event => {
    event.preventDefault();
    const input = document.querySelector('.js-todo-input');

    const text = input.value.trim();
    if(text !== ''){
        addTodo(text);
        input.value = '';
        input.focus();
    }
});


 //add mark as done
 const list = document.querySelector('.js-todo-list');
 list.addEventListener('click', event => {
     //add done
     if(event.target.classList.contains('js-tick')){
         const itemKey = event.target.parentElement.dataset.key;
         toggleDone(itemKey);
     }
     //remove task
     if(event.target.classList.contains('js-delete-todo')){
         const itemKey = event.target.parentElement.dataset.key;
         deleteTodo(itemKey);
         const test = JSON.parse(localStorage.getItem('items'))
         const index = test.indexOf(itemKey)
         // Splice the array at the index of your object
            test.splice(index, 1)
            // Save back to localStorage
            localStorage.setItem("items", JSON.stringify(test))
        
        
     }
 })

 const saveListBtn = document.querySelector('.js-todo-save');
 saveListBtn.addEventListener('click', event => {
  event.preventDefault();
  if(todoItems.length>0){
    
    //create download link
    var textFile = null,
        makeTextFile = function(text){
            var data = new Blob([text], {type: 'text/plain'});

            if(textFile !==null){
                window.URL.revokeObjectURL(textFile);
            }

            textFile = window.URL.createObjectURL(data);
            return textFile;
        };
        
        /*var savedListItems = [];
        console.log(todoItems.length)
        for(var i=0; i <= todoItems.length; i++){
            
            savedListItems.push(todoItems[i].id);
            savedListItems.push(todoItems[i].checked);
            savedListItems.push(todoItems[i].text);
        }
        console.log(savedListItems)*/
        var link = document.getElementById('downloadlink');
        link.href= makeTextFile(JSON.stringify(todoItems)) //push data here
        link.style.display = 'block';  
        
        //save in localstorage
        var savedListItems = [];

        localStorage.setItem('items', JSON.stringify(todoItems))
        const data = JSON.parse(localStorage.getItem('items'));
        console.log(data);
        
  }else{
      //alert('No data');
  }
})




 function toggleDone(key){
     const index = todoItems.findIndex(item => item.id === Number(key));
     todoItems[index].checked = !todoItems[index].checked;

     const item = document.querySelector(`[data-key='${key}']`);
     if(todoItems[index].checked){
         item.classList.add('done');
     }else{
         item.classList.remove('done');
     }
 }

 function deleteTodo(key){
    todoItems = todoItems.filter(item => item.id !==Number(key));
    const item = document.querySelector(`[data-key='${key}']`);
    item.remove();

    const list = document.querySelector('.js-todo-list');
    //if(todoItems.length === 0) list.innerHTML ='';
 }

 function saveListToFile(listItems){
     //save current list
 }

 
 window.onload = function(){
     //get data from localstorage
    const data = JSON.parse(localStorage.getItem('items'))
  console.log(data);
  const list = document.querySelector('.js-todo-list');
  
  for(var i = 0; i<data.length; i++){
    const listItem = document.createElement('li');
    listItem.setAttribute('data-key', `${data[i].id}`);
  listItem.classList.add('todo-item');
  listItem.innerHTML = `

      <input id="${data[i].id}" type="checkbox" />
      <label for="${data[i].id}" class="tick js-tick"></label>
      <span>${data[i].text}</span>
      <button class="delete-todo js-delete-todo">
          <svg>
              <use href="#delete-icon"></use>
          </svg>
      </button>

  `;
  list.appendChild(listItem);
    }
  

 };