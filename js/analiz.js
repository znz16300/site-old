var d1 = "";
// let data_table = {};
let teach =  new Set();
let clas =  new Set();
let subj =  new Set();
let who =  new Set();
let date =  new Set();
let shName = 'Відповіді форми (1)';


let sheet2 = "default";
let title_st = '';
var key_map = {};
let key;
let props = {
    'boss': '', 
    'boss_short': '', 
    'boss_posada': 'Директор', 
    'title_school': '', 
    'set_signature_teacher': true,  
    'set_signature_boss': false, 
};


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
const text = document.getElementById("content");
const btn_close_modal = document.getElementById("btn_close_modal");
const sel_all_id = document.getElementById("sel_all_id");
const reset_btn = document.getElementById("reset_btn_id");
const settings_btn = document.getElementById("settings_btn_id");
const props_div = document.getElementById("props_div_id");
const set_signature_teacher = document.getElementById("set_signature_teacher_id");
const set_signature_boss = document.getElementById("set_signature_boss_id");
const name_boss = document.getElementById("name_boss_id");
const posada_boss = document.getElementById("posada_boss_id");
const pet_info = document.getElementById("pet_info_id");


var menuState = 0;
var madalState = 0;
var active = "context-menu--active";
var selected_all_head_table = false;
var teachSelBtnAll = true;
var clasSelBtnAll = true;
var subjSelBtnAll = true;
var whoSelBtnAll = true;
var filters = null;


const modalWindow = document.querySelector('.modal__wrapper');

settings_btn.addEventListener('click', ()=>{
    props_div.hidden = false
    pet_info.hidden = true
    let b = ``;
    set_signature_teacher.checked = props['set_signature_teacher'];
    set_signature_boss.checked = props['set_signature_boss'];
    name_boss.value = props['boss_short'];
    posada_boss.value = props['boss_posada'];
    fillModalWindow(b);
    toggleModalWindow();
})

set_signature_teacher.addEventListener('change', ()=> {
    props['set_signature_teacher'] = set_signature_teacher.checked;
    window.localStorage.setItem("propsForAnaliz", JSON.stringify(props));
})

set_signature_boss.addEventListener('change', ()=> {
    props['set_signature_boss'] = set_signature_boss.checked;
    window.localStorage.setItem("propsForAnaliz", JSON.stringify(props));
})
name_boss.addEventListener('change', ()=> {
    props['boss_short'] = name_boss.value;
    window.localStorage.setItem("propsForAnaliz", JSON.stringify(props));
})
posada_boss.addEventListener('change', ()=> {
    props['boss_posada'] = posada_boss.value;
    window.localStorage.setItem("propsForAnaliz", JSON.stringify(props));
})

reset_btn.addEventListener('click', ()=>{
    let cnf = confirm(`Вилучити ключ таблиці?`);
    if (cnf){
        window.localStorage.removeItem("keyTableForAnaliz");
        window.localStorage.removeItem("filters");
    }
})

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

function reformatString(text) {
    text = text.trim();
    while (text[text.length - 1] === "." || text[text.length - 1] === ":" || text[text.length - 1] === ","){
        text = text.slice(0, text.length - 1);
    }
    while ((text[0] >= "0" && text[0] <= "9") || text[0] === "."){
        text = text.slice(1);
    }
        
    return text.trim();
}

function print_atom(data){
    
    if (data[0].title === data[0].value){
        return undefined;
    }

    let allPar = '';
    let clasT = ' class="title" ';
    let clasV = ' class="value" ';
    let sep = ': ';
    let form_at = 0;
    let t_les = "УРОК";

    let ttl = "АНАЛІЗ УРОКУ";
    dist =`<p></p><div class="title1">${ttl}</div>`;
    data.push({'id':111111111, 'title':" ", 'value':" "});
    // console.log(data);
    for(let i=0; i<data.length-1; i++){
        if (data[i].key === titleToKey('Позначка часу')) {
            continue;
        }
        let symEnd = '';
        let a = reformatString(data[i].title);
        let rozdTitle = rozd_v2[a];
        if (rozdTitle === undefined){
            rozdTitle = "";
        } else {
            rozdTitle = rozdTitle.toUpperCase();
        }
        next_title=(data[i+1].title).trim().toUpperCase();
        allPar += rozdTitle;
        let title_0 = reformatString((data[i]['title']).trim());
        allPar += format_Aa(title_0, 
                            (data[i].value).replace('_', '').trim(), 
                            next_title=next_title,  
                            format=form_at, 
                            sep=sep, 
                            symEnd=symEnd,                          
                            );
    }
    allPar = format_2(allPar, clasT, clasV);
     dist += allPar;
    // text.innerHTML += format_2(allPar, clasT, clasV);
    dist = refactorText(dist);
    let sp_long = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
    if (props['set_signature_teacher'] === true){
        tmp = 'З аналізом ознайомлений(на)  ' + sp_long + '  '
    } else tmp = '';
    
    if (props['set_signature_boss'] === true){
        tmp2 = props['boss_posada'] + sp_long + sp_long  + sp_long + sp_long + 
                '  ' + sp_long + props['boss_short'];
    } else tmp2 = '';

    dist +=`<p></p> 
                   <div class="footer"> ${tmp} </div>
                   <div class="footer"> ${tmp2} </div>
                   <p style="margin-bottom: 100px;"></p> 

                   `;

    //  dist +=`<p></p> 
    //                 <div class="footer">З аналізом ознайомлений(на) _______________________ </div>
    //                 <p style="margin-bottom: 100px;"></p> 
    //                 `;
    
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

function __print_atom(data){
    console.log(data);
    let dist = "";
    let form_at = 0;
    //TODO 
    let dd = idToData(data, 8);
    // console.log(data);
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
    let sep = ': ';
    let partPrint = false;
    // console.log(data);
    for(let i=0; i<data.length-1; i++){
        let id = data[i]['id'];
        let symEnd = '';
        console.log(data[id]);
        console.log(id);
        if (data[id]===undefined){
            continue;
        }
        let a = reformatString(data[id]['title']);
        let rozdTitle = rozd_v2[a];
        if (data[id]['title'] === "Позначка часу") {
            continue;
        }
         if (rozdTitle === undefined || (data[id]['value']).trim() === "")  {
            rozdTitle = "";
        } else {
            rozdTitle = `<strong> ${rozdTitle.toUpperCase()} </strong>`;
        }
        allPar += rozdTitle;
         next_title=(data[i+1]['title']).trim().toUpperCase();
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
            let title_0 = reformatString((data[i]['title']).trim());
            allPar += format_Aa(title_0, 
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
    if (props['set_signature_teacher'] === true){
         tmp = 'З аналізом ознайомлений(на) _______________________ ';
     } else tmp = '';
     if (props['set_signature_boss'] === true){
         tmp2 = 'Директор ' + '\t' + ' _______________________ ' + '\t' + props['boss_short'];
     } else tmp2 = '';

     dist +=`<p></p> 
                    <div class="footer"> ${tmp} </div>
                    <div class="footer"> ${tmp2} </div>
                    <p style="margin-bottom: 100px;"></p> 

                    `;
    
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
            par = `<p class="value">${title}${sep}${value}</p>`;
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

function idToData(dat, id){
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
    $.each(fieldNames,function(key, val){
        let value = dat[val.key];
        if (dat[val.key] !== undefined){
            if (value['$t'] !== ""){
                let id = parseInt(key);
                let title = val.title;
                let valUE = value['$t'];
                let kEy = val.key;
                data_report.push({'id':id, 'title':title, 'value': valUE, 'key':kEy})
            }
        }       
    })
    sortById(data_report);
    return data_report;
}



function createCardAll(dat){
    let data_report = createCard(dat);
    print_my(data_report);
}


var gl_data = [];
var fieldNames = {};


let setFields = (data)=>{
    let i=0;
    $.each(data[0],function(key,value){
        if (key.slice(0,4) === 'gsx$'){
            fieldNames[i] = {'key': key, 'title': value['$t']};
            i++;
        }        
    })
}

function titleToKey (title){
    let k;
    $.each(fieldNames, function(key, value){
        if (value['title'] === title){
            k = value['key'];  
            return k;        
        }        
    })
    return k;
}
function keyToTitle (k){
    let k_;
    $.each(fieldNames, function(key, value){
        if (value['key'] === k){
            k_ = value['title'];  
            return k_;        
        }        
    })
    return k_;
}
function keyToId (k){
    let k_;
    $.each(fieldNames, function(key, value){
        if (value['key'] === k){
            k_ = key;  
            return k_;        
        }        
    })
    return k_;
}

let readAnaliz = (s2)=>{
    let shName = 'FormAnsver1';
    let url = 'https://zelenskiy.pythonanywhere.com/getblock/'+key+'/'+shName;
    // let url  = "https://spreadsheets.google.com/feeds/list/"+key+"/"+s2+"/public/values?alt=json"
    $.getJSON(url,
        
       function (data) {
            data = data['feed']['entry'];       
            // sortByTeach(data);  
            setFields(data);

            //gl_data = data; 
            gl_data = gl_data.concat(data)

            for (let i=0; i<gl_data.length; i++){
                // gl_data[i]['id_m'] = i;
                gl_data[i]['normDate'] = (dateReformat(gl_data[i][titleToKey('Дата проведення уроку')]['$t']));
            }
            
            sortByDate(gl_data); 
            for (let i=0; i<gl_data.length; i++){
                gl_data[i]['id_m'] = i;
                // gl_data[i]['normDate'] = (dateReformat(gl_data[i][titleToKey('Дата проведення уроку')]['$t']));
            }
            
            createLists(gl_data);
            createTable(gl_data);

       }
       
       
    );    

}

function dateReformat(date){
    //Переформатування дати з формату DD.MM.YYYY в yyyy-MM-dd
    let d = date.slice(0,2);
    let m = date.slice(3,5);
    let y = date.slice(6,10);
    date = y + '-' + m + '-' + d;
    return date;
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

let createLists = (data)=>{
    for (x of ['who', 'clas', 'subj', 'teach']){
        createList(data, x);
    }
    createListsDate(data);
}

//Створюємо списки для меню
let createList =(data, m)=>{
    const mCL ={             //menuCreateList
        'who': {
            'field': titleToKey('Хто відвідує урок'), 
            'setName': who, 
            'ulId': 'who__menu__items_id', 
            'inputIdSelAll': 'who_selAll_id', 
            'menu': 'menuWho', 
            'inputId': 'f_chb_who', 
        },
        'clas': {
            'field': titleToKey('Клас, група'), 
            'setName': clas, 
            'ulId': 'clas__menu__items_id', 
            'inputIdSelAll': 'clas_selAll_id', 
            'menu': 'menuClas', 
            'inputId': 'f_chb_clas', 
        },
        'subj': {
            'field': titleToKey('Предмет'), 
            'setName': subj, 
            'ulId': 'subj__menu__items_id', 
            'inputIdSelAll': 'subj_selAll_id', 
            'menu': 'menuSubj', 
            'inputId': 'f_chb_subj', 
        },
        'teach': {
            'field': titleToKey('Вчитель, урок якого відвідують'), 
            'setName': teach, 
            'ulId': 'teach__menu__items_id', 
            'inputIdSelAll': 'teach_selAll_id', 
            'menu': 'menuTeach', 
            'inputId': 'f_chb', 
        },

    };

    for(let i=0; i<data.length; i++){
        let dpu = titleToKey('Дата проведення уроку');
        if (data[i][dpu]['$t'][0] >= '0' && 
            data[i][dpu]['$t'][0] <= '3' ){
                mCL[m]['setName'].add(data[i][mCL[m]['field']]['$t'])
        }        
    }
    //Сврорюємо меню для фільтрації obj
    let ul = document.getElementById(mCL[m]['ulId']);
    let i = 0;
    //create btn select
    let li = document.createElement('li');
    li.classList.add('context-menu__item');
    li.innerHTML=`<input class="f_chb_all" 
                        type="checkbox"  
                        id="${mCL[m]['inputIdSelAll']}"                      
                        checked
                        onclick="filtrSelAllClick(this);"
                        >  ------`;
    ul.append(li);
    for(value of mCL[m]['setName']){            
        let li = document.createElement('li');
        li.classList.add('context-menu__item');        
        // Якщо obj є в списку filters встановимо x = 'checked' інакше x = ''
        let x = 'checked'; //checked
        if (filters !== null){
            if (filters[mCL[m]['menu']].find(element => element === value) !== undefined){
                x = 'checked';
            } else {
                x = ''
            }
        }
        li.innerHTML=`<input class="${mCL[m]['inputId']}" 
                        type="checkbox"
                        id="c${i}" 
                        data-1="${value}"
                        ${x}
                        onclick="filtrClick(this);"
                        >${value}`;
        ul.append(li);
        i++;
    }


}


//Створюємо списки для меню
let createListsDate = (data)=>{
    for(let i=0; i<data.length; i++){
        //TODO
        let s = data[i][titleToKey('Дата проведення уроку')]['$t'];
        let day = s.substr(0,2);
        let month = s.substr(3,2);
        let year = s.substr(6,4);
        let d = `${year}-${month}-${day}`;
        if (d[0] >= '0' && d[0] <= '9' ) {
            date.add(d);
        }        
    }
    let max = '2000-01-01';
    let min = '2100-01-01';
    let max_0 = '2000-01-01';
    let min_0 = '2100-01-01';
    for (d of date){
            if (d<min_0) min_0 = d;
            if (d>max_0) max_0 = d;
    };
    if (filters === null) {
        for (d of date){
            if (d<min) min = d;
            if (d>max) max = d;
        }
    } else {
        min = filters['menuDate']['start'];
        max = filters['menuDate']['finish'];
    }

    let ul = document.getElementById("date__menu__items_id");
    let i = 0;
    let li = document.createElement('li');
    li.classList.add('context-menu__item'); 
    li.innerHTML=`
        <div class="inp_data">
            <span class="sp_0"> Від </span> <input id="d1" type="date" 
            value="${min}"
            data-lim="${min_0}"
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
                data-lim="${max_0}"
                onchange="filtrClick(this);"
                >
            </div>
        </div>
    `;
    let li3 = document.createElement('li');
    li3.classList.add('context-menu__item'); 
    li3.innerHTML=`
    <div class="inp_data">
        <div  class="sp_0"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </div>
        <div  class="sp_0">
            <button id="date_reset_id">Скинути фільтр</button>
            <button id="date_close_id">x</button>
        </div>
    </div>`;
    ul.append(li, li2, li3);
    const date_reset_id = document.getElementById('date_reset_id');
    date_reset_id.addEventListener('click', (e)=>{
        const d1 = document.getElementById('d1');
        const d2 = document.getElementById('d2');
        d1.value = d1.getAttribute('data-lim');    
        d2.value = d2.getAttribute('data-lim'); 
        filtrClick(null);   
    })
    const date_close_id = document.getElementById('date_close_id');
    date_close_id.addEventListener('click', (e)=>{
        menuState = 0;
        menuDate.classList.remove(active);    
    })
}

function filtrSelAllClick(e) {    
    const ulTeach = document.querySelectorAll(".f_chb");
    const ulClas = document.querySelectorAll(".f_chb_clas");
    const ulSubj = document.querySelectorAll(".f_chb_subj");
    const ulWho = document.querySelectorAll(".f_chb_who");

    switch (e.id) {
        case "teach_selAll_id":
            teachSelBtnAll = !teachSelBtnAll;            
            for(let inp of ulTeach) {
                inp.checked = teachSelBtnAll;                
            }            
            break;
        case "clas_selAll_id":
            clasSelBtnAll = !clasSelBtnAll;            
            for(let inp of ulClas) {
                inp.checked = clasSelBtnAll;                
            }              
            break;
        case "subj_selAll_id":
            subjSelBtnAll = !subjSelBtnAll;            
            for(let inp of ulSubj) {
                inp.checked = subjSelBtnAll;                
            }    
            break;
        case "who_selAll_id":
            whoSelBtnAll = !whoSelBtnAll;            
            for(let inp of ulWho) {
                inp.checked = whoSelBtnAll;                
            }    
            break;
    }
    filtrClick(null);
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


let filtrClick = (e)=>{
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
    saveFilter();
    let mm = [
        {0: document.querySelectorAll('.f_chb'), 1: document.getElementById ('id_table_teach')},
        {0: document.querySelectorAll('.f_chb_clas'), 1: document.getElementById ('id_table_clas')},
        {0: document.querySelectorAll('.f_chb_who'), 1: document.getElementById ('id_table_who')},
        {0: document.querySelectorAll('.f_chb_subj'), 1: document.getElementById ('id_table_subj')},
        {0: null, 1: document.getElementById ('id_table_date')},
    ];
    for (m of mm){
        showFilter(m[0], m[1]);
    }    
}

let showFilter = (a, img) => {    
    let f = true;
    if (a !== null){
        for (t of a){
            f &= t.checked;
        }
    } else {
        const d1 = document.getElementById('d1');
        const d2 = document.getElementById('d2');
        let dataL1 = d1.getAttribute('data-lim');
        let dataL2 = d2.getAttribute('data-lim');
        f &= dataL1===d1.value;
        f &= dataL2===d2.value;
    }
    if (f) {
        img.setAttribute('src',"./assets/icons/filter_btn.png");
    } else {
        img.setAttribute('src',"./assets/icons/filter_btn_on.png");
    }      
}


let loadFilters = () =>{
    filters = JSON.parse(window.localStorage.getItem('filters') || null);
}

let saveFilter = () => {
    //TODO Запам'ятовуємо всі фільтри в LocalStorage
    let ulTeach = document.querySelectorAll(".f_chb");
    let ulClas = document.querySelectorAll(".f_chb_clas");
    let ulSubj = document.querySelectorAll(".f_chb_subj");
    let ulWho = document.querySelectorAll(".f_chb_who");
    let d1 = document.getElementById("d1");
    let d2 = document.getElementById("d2");
    let teachList = [];
    for(inp of ulTeach) {
        let ch = inp.checked;
        let t = inp.getAttribute('data-1');
        if (t !== null){
            if (ch){
                teachList.push(t)
            } 
        }        
    }
    let whoList = [];
    for(inp of ulWho) {
        let ch = inp.checked;
        let t = inp.getAttribute('data-1');
        if (t !== null){
            if (ch){
                whoList.push(t)
            } 
        }        
    }
    let clasList = [];
    for(inp of ulClas) {
        let ch = inp.checked;
        let t = inp.getAttribute('data-1');
        if (t !== null){
            if (ch){
                clasList.push(t)
            } 
        }        
    }
    let subjList = [];
    for(inp of ulSubj) {
        let ch = inp.checked;
        let t = inp.getAttribute('data-1');
        if (t !== null){
            if (ch){
                subjList.push(t)
            } 
        }        
    }


    let filter = {
        'menuDate': {'start':d1.value, 'finish':d2.value},
        'menuWho': whoList, 
        'menuTeach': teachList, 
        'menuClas': clasList, 
        'menuSubj': subjList,
    };

    window.localStorage.setItem('filters', JSON.stringify(filter));
}

   
let toggleMenu = (m)=>{
    if ( menuState !== 1 ) {
        menuState = 1;
        m.classList.add(active);
    } else {
        menuState = 0;
        m.classList.remove(active);
    }
}

let toggleMenuOnTeach = ()=>{
    if ( menuState !== 1 ) {
        menuState = 1;
        menu.classList.add(active);
    } else {
        menuState = 0;
        menu.classList.remove(active);
    }
}


btn_teach.addEventListener("click", (e)=>{
    menuClick(e,menu);
});
btn_clas.addEventListener("click", (e)=>{
    menuClick(e, menuClas);
});
btn_subj.addEventListener("click", (e)=>{
    menuClick(e, menuSubj);
});
btn_who.addEventListener("click", (e)=>{
    menuClick(e, menuWho);
});
btn_date.addEventListener("click", (e)=>{
    menuClick(e, menuDate);
});

sel_all_id.addEventListener("click", (e)=>{
    //Виділяємо (знімаємо виділення) всі елементи в таблиці для виводу
    $(".sel_table_id_cl").each(function(i,elem) {
        let rowId = "row_"+elem.id.slice(3);
        let chbId = elem.id;
        if (document.getElementById(rowId).style.display === ""){
            if (!selected_all_head_table){
                document.getElementById(chbId).setAttribute("checked", "true");
            } else {
                document.getElementById(chbId).removeAttribute("checked");
            }
            
        }        
    });
    selected_all_head_table = !selected_all_head_table;
})


let menuClick = (e, m)=>{
    let btn = e.target;
    let pos = btn.getBoundingClientRect();
    let x = parseInt(pos['x']);
    let y = parseInt(pos['y']);
    m.style.setProperty('left', String(x+15)+'px')
    m.style.setProperty('top', String(y+40)+'px')
    toggleMenu(m);   
}


btn__copy_id.addEventListener('click', ()=>{
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
    const rows = document.querySelectorAll(".sel_table_id_cl");
    let i = 1;
    for (elem of rows){
        if (elem.style.display === "" && elem.checked){
            let rowId = "row_"+elem.id.slice(3);
            let id_m = parseInt(rowId.slice(4));
            createCardAll(gl_data[id_m]);
        } 
        i++;
    } 
})



let fillTable = (table, i, d)=>{
    // (d['gsx$датапроведенняуроку']['$t'][0] >= '0' && d['gsx$датапроведенняуроку']['$t'][0] <= '3' )
    let dpu = titleToKey('Дата проведення уроку');
    if (d[dpu]['$t'][0] >= '0' && 
        d[dpu]['$t'][0] <= '3' ){
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
        cel1.innerText=d[titleToKey('Дата проведення уроку')]['$t'];    
        cel2.innerText=d[titleToKey('Хто відвідує урок')]['$t'];
        cel3.innerText=d[titleToKey('Вчитель, урок якого відвідують')]['$t'];
        cel4.innerText=d[titleToKey('Клас, група')]['$t'];
        cel5.innerText=d[titleToKey('Предмет')]['$t'];
        cel6.innerText=d[titleToKey('Тема уроку')]['$t'];
    
        row.setAttribute('data-teach', d[titleToKey('Вчитель, урок якого відвідують')]['$t']);
        row.setAttribute('data-clas', d[titleToKey('Клас, група')]['$t']);
        row.setAttribute('data-subj', d[titleToKey('Предмет')]['$t']);
        row.setAttribute('data-who', d[titleToKey('Хто відвідує урок')]['$t']);
        let s = d[titleToKey('Дата проведення уроку')]['$t'];
        let day = s.substr(0,2);
        let year = s.substr(6,4);
        let month = s.substr(3,2);
        s = `${year}-${month}-${day}`;
        row.setAttribute('data-date', s);
    
        let ul = document.querySelectorAll(".f_chb");
        row.classList.add('row_cl');
        cel7.innerHTML=`<div class="print_col_all">      
                <div class="print_col_i"><img class="print_col_img" id="img_${String(i)}" src="./assets/icons/eye.png"></div>
                <div class="print_col_chb"><input class="sel_table_id_cl" id="id_${String(i)}" type="checkbox"></div>
            </div>`;
        table.append(row);
        row.append(cel1, cel2, cel3, cel4, cel5, cel6, cel7);
     }   
}

let sortByDate = (arr)=>{
    // arr.sort((a, b) =>  (a['gsx$вчительурокякоговідвідують']['$t']) > (b['gsx$вчительурокякоговідвідують']['$t']) ? 1 : -1);
    arr.sort((a, b) =>  Date.parse(a['normDate']) > Date.parse(b['normDate']) ? 1 : -1);

}



let createTable = (gl_data)=>{    
    const table = document.getElementById("table__id");
    for (let i=0; i<gl_data.length; i++){
        fillTable(table, gl_data[i]['id_m'], gl_data[i]);
    }
    let print_col_imges = document.querySelectorAll(".print_col_img");
    print_col_imges.forEach(function(el) {
        el.addEventListener('click', (e)=>{
            let a = createCard (gl_data.find(p => "img_"+String(p['id_m']) == e.target.id));
            let b = print_atom(a);
            props_div.hidden = true
            pet_info.hidden = false
            fillModalWindow(b);
            toggleModalWindow();
        })
    });
    filtrClick(null); 
}

let fillModalWindow = (item)=>{
    let petAbout = document.querySelector('.pet_info__about');
    petAbout.innerHTML = item;
}


let readStorage = ()=>{
    key = window.localStorage.getItem("keyTableForAnaliz");
    if (key === null) {
        let s = prompt("Уведіть ключ", "");
        if (s !== null){
            key = s;
            window.localStorage.setItem("keyTableForAnaliz", s);
        }            
    }    
    // loadFilters();

    s = window.localStorage.getItem("propsForAnaliz");
    if (s === null) { 
        window.localStorage.setItem("propsForAnaliz", JSON.stringify(props))
    } else {
        props = JSON.parse(s)
    }

}




$(function(){
	$(window).scroll(function(){
		if($(window).scrollTop() > 100) {
			$('#scroll_top').show();
			$('#scroll_bottom').show();
		} else {
			$('#scroll_top').hide();
			$('#scroll_bottom').hide();
		}
	});
 
	$('#scroll_top').click(function(){
		$('html, body').animate({scrollTop: 0}, 600);
		return false;
    });
    
    $('#scroll_bottom').click(function(){
		$('html, body').animate({scrollTop: $(document).height() - $(window).height()}, 600);
		return false;
	});
});

// alert('Наразі функції сервісу обмежені. Просимо вибачення. Наші спеціалісти найближчим часом це виправлять.');

readStorage();
readAnaliz(sheet2);



