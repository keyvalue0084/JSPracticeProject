
const Todo = (()=>{
    const idCount = {IDCOUNT:'IDCOUNT'}
    let countValue = 0;
    class Todo{    
        constructor( comment='', isCompleted=false){                    
            this.map = new WeakMap();
            this.map.set(idCount,'todo-'+countValue++);
            this._comment = comment;        
            this._isCompleted = isCompleted;
        }
        getComment(){
            return this._comment;
        }
        getIsCompleted(){
            return this._isCompleted;
        }
        get Id(){
            return this.map.get(idCount);
        }
    }
    return Todo;
})();

class TodoManager{
    constructor(){
        this._todoList =new Map()
    }

    getTotalTodoList(){
        return this._tosoList;
    }

    getUnCompletedTodoList(){
        let tmpArr=[]
        tdManager._todoList.forEach(function(value,key){
            if(!value._isCompleted){tmpArr.push(value);}
        });

        return tmpArr;
    }

    getCompletedTodoList(){
        let tmpArr=[]
        tdManager._todoList.forEach(function(value,key){
            if(value._isCompleted){tmpArr.push(value);}
        });

        return tmpArr;
    }

    addTodo(...todos){
        for(let todo of todos){
            this._todoList.set(todo.Id,todo);
            addElement(todo);
        }
    }

    deleteTodo(Id){
        this._todoList.delete(Id);
    }

}

let tdManager = new TodoManager();
function createTodo(){
    let comment = $("input[type='text'][name='comment']");
    let newTodo = new Todo(comment.val(),false);
    tdManager.addTodo(newTodo);
}

function addElement(todo){
    let elementId ='';
    if(todo._isCompleted){
        elementId='Completed'
    }else{
        elementId='UnCompleted'
    }
    let table = document.body.querySelector(`.${elementId}`);
    let row = table.insertRow(table.rows.length);
    row.setAttribute('Id',todo.Id);
    row.addEventListener('dragstart',handleDragStart,false);
    row.addEventListener('dragenter',handleDragEnter,false);
    row.addEventListener('dragover',handleDragOver,false);
    row.addEventListener('dragleave',handleDragLeave,false);
    row.addEventListener('drop',handleDrop,false);
    row.addEventListener('dragend',handleDragEnd,false);
    addDragImgCell(row);
    addCommentCell(row,todo);
    addButtonCell(row);
  
}
function handleDragStart(){
    this.style.backgroundColor='red'
    console.log('start');
}
function handleDragEnter(){
    console.log('enter');
}
function handleDragOver(e){
    console.log('over');
}
function handleDragLeave(){
    console.log('leave');
}
function handleDrop(){
    console.log('drop');
}
function handleDragEnd(){
    this.style.backgroundColor=''
    console.log('end');
}
function addDragImgCell(row){
    let dragCell = row.insertCell(0);
    let dragImg =   document.createElement('img');
    dragImg.src='./resources/img/drag.png'
    dragImg.style.height='25px';
    dragImg.style.width='25px';
    dragCell.appendChild(dragImg);
}

function addCommentCell(row,todo){
    let commentCell = row.insertCell(1);
    commentCell.innerHTML = todo._comment;
}

function addButtonCell(row){
    let buttonCell = row.insertCell(2);   
    let button= document.createElement("BUTTON");
    button.style.height='25px';
    button.style.width='25px';
    button.onclick=deleteElement;
    buttonCell.appendChild(button);
}

function deleteElement(){
    var parentsTR = $(this).parents('tr');
    var todoId = parentsTR.attr('Id');
    tdManager.deleteTodo(todoId);
    parentsTR.remove();
}