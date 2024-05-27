// let dis=document.getElementById('mark');
// let inn=document.createElement('input');
// function disp(){
//     var x=prompt("enter name");
//     var y=prompt("enter day");
//     dis.textContent=x+y;
// }

let bg = document.getElementById("todotopsec");
let Addbtn = document.getElementById("todoAddBtn");
let ul = document.getElementById("todoul");

let hrsid = null;

let savebtn = document.createElement('button');

function getitems() {
    let items = localStorage.getItem("todolist");
    let parseitems = JSON.parse(items);
    if (parseitems === null) {
        return [];
    } else {
        return parseitems;
    }
}

let todolist = getitems();
let cnt = todolist.length;
if (todolist.length !== 0) {
    savebtn.textContent = "Save";
    savebtn.classList.add("savebtn");
    bg.appendChild(savebtn);
}

for (let todo of todolist) {
    createtask(todo);
}

savebtn.onclick = function() {
    localStorage.setItem("todolist", JSON.stringify(todolist));
};

function addtask() {
    let inputVal = document.getElementById("todoinp");
    if (inputVal.value === "") {
        alert("Enter a Task!");
        return;
    }
    cnt = cnt + 1;
    let todo = {
        text: inputVal.value,
        uniqueid: cnt,
        isChecked: false
    };
    todolist.push(todo);
    createtask(todo);
    inputVal.value = "";
    if (todolist.length !== 0) {
        savebtn.textContent = "Save";
        savebtn.classList.add("savebtn");
        bg.appendChild(savebtn);
    }

}

function deltask(delid) {
    let delitem = document.getElementById(delid);
    ul.removeChild(delitem);
    let delindex = todolist.findIndex(function(each) {
        if (delid === "list" + each.uniqueid) {
            return true;
        } else return false;
    });
    todolist.splice(delindex, 1);
    if (todolist.length === 0) {

        bg.removeChild(savebtn);
        localStorage.setItem("todolist", JSON.stringify(todolist));
    }

}

Addbtn.onclick = function() {
    addtask();
};

function striker(boxid, lid, mid) {
    let str = document.getElementById(lid);
    str.classList.toggle("strike");
    let strindex = todolist.findIndex(function(each) {
        if ("list" + each.uniqueid === mid) {
            return true;
        } else return false;
    });
    let stritem = todolist[strindex];
    console.log(stritem.isChecked);
    if (stritem.isChecked === true) {
        stritem.isChecked = false;

    } else {
        stritem.isChecked = true;

    }
    localStorage.setItem("todolist", JSON.stringify(todolist));
}

function createtask(todo) {
    let md = document.createElement('div');
    md.id = "list" + todo.uniqueid;
    md.classList.add("todotask");

    let li = document.createElement('li');
    li.classList.add("todoitems");
    li.id = "item" + todo.uniqueid;
    li.style.marginLeft = "0px";

    let d1 = document.createElement('div');
    d1.classList.add("todod1");

    let chk = document.createElement('input');
    chk.type = "checkbox";
    chk.id = "checkbox" + todo.uniqueid;
    chk.checked = todo.isChecked;
    chk.classList.add("inpbox");

    let chkl = document.createElement('label');
    chkl.classList.add("lbltext");
    chkl.setAttribute("for", chk.id);
    chkl.id = "lab" + todo.uniqueid;
    chkl.textContent = todo.text;

    chk.onclick = function() {
        striker(chk.id, chkl.id, md.id);
    };

    if (todo.isChecked === true) {
        chkl.classList.add('strike');
        chk.checked = todo.isChecked;
    }


    let d2 = document.createElement('div');
    d2.classList.add("todod2");
    let timetext = document.createElement("label");
    timetext.classList.add("timetext");
    let hours = document.createElement("a");
    let time = 0;
     hours.textContent=time;
    timetext.textContent = "Time Taken: " + hours.textContent + " hrs";
    hrsid = setInterval(function() {
        hours.textContent = time;
        timetext.textContent = "Time Taken: " + hours.textContent + " hrs";
        time += 1;
    }, 3600000);
    let tododel = document.createElement("button");
    tododel.id = "del" + todo.uniqueid;
    tododel.textContent = "Delete";
    tododel.classList.add("tododel");

    tododel.onclick = function() {
        deltask(md.id);
    };


    timetext.setAttribute("for", chk.id);
    
     d1.appendChild(chkl);
    d1.appendChild(timetext);
    d2.appendChild(tododel);

    li.appendChild(d1);
    li.appendChild(d2);
    md.appendChild(chk);
    md.appendChild(li);
    ul.appendChild(md);
}