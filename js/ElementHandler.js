//html 요소를 핸들링 하기위한 클래스
class ElementHandler {   
    //가장 가까운 부모 요소를 태그이름으로 찾는다. 
    getClosestParentsElByTagName(el,tagName){
        let tmpEl = el;
        while(!(tmpEl.tagName===tagName)){
            tmpEl = tmpEl.parentElement;
        }
        return tmpEl;
    } 
    //row 삭제
    deleteRow(table,todo){
        var targetTR = table.querySelector(`tr#${todo.Id}`);
        if(todo){todo.toggleCompletion();}
        if(targetTR){targetTR.remove();}        
    }
    //row 추가
    addRow(table,todo,index){
        let insertIndex = index ? index:table.rows.length;
        let row = table.insertRow(insertIndex);
        row.setAttribute('Id',todo.Id);
        //drag 이벤트 바인딩
        row.addEventListener('dragstart',(e)=>{
            row.style.backgroundColor='red'
            //"todo"의 id를 저장
            e.dataTransfer.setData("id", row.getAttribute('Id'));
        });
        row.addEventListener('dragover',(e)=>{ 
            e.preventDefault();
        });        
        row.addEventListener('dragend',()=>{ 
            row.style.backgroundColor='';
        });
        
        let dragCell = row.insertCell(0);
        let dragImg =   document.createElement('img');
        dragImg.src='./resources/img/drag.png'
        dragImg.style.height='25px';
        dragImg.style.width='25px';
        dragCell.appendChild(dragImg);

        let commentCell = row.insertCell(1);
        commentCell.innerHTML = todo._comment;

        let buttonCell = row.insertCell(2);   
        let button= document.createElement("BUTTON");
        button.style.height='25px';
        button.style.width='25px';
        //삭제 버튼에 대한 이벤트 바인딩
        button.onclick=()=>{
            var parentsTR = this.getClosestParentsElByTagName(button,'TR');
            var todoId = parentsTR.getAttribute('Id');
            tdManager.deleteTodo(todoId);
            parentsTR.remove();
        };
        buttonCell.appendChild(button);
    }
    addElement(todo,toggle=false){
        let targetElementId ='';
        let sourceElementId = '';
        let direction = todo._isCompleted;
        //새로 추가한것인지, 완료<->미완료에 의한 변동인가 판단
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
        this.addRow(targetTable,todo);
        //완료<->미완료에 의한 변동이라면 source element 삭제
        if(toggle){
            let sourceTable = 
             document.body.querySelector(`.${sourceElementId}`);
            this.deleteRow(sourceTable,todo);
        }
    }
}