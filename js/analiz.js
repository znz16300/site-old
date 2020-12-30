var d1 = "";
let data_table = {};
let teach =  new Set();
let clas =  new Set();
let subj =  new Set();
let who =  new Set();
let date =  new Set();
let rozd = {
    94: "ТИП І СТРУКТУРА УРОКУ",
    98: "ЗМІСТ ТА МЕТОДИКА ПОВТОРЕННЯ ВИВЧЕНОГО",
    103: "ВИВЧЕННЯ НОВОГО МАТЕРІАЛУ",
    106: "МЕТОДИ НАВЧАННЯ",
    113: "ЗАСВОЄННЯ НОВОГО",
    116: "ЗАВДАННЯ ДОДОМУ",
    120: "ХАРАКТЕР ДІЯЛЬНОСТІ ВЧИТЕЛЯ",
    125: "ХАРАКТЕР ДІЯЛЬНОСТІ УЧНІВ",
    129: "РЕЗУЛЬТАТИ УРОКУ",
    // 129: "РЕЗУЛЬТАТИ УРОКУ",
    400: "ЗАГАЛЬНИЙ ВИСНОВОК ТА РЕКОМЕНДАЦІЇ",
  
  }

let sheet2 = "default";
let title_st = '';
let key;
// let key = '1VQq2KHHgf_rLtNMzyh9LETjbdSSmkpZRjAvbr9kdkjY';
// let key = '10mvPaSWj5GEguZ41Ahka56_VF8_0emYV30tmSIzObEU'; v2

const btn_print = document.getElementById("btn__print_id");
const btn__copy_id = document.getElementById("btn__copy_id");

const btn_teach = document.getElementById("id_table_teach");
const btn_clas = document.getElementById("id_table_clas");
const btn_subj = document.getElementById("id_table_subj");
const btn_who = document.getElementById("id_table_who");
const btn_date = document.getElementById("id_table_date");

var menu = document.getElementById("context-menu-id");
var menuClas = document.getElementById("context-menu-clas-id");
var menuSubj = document.getElementById("context-menu-subj-id");
var menuWho = document.getElementById("context-menu-who-id");
var menuDate = document.getElementById("context-menu-date-id");

const btn_close_menu = document.getElementById('btn_close_menu');
const btn_close_menu_clas = document.getElementById('btn_close_menu_clas');
const btn_close_menu_subj = document.getElementById('btn_close_menu_subj');
const btn_close_menu_who = document.getElementById('btn_close_menu_who');
const btn_close_menu_date = document.getElementById('btn_close_menu_date');
const text = document.getElementById("content");
const btn_close_modal = document.getElementById("btn_close_modal");

var menuState = 0;
var madalState = 0;
var active = "context-menu--active";


const modalWindow = document.querySelector('.modal__wrapper');

function changeOverflow() {
    let overflowY = document.body.style.overflowY;
    document.body.style.overflowY = overflowY != 'hidden' ? 'hidden' : 'visible';
}

function toggleModalWindow() {
    modalWindow.classList.toggle('modal__wrapper_active');
    changeOverflow();
}


modalWindow.addEventListener('click', e => {
    if (!e.target.closest('.modal') || e.target.closest('.modal_close')) toggleModalWindow();
});


function sortById(arr) {
    arr.sort((a, b) => a.id > b.id ? 1 : -1);
}

function refactorText(text) {
    while (text.indexOf('  ') > -1){
        text = text.replace('  ',' ');
    }
    while (text.indexOf('( ') > -1){
        text = text.replace('( ','(');
    }
    while (text.indexOf(' )') > -1){
        text = text.replace(' )',')');
    }
    while (text.indexOf(' .') > -1){
        text = text.replace(' .','.');
    }
    while (text.indexOf('..') > -1){
        text = text.replace('..','.');
    }
    return text;
}

function print_my(data){
    text.innerHTML += print_atom (data);
}



function print_atom(data){
    let dist = "";
    let form_at = 3;
    let dd = idToDate(data, 6);
    if (dd !== null && (dd['value'] === "Аналіз уроку на високому методичному рівні (схема/текст)" || 
        dd['value'] === "урок іноземної мови")){
        form_at = 3;
    } else {
        form_at = 0;
    }
    let ttl = "АНАЛІЗ УРОКУ";
    let t_les = "УРОК";
    if (dd !== null && (dd['value'] === "Аналіз виховного заходу")){
        ttl = "АНАЛІЗ ВИХОВНОГО ЗАХОДУ";
        t_les = "ЗАХІД";
    } 
    data.push({'id':111111111, 'title':" ", 'value':" "});
    dist +=`<p></p><div class="title1">${ttl}</div>`;
    let isBoldForTitle = true;
    let allPar = '';
    let clasT = ' class="title" ';
    let clasV = ' class="value" ';
    
    let sep = '';
    
    //console.log(dd['value']);

    let partPrint = false;
    //console.log(data);
    for(let i=0; i<data.length-1; i++){
        let id = data[i]['id'];
        if (id === 91){
            //console.log(111);
        }


        let symEnd = '';
        // if (parseInt(id + 0.5) === (id + 0.5) && data[i+1]['value']!== ""){
        //     partPrint = true;
        //     symEnd = '';
        // } else {
        //     partPrint = false;
        //     symEnd = ':';
        // }

        let rozdTitle = rozd[id];
        if (rozdTitle === undefined || (data[id+1]['value']).trim() === "")  {
        // if (rozdTitle === undefined || (data[i+1]['value']).trim() === "")  {
            rozdTitle = "";
        } else {
            console.log('111');
        }
        allPar += rozdTitle;

        // console.log(rozdTitle);

        next_title=(data[i+1]['title']).trim();


        if ((data[i]['value'] !== "" || partPrint) && data[i]['id'] >= 0  ){
            if (form_at === 3){
                
                let sym2 =(data[i]['title']).trim()[0];
                let sym3 =(data[i+1]['title']).trim()[0];
                if (sym2.toUpperCase() === sym2){
                    if (sym2 !== ')' && sym2 !== '(' && sym2 !== ','){
                        sep = "<br>";
                    } else {
                        sep = " ";
                    }
                } else {
                    sep = " ";
                }
            }
            allPar += format_Aa((data[i]['title']).trim(), 
                                (data[i]['value']).replace('_', '').trim(), 
                                next_title=next_title,  
                                format=form_at, 
                                sep=sep, 
                                symEnd=symEnd,                          
                                );

        }                 
    }
    

    //Варіант з ... виведенням
    allPar = format_2(allPar, clasT, clasV);

    dist += allPar;
    // text.innerHTML += format_2(allPar, clasT, clasV);

    dist = refactorText(dist);

    dist +=`<p></p> 
                      <div class="footer">З аналізом ознайомлений(на) _______________________ </div>`;
    
    if (t_les == "ЗАХІД"){
        dist = dist.replaceAll('УРОК', 'ЗАХІД');
        dist = dist.replaceAll('урок', 'захід');
        dist = dist.replaceAll('західу', 'заходу');
        dist = dist.replaceAll('західом', 'заходом');
        dist = dist.replaceAll('ЗАХІДУ', 'ЗАХОДУ');
        dist = dist.replaceAll('ЗАХІДОМ', 'ЗАХОДОМ');
    }   
                      
    return dist;
}

function format_Aa(title, value, next_title=' ', format=0, sep=' ',symEnd=''){
    let par = '';
    switch (format){
        case 0:
            par = `<p class="value">${title}${symEnd} ${value}</p>`;
            break;
        case 1:
            par = `<p class="title">${title}</p><p class="value">${value}</p>`;
            break;
        case 2:
            par = `${title} ${value}`;
            break;
        case 3:            
            par = `${sep} ${title} ${value}`;
            break;
    }
    

    return par;
}

 function format_1(allText, clasT, clasV){
     let ss =  allText.split('<br>');
     let i=0;
     let tex ='';
     for (t of ss) {
         i++;
         if (i%2 === 0){
             tex += `<p${clasT}>${t}</p>` 
         } else {
             tex += `<p${clasV}>${t}</p>` 
         }        
     }
     return tex;
 }

function idToDate(dat, id){
    for (d of dat){
        if (d['id'] === id){
            return d;
        }
    }
    return null;
}

function format_2(allText, clasT, clasV){
    // allText = allText.replace('<br>',' ');
    let ss =  allText.split('<br>');
    let tex ='';
    for (t of ss) {
        tex += `<p${clasV}>${t}</p>`     
    }
    return tex;
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
            data_report.push({'id':id, 'title':title, 'value':value['$t'], 'key':key})
        }            
                    
    });
    sortById(data_report);
    // Розкоментовуємо для отримання інформації про зміну файлу data_analiz.js
    //tmp__ (data_report);
    return data_report;
}

function createCardAll(dat){
    let data_report = createCard(dat);
    print_my(data_report);
}

function createCards(data, num=-1){
    text.innerHTML = "";
    if (num === -1) {
        for (let i=2; i<data.length;i++){
            createCardAll(data[i]);
        }
    } else {
        createCardAll(data[num]);
    }
}
var gl_data;
function readPage(){
    let url  = "https://spreadsheets.google.com/feeds/list/"+key+"/"+sheet2+"/public/values?alt=json"
    $.getJSON(url,
        
       function (data) {
            
            data = data['feed']['entry'];

            gl_data = data;
            $.each(data[0],function(key,value){
                //Вилучаємо числа на початку value
                let v = value['$t'];
                if (v !== undefined){
                    while ((v[0] >="0" && v[0] <="9") ||  v[0] ==="."){
                        v = v.slice(1);
                    }
                    v = v.trim();
                }
                

                if (key.indexOf('gsx$') === 0){
                    let m = {'id': parseFloat(data[1][key]['$t']), 'title':v};
                    data_table[key] = m;                   
                }              
            });
            for (let i=2; i<gl_data.length; i++){
                gl_data[i]['id_m'] = i;
            }
            createLists(gl_data);
            createTable(gl_data);
            console.log('data_table');
            console.log(data_table);
            
            

        }       
    );    

}

function tmp__ (data_report) {

    text.innerText ='';
    console.log(data_report);
    
    $.each(data_report,function(key,value){
        // text.innerText += `<br> key="${key}" value="${value}"`;
        // console.log(key);
        value = '';
        
    });
    let jSON = JSON.stringify(data_report, null, 2);
    console.log(jSON);
    console.log('===============');

}

function createLists(data){
    createListsTeach(data);
    createListsClas(data);
    createListsSubj(data);
    createListsWho(data);
    createListsDate(data);
}

//Створюємо списки для меню
function createListsDate(data){
    for(let i=2; i<data.length; i++){
        //TODO
        let s = data[i]['gsx$датапроведенняуроку']['$t'];
        let day = s.substr(0,2);
        let month = s.substr(3,2);
        let year = s.substr(6,4);
        let d = `${year}-${month}-${day}`;
        date.add(d);
    }
    let max = '2000-01-01';
    let min = '2100-01-01';
    for (d of date){
        if (d<min) min = d;
        if (d>max) max = d;
    }

    //console.log(min);
    //console.log(max);
    let ul = document.getElementById("date__menu__items_id");
    let i = 0;
    let li = document.createElement('li');
    li.classList.add('context-menu__item'); 
    li.innerHTML=`
        <div class="inp_data">
            <span class="sp_0"> Від </span> <input id="d1" type="date" 
            value="${min}"
            onchange="filtrClick(this);"
            >
        </div>
    `;

    let li2 = document.createElement('li');
    li2.classList.add('context-menu__item'); 
    li2.innerHTML=`
        <div class="inp_data">
            <div  class="sp_0"> до&nbsp;&nbsp; </div>
            <div  class="sp_0">
                <input 
                class="input_data_cl" 
                id="d2" 
                type="date" 
                value="${max}"
                onchange="filtrClick(this);"
                >
            </div>
        </div>
    `;
    ul.append(li, li2);
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
btn_close_menu_date.addEventListener("click", ()=>{
    menuState = 0;
    menuDate.classList.remove(active);    
})



function filtrClick(e) {
    const table = document.getElementById('table_id');
    let ulTeach = document.querySelectorAll(".f_chb");
    let ulClas = document.querySelectorAll(".f_chb_clas");
    let ulSubj = document.querySelectorAll(".f_chb_subj");
    let ulWho = document.querySelectorAll(".f_chb_who");
    let d1 = document.getElementById("d1");
    let d2 = document.getElementById("d2");

    const rows = document.querySelectorAll(".row_cl");
    for(row of rows){
        let teach = row.getAttribute('data-teach');
        let clas = row.getAttribute('data-clas');
        let subj = row.getAttribute('data-subj');
        let who = row.getAttribute('data-who');
        let date = row.getAttribute('data-date');
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
        //console.log(d1);
        //console.log(d2);
        let s1 = d1.value;
        let s2 = d2.value;
        let fDate = (date >= s1 && date <= s2);
        let f = fTeach && fClas && fSubj && fWho && fDate;
        if (f){
            row.style.display = "" 
        } else {
            row.style.display = "none";
        }

    }
    
    
    
}

   
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
function toggleMenuOnDate() {
    if ( menuState !== 1 ) {
        menuState = 1;
        menuDate.classList.add(active);
    } else {
        menuState = 0;
        menuDate.classList.remove(active);
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
btn_date.addEventListener("click", (e)=>{
    menuClick(e, 'date');
});

function menuClick(e, n){
    let btn = e.target;
    let pos = btn.getBoundingClientRect();
    let x = parseInt(pos['x']);
    let y = parseInt(pos['y']);
    //console.log(menu);
    
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
    } else  if (n == 'date'){
        menuDate.style.setProperty('left', String(x+15)+'px')
        menuDate.style.setProperty('top', String(y+40)+'px')
        toggleMenuOnDate();
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
      //console.log('Can`t copy, boss'); 
    } 
    window.getSelection().removeAllRanges();
})


btn_print.addEventListener("click", ()=>{
    text.innerText = "";
    for (let i=2; i<gl_data.length; i++){
        let c = document.getElementById("id_"+String(i));
        if (c.checked){
            createCardAll(gl_data[i]);
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
    let s = d['gsx$датапроведенняуроку']['$t'];
    let day = s.substr(0,2);
    let year = s.substr(6,4);
    let month = s.substr(3,2);
    s = `${year}-${month}-${day}`;
    row.setAttribute('data-date', s);

    let ul = document.querySelectorAll(".f_chb");
    row.classList.add('row_cl');
    cel7.innerHTML=`<div class="print_col_all">        
            <div class="print_col_chb"><input id="id_${String(i)}" type="checkbox"></div>
            <div class="print_col_i"><img class="print_col_img" id="img_${String(i)}" src="./assets/icons/eye.png"></div>
        </div>`;
    table.append(row);
    row.append(cel1, cel2, cel3, cel4, cel5, cel6, cel7);
    
    
}

function createTable(data){
    const table = document.getElementById("table__id");
    for (let i=2; i<data.length; i++){
        fillTable(table, i, data[i]);
    }
    let print_col_imges = document.querySelectorAll(".print_col_img");
    print_col_imges.forEach(function(el) {
        el.addEventListener('click', (e)=>{
            let a = createCard (data.find(p => "img_"+String(p['id_m']) == e.target.id));
            let b = print_atom(a);
            fillModalWindow(b);
            toggleModalWindow();
        })
    });

    
 


}

function fillModalWindow(item) {
    let petAbout = document.querySelector('.pet_info__about');
    petAbout.innerHTML = item;
}


function readStorage(){
    key = window.localStorage.getItem("keyTableForAnaliz");
    if (key === null) {
        let s = prompt("Уведіть ключ", "");
        if (s !== null){
            key = s;
            window.localStorage.setItem("keyTableForAnaliz", s);
        }            
    }    
}

readStorage();
// url  = "https://spreadsheets.google.com/feeds/list/"+keyTableNews+"/"+sheet+"/public/values?alt=json";

readPage();
// createCards(data);

