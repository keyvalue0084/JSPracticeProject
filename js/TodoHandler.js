//"todo"를 관리하기위한 클래스
class TodoHandler{
    constructor(){
        this._todoList = new Map()
        this._elHandler = new ElementHandler();
    }

    getTotalTodoList(){
      
    }
    getTodo(id){
        return this._todoList.get(id);
    }

    addTodo(todo,toggle=false){
        this._todoList.set(todo.Id,todo);
        this._elHandler.addElement(todo,toggle);
    }

    deleteTodo(Id){
        this._todoList.delete(Id);
    }
  
}