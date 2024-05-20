let btn = document.querySelector(".addButton");
let inp_text = document.querySelector(".input");
let k = 0;

btn.addEventListener("click", ()=>{
    let val = inp_text.value;
    if(val.trim() === ""){
        return;
    }
    addElement(val,"yes",k);
    k+=1;
})


function addElement(task, clicked, id) {
    let container = document.querySelector(".container")
    let texty = document.createElement("input");
    let edit = document.createElement("button");
    let inner_div = document.createElement("div");
    let outer_div = document.createElement("div");
    let del = document.createElement("button");
    texty.value = task;
    // console.log(task);
    texty.classList.add("item_input");
    edit.innerText = "EDIT";
    edit.classList.add("editButton");
    // console.log(id);
    // edit.classList.add(id);
    del.innerText = "Done";
    del.classList.add("deleteButton");
    // del.classList.add(id);
    inner_div.appendChild(edit);
    inner_div.appendChild(del);
    outer_div.appendChild(texty);
    outer_div.appendChild(inner_div);
    container.prepend(outer_div);
    outer_div.style.display = "flex";
    outer_div.classList.add("item");
    texty.disabled = true;
    aliveBtn(edit,del,texty,outer_div,id);
    if(clicked === "yes"){
        add_to_local(task,id);
    }
}


function aliveBtn(edit,del,texty,outer_div,id){
    edit.addEventListener("click", ()=>{
        if(edit.innerText === "EDIT"){
            texty.disabled = false;
            texty.focus();
            edit.innerText = "SAVE";
        }else{
            if(texty.value.trim() === ""){
                texty.setAttribute("placeholder", "NO Any Task");
            }
            texty.disabled = true;
            edit.innerText = "EDIT";
            // console.log(id);
            setEle(id, texty.value.trim());
        }
    })
    del.addEventListener("click",()=>{
        texty.value.style
        // console.log(id);
        edit.remove();
        strike_me(texty, id);
    })
}


function add_to_local(task, id){
    if (localStorage.getItem("todo") === null){
        let store_me = [];
        let obj = {
            ID: id,
            val: task
        }
        store_me.push(obj);
        localStorage.setItem("todo",JSON.stringify(store_me));
    }else{
        let store_me = JSON.parse(localStorage.getItem("todo"));
        let obj = {
            ID: id,
            val: task
        }
        store_me.push(obj);
        localStorage.setItem("todo",JSON.stringify(store_me));
    }
}

function removeEle(id){
    let list = JSON.parse(localStorage.getItem("todo"));
    list.splice(id, 1);
    localStorage.removeItem("todo");
    localStorage.setItem("todo", JSON.stringify(list));
}

function setEle(id,task){
    let list = JSON.parse(localStorage.getItem("todo"));
    let obj = {
        ID: id,
        val: task
    }
    list[id] = obj;
    localStorage.removeItem("todo");
    localStorage.setItem("todo", JSON.stringify(list));
}

function strike_me(texty,id){
    let task = texty.value.trim();
    if(texty.style.textDecoration === 'line-through'){
        return
    }
    texty.style.textDecoration = 'line-through'; 
    let list = JSON.parse(localStorage.getItem("todo"));
    let obj = {
        ID: id,
        val: task,
        is_removed: true
    }
    // console.log(obj);
    list[id] = obj;
    localStorage.removeItem("todo");
    localStorage.setItem("todo", JSON.stringify(list));

}

Stored_todo();

function Stored_todo() {
    if (localStorage.getItem("todo") === null){
        return;
    }else{
        let store_me = JSON.parse(localStorage.getItem("todo"));
        let make_new = [];
        let newEleId = 0;
        for(let i = 0; i < store_me.length; i++){
            let task = store_me[i].val;
            let id = store_me[i].ID;
            if (store_me[i].hasOwnProperty('is_removed')){
                continue;
            }
            let obj = {
                ID: newEleId,
                val: task
            }
            addElement(task,"no",newEleId);
            newEleId += 1;
            make_new.push(obj);
        }
        k = newEleId;
        localStorage.setItem("todo",JSON.stringify(make_new));
    }
}