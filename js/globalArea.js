
let fuck =true;
let tdManager =new TodoHandler();





document.body.querySelector("input[type='text'][name='comment']").addEventListener('input',(event)=>{
    if(event.target.value.length>100){
        document.body.querySelector("textarea.alertMessage").textContent='할일은 간결하게 입력하는게 좋죠!^^';   
    }else{
        document.body.querySelector("textarea.alertMessage").textContent='';   
    }
});

function handleDrop(e){
    let todoId = e.dataTransfer.getData("id");
    let tmpTodo = tdManager.getTodo(todoId);
    tdManager._elHandler.addElement(tmpTodo,true);
}
function handleDragOver(e){
    e.preventDefault();
}
function createTodo(){    
    let comment = 
        document.body.querySelector("input[type='text'][name='comment']");
    if(!comment.value){            
        return;
    }
    document.body.querySelector("textarea.alertMessage").textContent='';
    
    let newTodo = new Todo(comment.value,false);
    tdManager.addTodo(newTodo);
}

