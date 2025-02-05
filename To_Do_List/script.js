const text = document.getElementById('text');
const addBtn = document.getElementById('addBtn');
var edit_id;

function show_To_Do_List(){
    let data1 = localStorage.getItem('To Do List');
    document.querySelector('.container').innerHTML = '';
    if (data1 == null || JSON.parse(data1).length == 0) {
        document.querySelector('.container').innerHTML = `<div class="list">Nothing is here. Add some todo lists......</div>`;
    }else{
        let list = JSON.parse(data1);
        for (const element of list) {
            document.querySelector('.container').innerHTML += `<div class="list">
            <span>${element.text}</span>
            <ul>
            <li><img onclick="copy_text('${element.text}')" src="copy.svg" alt=""></li>
            <li class="edit" onclick="edit_text('${element.text}',${element.id})">Edit</li>
            <li class="remove" onclick="delete_text(${element.id})">Remove</li>
            </ul>
            </div>`
        }    
    }
}

const delete_text = (id) =>{
    let data3 = localStorage.getItem('To Do List');
    let arr = JSON.parse(data3);
    upd_arr = arr.filter((e)=>{
        return e.id != id;
    })
    localStorage.setItem('To Do List', JSON.stringify(upd_arr));
    show_To_Do_List();
}

const edit_text =(txt,id)=>{
    text.value = txt;
    addBtn.innerText = 'Edit';
    edit_id = id;
    text.focus();
}

const copy_text = (text)=>{
    navigator.clipboard.writeText(text).then(()=>{
        console.log("Copied")
    },()=>{
        console.log('Error')
    })
}

show_To_Do_List();

document.getElementById("addBtn").addEventListener('click', ()=>{
    if (text.value.length <= 0) {
        alert('Please Enter Something');
    }else if (addBtn.innerText == 'Add'){
        let data2 = localStorage.getItem('To Do List');
        let n_id = Math.ceil(10000 + 99999 * Math.random()); 
        if (data2 == null) {
            var json = [];
        } else {
            var json = JSON.parse(data2);
        }
        json.push({"text": text.value, "id": n_id});
        localStorage.setItem('To Do List', JSON.stringify(json));
        text.value = '';
        show_To_Do_List();
    }else{
        let data2 = localStorage.getItem('To Do List');
        let arr = JSON.parse(data2);
        for (const obj of arr) {
            if (obj.id == edit_id) {
                obj.text = text.value;
                break;
            }
        }
        
        localStorage.setItem('To Do List', JSON.stringify(arr));
        text.value = '';
        addBtn.innerText = 'Add';
        show_To_Do_List();
    }
})