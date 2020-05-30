//selecting the elements
const clear= document.querySelector(".clear");
const dateElement= document.getElementById("date");
const list= document.getElementById("list");
const input= document.getElementById("input");

//classes names
const CHECK= "fa-check-circle";
const UNCHECK= "fa-circle-thin";
const LINE_THROUGH= "lineThrough";

//variables

let LIST,id;

//GET ITEM FROM THE LOCALSTORAGE
let data=localStorage.getItem("TODO");
        //check if data is not empty
        if(data){
            LIST=JSON.parse(data);
            id=LIST.length;//set the id to the last on list
            loadList(LIST);
        }else{
            //if user use the system first time
            LIST=[];
            id=0;
        }

//load items to the user interface

function loadList(array){
    array.forEach(function(item){
        addToDo(item.name,item.id,item.done,item.trash);
    });
}

//SHOW TODAYS DATE

const dateFormate={weekday:"long",month:"long",day:"numeric"};
const today= new Date();
dateElement.innerHTML=today.toLocaleDateString("en-US",dateFormate);

//ADD TO DO FUNCTION

function addToDo(toDo,id,done,trash){

    if(trash){return};

    const DONE=done? CHECK:UNCHECK;
    const LINE=done? LINE_THROUGH:"";
    const item=`<li class="item">
                <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                <p class="text ${LINE}">${toDo}</p>
                <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                </li>
        
                `;

    const position="beforeend";
    list.insertAdjacentHTML(position,item);

}

//ADD AN ITEM TO THE LIST AFTER PRESS ENTER KEY

document.addEventListener("keyup",function(event){
    if(event.keyCode==13){
        const toDo=input.value;

        //if the input isn't empty!!
        if(toDo){
            addToDo(toDo,id,false,false);
            LIST.push({
                name : toDo,
                id: id,
                done : false,
                trash :false
            });
            //add item to the localstorage
            localStorage.setItem("TODO",JSON.stringify(LIST));
            id++;
            
        }
        input.value="";

    }
});

//COMPLETE TO DO

function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    
    LIST[element.id].done= LIST[element.id].done? false:true;
}

//remove to do

function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

//target the items dynamically
list.addEventListener("click",function(event){
    const element=event.target;//return the clicked event in the list
    const elementJob=element.attributes.job.value;//complete or delete;
    if(elementJob=="complete"){
        completeToDo(element);
    }else if(elementJob=="delete"){
        removeToDo(element);
    }
    //UPDATE item to the localstorage
    localStorage.setItem("TODO",JSON.stringify(LIST));
});

//clear the local storage by clicking clear button

clear.addEventListener("click",function(){
    localStorage.clear();
    location.reload();
});


