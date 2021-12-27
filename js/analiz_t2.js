//const url = "http://127.0.0.1:5000/";
const url = "https://schooltools.pythonanywhere.com/";

var d1 = "";

let teach =  new Set();
let clas =  new Set();
let subj =  new Set();
let who =  new Set();
let date =  new Set();
let tema =  new Set();
let glData = {}

const shName = 'FormAnswer1';

const sheet2 = "default";
let title_st = '';
var key_map = {};
let key;
let props = {
    'boss': '', 
    'boss_short': '', 
    'boss_posada': 'Директор', 
    'title_school': '', 
    'title_school_r_v': '', 
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
const zaklad_name = document.getElementById("zaklad_name_id");
const zaklad_name_r_v = document.getElementById("zaklad_name_r_v_id");

const pet_info = document.getElementById("pet_info_id");
// const sel_table_id_cl = document.querySelectorAll(".sel_table_id_cl");

let menuState = 0;
let madalState = 0;
let active = "context-menu--active";
let selected_all_head_table = false;
let teachSelBtnAll = true;
let clasSelBtnAll = true;
let subjSelBtnAll = true;
let whoSelBtnAll = true;
let filters = null;


const modalWindow = document.querySelector('.modal__wrapper');

settings_btn.addEventListener('click', ()=>{
    props_div.hidden = false
    pet_info.hidden = true
    let b = ``;
    set_signature_teacher.checked = props['set_signature_teacher'];
    set_signature_boss.checked = props['set_signature_boss'];
    name_boss.value = props['boss_short'];
    posada_boss.value = props['boss_posada'];
    zaklad_name.value = props['zaklad_name'];
    zaklad_name_r_v.value = props['zaklad_name_r_v'];
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
zaklad_name.addEventListener('change', ()=> {
    props['zaklad_name'] = zaklad_name.value;
    window.localStorage.setItem("propsForAnaliz", JSON.stringify(props));
})
zaklad_name_r_v.addEventListener('change', ()=> {
    props['zaklad_name_r_v'] = zaklad_name_r_v.value;
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

function print_atom(table, head, dat){  


    let allPar = '';
    let clasT = ' class="title" ';
    let clasV = ' class="value" ';
    let sep = ': ';
    let form_at = 0;
    let t_les = "УРОК";

    let ttl = "АНАЛІЗ УРОКУ";
    dist =`<p></p><div class="title1">${ttl}</div>`;
    for(let i=0; i<head.length; i++){
        if (head[i] === 'Позначка часу') {
            continue;
        }
        allPar += '<p>';
        let h = head[i].trim()
        if (h[h.length-1] === ';'||h[h.length-1] === '.'||h[h.length-1] === ','||h[h.length-1] === ':') h = h.slice(0, -1)
        
        let v = dat[i]     
        if (v === ''||v === undefined) {
            continue;
        } 
        let rozzz = rozd_data[table][h]
        if(rozzz !== undefined){
            allPar += `<h3>${rozzz}</h3>`;
        }

        
        if (h === "1. Повнота та глибина перевірки"){
            console.log('!!!!!')
        }
        
        allPar += h;        
        allPar += ': ';
        
        // if (v[v.length-1] === ';') v = v.slice(0, -1)
        allPar += v;
        allPar += '</p>';


    }
    // allPar = format_2(allPar, clasT, clasV);
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

function print_atom_docx(table, head, dat){  

    let allPar = '';
   
    dist ="";
    for(let i=0; i<head.length; i++){
        if (head[i] === 'Позначка часу') {
            continue;
        }
        allPar += '';
        let h = head[i].trim()
        if (h[h.length-1] === ';'||h[h.length-1] === '.'||h[h.length-1] === ','||h[h.length-1] === ':') h = h.slice(0, -1)
        
        let v = dat[i]     
        if (v === ''||v === undefined) {
            continue;
        } 
        let rozzz = rozd_data[table][h]
        if(rozzz !== undefined){
            allPar +="\n"+ `${rozzz}`+"\n";
        }
        
        allPar += h;        
        allPar += ': ';
        
        // if (v[v.length-1] === ';') v = v.slice(0, -1)
        allPar += v;
        allPar += ''+"\n";


    }
    // allPar = format_2(allPar, clasT, clasV);
     dist += allPar;
    // text.innerHTML += format_2(allPar, clasT, clasV);
    dist = refactorText(dist);
    let sp_long = '                                  ';
    if (props['set_signature_teacher'] === true){
        tmp = 'З аналізом ознайомлений(на)  ' + sp_long + '  '
    } else tmp = '';
    
    if (props['set_signature_boss'] === true){
        tmp2 = props['boss_posada'] + sp_long + sp_long  + sp_long + sp_long + 
                '  ' + sp_long + props['boss_short'];
    } else tmp2 = '';

    dist +=`${tmp}`+"\n" +
                   ` ${tmp2}`+"\n"


                           
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

function createCard(dat) {
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


let dwmlFunc = (btn)=>{
    const dwnlds = document.querySelectorAll('.sel_table_id_dwnld');
    dwnlds.forEach(function(btn) {        
        btn.addEventListener('mouseup', e =>{
            //search row
            row = e.target.closest('tr')
            let numTable = parseInt(row.getAttribute('data-table'))
            let numRow = parseInt(row.getAttribute('data-row'))
            let c = 0
            let id_m = parseInt(btn.id.slice(9));
            let bal = 0
            let b;
            let maxBal = 0;
            let context = {'name_school': props['zaklad_name']};
            let text = print_atom_docx(numTable, glData[numTable].header[0], glData[numTable].data[numRow])
            context['text'] = text
            for (h of glData[numTable].header[0]){
                console.log(h)                
                let v = glData[numTable].data[numRow][c]
                if (v == undefined) v = ''
                console.log(v)
                
                if (h !== undefined && h.slice(0,1)>='1' && h.slice(0,1)<='9'){
                    b = parseInt(v)
                    bal += b;
                    maxBal += 4
                    let nam = 'c'+copyToSpaseAndRepl(h)+'_'+b;
                    context[nam] = '✓'
                } else {
                    context[ttlwddj[h]] = v
                }

                c++
            }

            
            


            // dd_keys.forEach(key => {                 
            //     let v = gl_data[id_m][key]["$t"]       
            //     let vopros = hh_ww_d[key]
            //     context[ttlwddj[vopros]] = v
            //     if (vopros !== undefined && vopros.slice(0,1)>='1' && vopros.slice(0,1)<='9'){
            //         b = parseInt(gl_data[id_m][key]["$t"])
            //         bal += b;
            //         maxBal += 4
            //         let nam = 'c'+copyToSpaseAndRepl(vopros)+'_'+b;
            //         context[nam] = '✓'
            //     }
            // });
            
            context['bal'] = bal
            if (bal<maxBal*.25) 
                riven = 'початковий';
            else if (bal<maxBal*.5) 
                riven = 'середній';
            else if (bal<maxBal*.75) 
                riven = 'достатній';
            else riven = 'високий';
            // if (bal<93) 
            //     riven = 'початковий';
            // else if (bal<133) 
            //     riven = 'середній';
            // else if (bal<173) 
            //     riven = 'достатній';
            // else riven = 'високий';

            
            context['file'] = glData[numTable]['templFile']
            context['riven'] = riven
            context['posada'] = 'Заступник директора \n' + props['zaklad_name_r_v']
      


            $.ajax({
                type : "POST",
                url : url+"getfileanalizt2/",
                data : context,
                cache: false,
                success: function(data){

                    document.location.href = url+"test/"+data+"/";

                }
            });


            console.log(id_m);
        });
    });
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
    slist = ['who', 
            'clas', 
            'subj',         
            'teach',
            // 'tema',
        ]
    for (x of slist){
        createList(data, x);
    }
    createListsDate(data);
}

let getNumHeader = (t, s)=>{
    let h = t.header[0]
    for(let col=0; col<h.length; col++){
        if (h[col] === s){
            return col
        }
    }
    return -1
}

//Створюємо списки для меню
let createList =(d, m)=>{
    // let h = d[numTable].header[0]
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
            'field': titleToKey('Клас'), 
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
            'field': titleToKey('Вчитель'), 
            'setName': teach, 
            'ulId': 'teach__menu__items_id', 
            'inputIdSelAll': 'teach_selAll_id', 
            'menu': 'menuTeach', 
            'inputId': 'f_chb', 

        },
        // 'tema': {
        //     'field': null, 
        //     'setName': tema, 
        //     'ulId': null, 
        //     'inputIdSelAll': null, 
        //     'menu': null, 
        //     'inputId': null, 

        // },

    };

    for(let numTable=0; numTable<d.length; numTable++){
        let header = d[numTable].header[0]
        let dat = d[numTable].data
        for(let col=0; col<header.length; col++){
            if (header[col] === "Хто відвідує урок") {
                for(let c=0; c<dat.length; c++){
                    who.add(dat[c][col])
                }
            } else
            if (header[col] === "Клас") {
                for(let c=0; c<dat.length; c++){
                    clas.add(dat[c][col])
                }
            } else
            if (header[col] === "Предмет") {
                for(let c=0; c<dat.length; c++){
                    subj.add(dat[c][col])
                }
            } else
            if (header[col] === "Вчитель") {
                for(let c=0; c<dat.length; c++){
                    teach.add(dat[c][col])
                }
            } else
            if (header[col] === "Дата проведення") {
                for(let c=0; c<dat.length; c++){
                    let day = dat[c][col].substr(0,2);
                    let month = dat[c][col].substr(3,2);
                    let year = dat[c][col].substr(6,4);
                    let dd = `${year}-${month}-${day}`;
                    date.add(dd)
                }
            }
        }
    }


    // for(let i=0; i<data.length; i++){
    //     let dpu = titleToKey('Дата проведення');
    //     if (data[i][dpu]['$t'][0] >= '0' && 
    //         data[i][dpu]['$t'][0] <= '3' ){
    //             mCL[m]['setName'].add(data[i][mCL[m]['field']]['$t'])
    //     }        
    // }
    //Сврорюємо меню для фільтрації obj
    // console.log(m)
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
    let t = 0
    for(n of date){
        // console.log(n);
    }
    let dateM = new Set()

    for (table of data){
        let s = 'Дата проведення'
        let numDateCol = getCol(data, t, s)
        if (numDateCol === undefined) continue
        for (dat of table.data){
            let s = dat[numDateCol];
            let day = s.substr(0,2);
            let month = s.substr(3,2);
            let year = s.substr(6,4);
            let d = `${year}-${month}-${day}`;
            dateM.add(d)
        }
        t++

    }

    // for(let i=0; i<data.length; i++){
    //     //TODO
    //     let s = data[i][titleToKey('Дата проведення')]['$t'];
    //     let day = s.substr(0,2);
    //     let month = s.substr(3,2);
    //     let year = s.substr(6,4);
    //     let d = `${year}-${month}-${day}`;
    //     if (d[0] >= '0' && d[0] <= '9' ) {
    //         date.add(d);
    //     }        
    // }
    let max = '2000-01-01';
    let min = '2100-01-01';
    let max_0 = '2000-01-01';
    let min_0 = '2100-01-01';
    for (d of dateM){
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
            w = w.replace('  ',' ')
            who = who.replace('  ',' ')
            // if (w === "ЗДНВР Ірина Ситюкова"&&who === w){
            //     console.log("ЗДНВР Ірина Ситюкова")
            // }
            if (who === w){
                //fWho = true;
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
            //row.style.display = "";
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

function titleToKey (title){
    let k;
    $.each(fieldNames, function(key, value){
        if (value["title"].slice(0,10) === title.slice(0,10)){
            k = value["key"];  
            return k;        
        }        
    })
    return k;
}



//  https://docs.google.com/forms/d/e/1FAIpQLSfpGUsPl_xmtbwOtRj9H1oYLwcqEyAUnCzcWzDsm3ESL6C6Vw/viewform?usp=sf_link
// 1fcFYlF6lz8Qf37Un_Q4dbx8H_36JTpm752m7AIRjHKI

let ttlwddj = {
        'Позначка часу'	:	"dateInput"	,
        'Хто відвідує урок'	:	"who"	,
        'Дата проведення'	:	"date"	,
        'Клас'	:	"cl"	,
        'Предмет'	:	"pr"	,
        'Кількість учнів (за списком)'	:	"klist"	,
        'Кількість учнів (присутніх)'	:	"kprez"	,
        'Кількість учнів за списком'	:	"klist"	,
        'Кількість учнів присутніх'	:	"kprez"	,
        'Вчитель'	:	"teacher"	,
        'Тема навчального заняття'	:	"tema"	,
        'Тема тижня'	:	"temaweek"	,
        'Обладнання'	:	"obladn"	,
        'Мета відвідування'	:	"meta"	,
        'Тип уроку'	:	"tip"	,
        'Примітка1'	:	"pr1"	,
        'Примітка2'	:	"pr2"	,
        'Примітка3'	:	"pr3"	,
        'Примітка4'	:	"pr4"	,
        'Примітка5'	:	"pr5"	,
        'Примітка6'	:	"pr6"	,
        'Примітка7'	:	"pr7"	,
        'Примітка8'	:	"pr8"	,
        'Примітка9'	:	"pr9"	,
        'Примітка10'	:	"pr10"	,
        'Примітка11'	:	"pr11"	,
        'Висновки та пропозиції'	:	"visn"	,  
        'Висновки'	:	"visn"	,  
        'Пропозиції'	:	"prop"	,  

}

function eqFirst10sym(s1, s2){
    s1 = s1.trim();
    s2 = s2.trim();
    return s1.slice(0,10) === s2.slice(0,10)
}

function copyToSpaseAndRepl(str){
    let to = str.search(' '); 
    return str.substring(0,to-1).split('.').join('_');
}

let dd_keys = []
let hh_ww_d = {}

function mkHeader(){    
    gl_data.forEach(element => {
        dd_keys = []
        if (element.normDate.charAt(0) !=="2"){
            dd_keys = Object.keys(element);
        } else {
            
        }
    });
    for (let i=0; i<gl_data.length;i++){
        Object.keys(gl_data[i]).forEach(el=>{
            hh_ww_d[el] = gl_data[i][el]['$t']
        })
    }
    // console.log(hh_ww_d)
}

// btn_print.addEventListener("click", ()=>{
//     const rows = document.querySelectorAll(".sel_table_id_cl");
//     text.innerText = "";
//     let i = 1;
//     let hdr = {}
//     j = 0
//     let bal = 0
//     let b;

//     for (elem of rows){        
//         if (elem.style.display === "" && elem.checked){
//             let rowId = "row_"+elem.id.slice(3);
//             let id_m = parseInt(rowId.slice(4));
 
//             let context = {'name_school': "Пробна школа"};
//             dd_keys.forEach(key => {                 
//                 let v = gl_data[id_m][key]["$t"]       
//                 let vopros = hh_ww_d[key]
//                 context[ttlwddj[vopros]] = v
//                 if (vopros !== undefined && vopros.slice(0,1)>='1' && vopros.slice(0,1)<='9'){
//                     b = parseInt(gl_data[id_m][key]["$t"])
//                     bal += b;
//                     let nam = 'c'+copyToSpaseAndRepl(vopros)+'_'+b;
//                     // console.log('nam ', nam)
//                     context[nam] = '✓'
//                 }
//             });
            
//             context['bal'] = bal
//             if (bal<93) 
//                 riven = 'початковий';
//             else if (bal<133) 
//                 riven = 'середній';
//             else if (bal<173) 
//                 riven = 'достатній';
//             else riven = 'високий';

//             context['riven'] = riven
//             context['posada'] = 'Заступник директора'
      


            
//             //let url = "http://127.0.0.1:5000/";
//             let url = "https://schooltools.pythonanywhere.com/";
//             $.ajax({
//                 type : "POST",
//                 url : url+"getfileanalizt/",
//                 data : context,
//                 // contentType: false,
//                 cache: false,
//                 success: function(data){
//                     // console.log(data)
//                     //alert("Скачую файл. Натисніть Ok");
//                     document.location.href = url+"test/"+data+"/";

//                 }
//             }); 
            
//         } 
//         i++;
//     } 
// })

function getCol(dat, numTable, name){
    header = dat[numTable].header[0]
    // console.log(header)
    // console.log(header.length)
    for (let col=0; col<header.length; col++){
        if (name === header[col]){
            return col
        }        
    }
    if (name == 'Клас'){
        return getCol(dat, numTable, 'Клас, група')
    } else
    if (name == 'Дата проведення'){
        return getCol(dat, numTable, 'Дата проведення уроку')
    } else
    if (name == 'Тема навчального заняття'){
        return getCol(dat, numTable, 'Тема уроку')
    } else
    if (name == 'Чий урок відвідує'){
        return getCol(dat, numTable, 'Вчитель')
    } else
    if (name == 'Вчитель'){
        return getCol(dat, numTable, 'Вчитель, урок якого відвідують')
    }
}


let fillTable = (table, dat, numTable, rrow, ii, d)=>{
    if (dat[numTable].data.length > 0){
        let dpu = titleToKey('Дата проведення');
        
        let row = document.createElement('tr');
        row.setAttribute('id','ii_'+String(ii));
        row.setAttribute('id','row_'+String(rrow));
        row.setAttribute('id','table_'+String(numTable));

        
        hHeader = ['Дата проведення', 'Хто відвідує урок', 'Вчитель', 'Клас', 'Предмет', 'Тема навчального заняття']
        
        table.append(row);

        for (let ci=0; ci<6; ci++){
            let x = document.createElement('td');
            x.classList.add('cel_def');
            x.classList.add('cel_def');
            col = getCol(dat, numTable, hHeader[ci])
            x.innerText=d[col]; 
            row.append(x);
        } 

        let cel7 = document.createElement('td');
        cel7.classList.add('cel_def');
        cel7.classList.add('cel_chb'); 

        row.setAttribute('data-teach', d[getCol(dat, numTable, 'Вчитель')]);
        row.setAttribute('data-clas', d[getCol(dat, numTable, 'Клас')]);
        row.setAttribute('data-subj', d[getCol(dat, numTable, 'Предмет')]);
        row.setAttribute('data-who', d[getCol(dat, numTable, 'Хто відвідує урок')]);
        row.setAttribute('data-table', String(numTable));
        row.setAttribute('data-row', String(rrow));

        let s = d[getCol(dat, numTable, 'Дата проведення')];
        let day = s.substr(0,2);
        let year = s.substr(6,4);
        let month = s.substr(3,2);
        s = `${year}-${month}-${day}`;
        row.setAttribute('data-date', s);
        let ul = document.querySelectorAll(".f_chb");
        row.classList.add('row_cl');
        cel7.innerHTML=`<div class="print_col_all"> 
        <div class="print_col_i"><img class="print_col_img" id="img_${String(ii)}" src="./assets/icons/eye.png"  title="Переглянути"></div>
                <div class="print_col_edit"><img class="print_col_img" id="img_edit_${String(ii)}" src="./assets/icons/editbtn.png"  title="Редагувати" disabled></div>
                <div class="print_col_dwnld"><img class="sel_table_id_dwnld" id="id_dwnld_${String(ii)}" src="./assets/icons/dwnld.png" title="Завантажити"></div>
            </div>`;
        row.append(cel7);
    }
}



let sortByDate = (arr)=>{
    arr.sort((a, b) =>  Date.parse(a['normDate']) > Date.parse(b['normDate']) ? 1 : -1);
}



let createTable = (d)=>{ 
    const table = document.getElementById("table__id");
    let ii = 0
    for(let numTable=0; numTable<d.length; numTable++){
        let header = d[numTable].header[0]
        let dat = d[numTable].data
        for(let row=0; row<dat.length; row++){
            fillTable(table, d, numTable, row, ii, dat[row])
            ii++
        }
    }

    

    let print_col_imges = document.querySelectorAll(".print_col_img");
    print_col_imges.forEach(function(el) {
        el.addEventListener('click', (e)=>{
            const iii = parseInt(e.target.id.slice(4))
            
            const parentRow = e.target.closest('tr');
            const numTable = parseInt(parentRow.getAttribute('data-table')) 
            const row = parseInt(parentRow.getAttribute('data-row')) 
            const head = glData[numTable].header[0]
            const dat = glData[numTable].data[row]
  
            // console.log(head)
            // let a = createCard (head, dat);
            let b = print_atom(numTable, head, dat);
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
    loadFilters();

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



let readAnaliz = (s2)=>{    
    $.getJSON(url + 'getmultiblock/'+key,        
       function (data) {
            console.log(data)  
            glData = data   
            createLists(data);   
            createTable(data);   
            dwmlFunc();
        }
    );   
}

readStorage();

//TODO ---- devmode
//key = "1uOV_IJaMbe41dOBiSeYHrwhOfR7kUix8b9QhFK2oBeE"

readAnaliz(sheet2);



