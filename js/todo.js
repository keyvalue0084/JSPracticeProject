
const Todo = (()=>{
    const idCount = {IDCOUNT:'IDCOUNT'}
    let countValue = 0;
    class Todo{    
        constructor( comment='', isCompleted=false){        
            //this.map =new WeakMap([[idCount,countValue++]])
            this.map = new WeakMap();
            this.map.set(idCount,countValue++);
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
        }
    }

    deletTodo(Id){
        this._todoList.delete(Id);
    }

}
/*
function createTodo(comment){
    let _idCount =0;    
    return function(){        
        let _id = _idCount;
        let _isCompleted = false;
        let _comment = comment;
        return {
            getId :function(){
                return _id;
            },
            getComment:function(){
                return _comment;
            }
        }
    }
}*/
let tdManager = new TodoManager();
function createTodo(){
    let comment = document.body.querySelector("input[type='text'][name='comment']");
    let newTodo = new Todo(comment.value,false);
    tdManager.addTodo(newTodo);
}