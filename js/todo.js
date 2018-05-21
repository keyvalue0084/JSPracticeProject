//할일 객체
const Todo = (()=>{
    const idCount = {IDCOUNT:'IDCOUNT'}
    let countValue = 0;
    class Todo{    
        constructor( comment='', isCompleted=false){                    
            this.map = new WeakMap();
            //각 인스트마다 고유의 ID 할당
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