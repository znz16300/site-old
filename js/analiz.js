var d1 = "";
let data_table = {};
let teach =  new Set();
let clas =  new Set();
let subj =  new Set();
let who =  new Set();

let sheet2 = "default";
let title_st = '';
let key = '1VQq2KHHgf_rLtNMzyh9LETjbdSSmkpZRjAvbr9kdkjY';

const btn_print = document.getElementById("btn__print_id");
const btn__copy_id = document.getElementById("btn__copy_id");

const btn_teach = document.getElementById("id_table_teach");
const btn_clas = document.getElementById("id_table_clas");
const btn_subj = document.getElementById("id_table_subj");
const btn_who = document.getElementById("id_table_who");

var menu = document.getElementById("context-menu-id");
var menuClas = document.getElementById("context-menu-clas-id");
var menuSubj = document.getElementById("context-menu-subj-id");
var menuWho = document.getElementById("context-menu-who-id");

const btn_close_menu = document.getElementById('btn_close_menu');
const btn_close_menu_clas = document.getElementById('btn_close_menu_clas');
const btn_close_menu_subj = document.getElementById('btn_close_menu_subj');
const btn_close_menu_who = document.getElementById('btn_close_menu_who');

var menuState = 0;
var active = "context-menu--active";




const text = document.getElementById("content");

function sortById(arr) {
    arr.sort((a, b) => a.id > b.id ? 1 : -1);
}

function print_my(data){
    data.push({'id':111111111, 'title':" ", 'value':" "});
    text.innerHTML +=`<br><hr><br><div class="title1">АНАЛІЗ УРОКУ</div>`;
    for(let i=0; i<data.length; i++){
        if (data[i]['value'] !== "" && data[i]['id'] >= 0){
            // text.innerHTML += `<span class="title">${data[i]['title']}</span> 
            //                    <span class="value">${data[i]['value']}</span><br>`;
            let tag1 = 'span';
            let tag2 = 'span';
            let sep = ' '
            // console.log(data[i+1]);
            if (data[i+1] !== undefined){
                 let sym1 =(data[i+1]['title'] +" ")[0];
                 let sym2 =(data[i]['title'] +" ")[0];
                 if (sym2.toUpperCase() === sym2){
                     tag2 = 'span';
                    sep = "<br>";
                 }
            }
            

            text.innerHTML += `${sep}<${tag1} class="title">${data[i]['title']}</${tag1}> 
                                <${tag2} class="value">${data[i]['value']}</${tag2}>`;
        }                 
    }
    text.innerHTML +=`<br> 
                      <div class="footer">З аналізом ознайомлений(на) _______________________ </div>`;
}

let num = 4

function createCard(dat){
    let data_report = []
    if (num === -1) {
        
    }
    $.each(dat,function(key, value){
        if (value['title'] !== "" && data_table[key] !== undefined){
            let id = data_table[key]['id'];
            let title = data_table[key]['title'];
            data_report.push({'id':id, 'title':title, 'value':value['$t']})
        }            
                    
    });
    sortById(data_report);
    print_my(data_report);
}

function createCards(data, num=-1){
    text.innerHTML = "";
    if (num === -1) {
        for (let i=2; i<data.length;i++){
            createCard(data[i]);
        }
    } else {
        createCard(data[num]);
    }
}
var gl_data;
function readPage(){
    let url  = "https://spreadsheets.google.com/feeds/list/"+key+"/"+sheet2+"/public/values?alt=json"
    $.getJSON(url,
        
       function (data) {
            console.log(data);
            data = data['feed']['entry'];
            gl_data = data;
            $.each(data[0],function(key,value){
                if (key.indexOf('gsx$') === 0){
                    let m = {'id': parseFloat(data[1][key]['$t']), 'title':value['$t']};
                    data_table[key] = m;                   
                }              
            });
            for (let i=2; i<gl_data.length; i++){
                gl_data[i]['id_m'] = i;
            }
            createLists(gl_data);
            createTable(gl_data);
  

        }       
    );    

}

function createLists(data){
    createListsTeach(data);
    createListsClas(data);
    createListsSubj(data);
    createListsWho(data);
}

//Створюємо списки для меню
function createListsWho(data){
    for(let i=2; i<data.length; i++){
        who.add(data[i]['gsx$хтовідвідуєурок']['$t'])
    }
    //Сврорюємо меню для фільтрації вчителів
    let ul = document.getElementById("who__menu__items_id");
    let i = 0;
    for(value of who){            
        let li = document.createElement('li');
        li.classList.add('context-menu__item');        
        // let value0 = value.replace(/[\s.,%]/g, '')
        li.innerHTML=`<input class="f_chb_who" 
                        type="checkbox"
                        id="c${i}" 
                        data-1="${value}"
                        checked
                        onclick="filtrClick(this);"
                        >${value}`;
        ul.append(li);
        i++;
    }
}
//Створюємо списки для меню
function createListsClas(data){
    for(let i=2; i<data.length; i++){
        clas.add(data[i]['gsx$класгрупа']['$t'])
    }
    //Сврорюємо меню для фільтрації вчителів
    let ul = document.getElementById("clas__menu__items_id");
    let i = 0;
    for(value of clas){            
        let li = document.createElement('li');
        li.classList.add('context-menu__item');        
        // let value0 = value.replace(/[\s.,%]/g, '')
        li.innerHTML=`<input class="f_chb_clas" 
                        type="checkbox"
                        id="c${i}" 
                        data-1="${value}"
                        checked
                        onclick="filtrClick(this);"
                        >${value}`;
        ul.append(li);
        i++;
    }
}
function createListsSubj(data){
    for(let i=2; i<data.length; i++){
        subj.add(data[i]['gsx$предмет']['$t'])
    }
    //Сврорюємо меню для фільтрації вчителів
    let ul = document.getElementById("subj__menu__items_id");
    let i = 0;
    for(value of subj){            
        let li = document.createElement('li');
        li.classList.add('context-menu__item');        
        // let value0 = value.replace(/[\s.,%]/g, '')
        li.innerHTML=`<input class="f_chb_subj" 
                        type="checkbox"
                        id="c${i}" 
                        data-1="${value}"
                        checked
                        onclick="filtrClick(this);"
                        >${value}`;
        ul.append(li);
        i++;
    }
}
//Створюємо списки для меню
function createListsTeach(data){
    for(let i=2; i<data.length; i++){
        teach.add(data[i]['gsx$вчительурокякоговідвідують']['$t'])
    }
    //Сврорюємо меню для фільтрації вчителів
    let ul = document.getElementById("teach__menu__items_id");
    let i = 0;
    for(value of teach){            
        let li = document.createElement('li');
        li.classList.add('context-menu__item');        
        // let value0 = value.replace(/[\s.,%]/g, '')
        li.innerHTML=`<input class="f_chb" 
                        type="checkbox"
                        id="c${i}" 
                        data-1="${value}"
                        checked
                        onclick="filtrClick(this);"
                        >${value}`;
        ul.append(li);
        i++;
    }
}

btn_close_menu.addEventListener("click", ()=>{
    menuState = 0;
    menu.classList.remove(active);    
})

btn_close_menu_clas.addEventListener("click", ()=>{
    menuState = 0;
    menuClas.classList.remove(active);    
})
btn_close_menu_subj.addEventListener("click", ()=>{
    menuState = 0;
    menuSubj.classList.remove(active);    
})
btn_close_menu_who.addEventListener("click", ()=>{
    menuState = 0;
    menuWho.classList.remove(active);    
})



function filtrClick(e) {
    const table = document.getElementById('table_id');
    let ulTeach = document.querySelectorAll(".f_chb");
    let ulClas = document.querySelectorAll(".f_chb_clas");
    let ulSubj = document.querySelectorAll(".f_chb_subj");
    let ulWho = document.querySelectorAll(".f_chb_who");

    const rows = document.querySelectorAll(".row_cl");
    for(row of rows){
        let teach = row.getAttribute('data-teach');
        let clas = row.getAttribute('data-clas');
        let subj = row.getAttribute('data-subj');
        let who = row.getAttribute('data-who');
        let fTeach = false;
        for(inp of ulTeach) {
            let ch = inp.checked;
            let t = inp.getAttribute('data-1');
            if (teach === t){
                fTeach = ch;
            }
        }
        let fClas = false;
        for(inp of ulClas) {
            let ch = inp.checked;
            let c = inp.getAttribute('data-1');
            if (clas === c){
                fClas = ch;
            }
        }
        let fSubj = false;
        for(inp of ulSubj) {
            let ch = inp.checked;
            let s = inp.getAttribute('data-1');
            if (subj === s){
                fSubj = ch;
            }
        }
        let fWho = false;
        for(inp of ulWho) {
            let ch = inp.checked;
            let w = inp.getAttribute('data-1');
            if (who === w){
                fWho = ch;
            }
        }
        let f = fTeach && fClas && fSubj && fWho;
        if (f){
            row.style.display = "" 
        } else {
            row.style.display = "none";
        }

    }
    
    
    
}
// function filtrClickClas(e) {
//     const table = document.getElementById('table_id');
//     let ul = document.querySelectorAll(".f_chb_clas");
//     const rows = document.querySelectorAll(".row_cl");
    
//     for(inp of ul) {
//         let ch = inp.checked;
//         let t = inp.getAttribute('data-1');
//         for(row of rows){
//             if (t === row.getAttribute('data-name')){
//                 if (ch){
//                     row.style.display = "" 
//                 } else {
//                     row.style.display = "none";
//                 }
//             }
//         }
//     } 

// }

   
function toggleMenuOnTeach() {
    if ( menuState !== 1 ) {
        menuState = 1;
        menu.classList.add(active);
    } else {
        menuState = 0;
        menu.classList.remove(active);
    }
}
function toggleMenuOnClas() {
    if ( menuState !== 1 ) {
        menuState = 1;
        menuClas.classList.add(active);
    } else {
        menuState = 0;
        menuClas.classList.remove(active);
    }
}
function toggleMenuOnSubj() {
    if ( menuState !== 1 ) {
        menuState = 1;
        menuSubj.classList.add(active);
    } else {
        menuState = 0;
        menuSubj.classList.remove(active);
    }
}
function toggleMenuOnWho() {
    if ( menuState !== 1 ) {
        menuState = 1;
        menuWho.classList.add(active);
    } else {
        menuState = 0;
        menuWho.classList.remove(active);
    }
}

btn_teach.addEventListener("click", (e)=>{
    menuClick(e,'teach');
});
btn_clas.addEventListener("click", (e)=>{
    menuClick(e, 'clas');
});
btn_subj.addEventListener("click", (e)=>{
    menuClick(e, 'subj');
});
btn_who.addEventListener("click", (e)=>{
    menuClick(e, 'who');
});

function menuClick(e, n){
    let btn = e.target;
    let pos = btn.getBoundingClientRect();
    let x = parseInt(pos['x']);
    let y = parseInt(pos['y']);
    console.log(menu);
    
    if (n == 'teach'){
        menu.style.setProperty('left', String(x+15)+'px')
        menu.style.setProperty('top', String(y+40)+'px')
        toggleMenuOnTeach();
    } else  if (n == 'clas'){
        menuClas.style.setProperty('left', String(x+15)+'px')
        menuClas.style.setProperty('top', String(y+40)+'px')
        toggleMenuOnClas();
    }  else  if (n == 'subj'){
        menuSubj.style.setProperty('left', String(x+15)+'px')
        menuSubj.style.setProperty('top', String(y+40)+'px')
        toggleMenuOnSubj();
    } else  if (n == 'who'){
        menuWho.style.setProperty('left', String(x+15)+'px')
        menuWho.style.setProperty('top', String(y+40)+'px')
        toggleMenuOnWho();
    }
}



btn__copy_id.addEventListener('click', ()=>{
    // let el = document.getElementById("content");
    let range = document.createRange();
    range.selectNode(text); 
    window.getSelection().addRange(range); 
    try { 
      document.execCommand('copy'); 
    } catch(err) { 
      console.log('Can`t copy, boss'); 
    } 
    window.getSelection().removeAllRanges();
})


btn_print.addEventListener("click", ()=>{
    text.innerText = "";
    for (let i=2; i<gl_data.length; i++){
        let c = document.getElementById("id_"+String(i));
        if (c.checked){
            createCard(gl_data[i]);
        }
    }    
})

function fillTable(table, i, d){
    let cel1 = document.createElement('td');
    let cel2 = document.createElement('td');
    let cel3 = document.createElement('td');
    let cel4 = document.createElement('td');
    let cel5 = document.createElement('td');
    let cel6 = document.createElement('td');
    let cel7 = document.createElement('td');
    cel1.classList.add('cel_def');
    cel2.classList.add('cel_def');
    cel3.classList.add('cel_def');
    cel4.classList.add('cel_def');
    cel5.classList.add('cel_def');
    cel6.classList.add('cel_def');
    cel7.classList.add('cel_def');
    cel7.classList.add('cel_chb');
    let row = document.createElement('tr');
    row.setAttribute('id','row_'+String(i));
    cel1.innerText=d['gsx$датапроведенняуроку']['$t'];    
    cel2.innerText=d['gsx$хтовідвідуєурок']['$t'];
    cel3.innerText=d['gsx$вчительурокякоговідвідують']['$t'];
    cel4.innerText=d['gsx$класгрупа']['$t'];
    cel5.innerText=d['gsx$предмет']['$t'];
    cel6.innerText=d['gsx$темауроку']['$t'];

    row.setAttribute('data-teach', d['gsx$вчительурокякоговідвідують']['$t']);
    row.setAttribute('data-clas', d['gsx$класгрупа']['$t']);
    row.setAttribute('data-subj', d['gsx$предмет']['$t']);
    row.setAttribute('data-who', d['gsx$хтовідвідуєурок']['$t']);

    let ul = document.querySelectorAll(".f_chb");
    row.classList.add('row_cl');
    cel7.innerHTML=`
             <input id="id_${String(i)}" type="checkbox">
        `;
    table.append(row);
    row.append(cel1, cel2, cel3, cel4, cel5, cel6, cel7);
}

function createTable(data){
    const table = document.getElementById("table__id");
    for (let i=2; i<data.length; i++){
        fillTable(table, i, data[i]);
    }
    
 


}

readPage();
// createCards(data);

