
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
        toggleCompletion(){
            if(this._isCompleted){
                this._isCompleted=false;
            }else{
                this._isCompleted=true;
            }
        }
    }
    return Todo;
})();

class TodoManager{
    constructor(){
        this._todoList = new Map()
    }

    getTotalTodoList(){
      
    }
    getTodo(id){
        return this._todoList.get(id);
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


function addElement(todo,toggle=false){
    let targetElementId ='';
    let sourceElementId = '';
    let direction = todo._isCompleted;
    if(toggle){
        if(direction) direction=false;
        else direction=true;
    }
    if(direction){
        targetElementId='Completed';
        sourceElementId='UnCompleted'
    }else{
        targetElementId='UnCompleted'
        sourceElementId='Completed'
    }
    let targetTable = document.body.querySelector(`.${targetElementId}`);
    addRow(targetTable,todo);
    if(toggle){
        let sourceTable =  document.body.querySelector(`.${sourceElementId}`);
        deleteRow(sourceTable,todo);
    }
   
}
function deleteRow(table,todo){
    var targetTR = $(table).find(`tr#${todo.Id}`);
    var todo = tdManager.getTodo(todo.Id);
    if(todo){todo.toggleCompletion();}
    if(targetTR){targetTR.remove();}
    
}
function addRow(table,todo,index){
    let insertIndex = index ? index:table.rows.length;
    let row = table.insertRow(insertIndex);
    row.setAttribute('Id',todo.Id);
    row.addEventListener('dragstart',handleDragStart);
    row.addEventListener('dragenter',handleDragEnter);
    row.addEventListener('dragover',handleDragOver);
    row.addEventListener('dragleave',handleDragLeave);
    //row.addEventListener('drop',handleDrop);
    row.addEventListener('dragend',handleDragEnd);
    addDragImgCell(row);
    addCommentCell(row,todo);
    addButtonCell(row);
}

function handleDragStart(e){
    this.style.backgroundColor='red'
    let tmpTodo = tdManager.getTodo($(this).attr('id'));
    e.dataTransfer.setData("id", tmpTodo.Id);
    console.log('DragStart-ID: ',tmpTodo.Id);
}
function handleDragEnter(){
    console.log('enter');
}
function handleDragOver(e){
    e.preventDefault();
}
function handleDragLeave(){
    
}
function handleDrop(e){
    let todoId = e.dataTransfer.getData("id");
    let tmpTodo = tdManager.getTodo(todoId);
    addElement(tmpTodo,true);
    console.log('Drop-ID: ',todoId);
}

function handleDragEnd(){
    this.style.backgroundColor=''
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