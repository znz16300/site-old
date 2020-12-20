var d1 = "";
let data_table = {};
let teach =  new Set();

let sheet2 = "default";
let title_st = '';
let key = '1VQq2KHHgf_rLtNMzyh9LETjbdSSmkpZRjAvbr9kdkjY';

const btn_print = document.getElementById("btn__print_id");
const btn_teach = document.getElementById("id_table_teach");
var menu = document.querySelector(".context-menu");

var menuState = 0;
var active = "context-menu--active";

const btn_close_menu = document.getElementById('btn_close_menu');


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
            



            // createCards(data);       

        }       
    );    

}

//Створюємо списки для меню
function createLists(data){
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

function filtrClick(e) {
    const table = document.getElementById('table_id');
    let ul = document.querySelectorAll(".f_chb");
    const rows = document.querySelectorAll(".row_cl");
    
    for(inp of ul) {
        let ch = inp.checked;
        let t = inp.getAttribute('data-1');
        for(row of rows){
            if (t === row.getAttribute('data-name')){
                if (ch){
                    row.style.display = "" 
                } else {
                    row.style.display = "none";
                }
            }
        }
    } 

}

   
function toggleMenuOn() {
    if ( menuState !== 1 ) {
        menuState = 1;
        menu.classList.add(active);
    } else {
        menuState = 0;
        menu.classList.remove(active);
    }
}

btn_teach.addEventListener("click", (e)=>{
    menuClick(e);
});

function menuClick(e){
    let btn = e.target;
    let pos = btn.getBoundingClientRect();
    let x = parseInt(pos['x']);
    let y = parseInt(pos['y']);
    console.log(menu);
    menu.style.setProperty('left', String(x+15)+'px')
    menu.style.setProperty('top', String(y+40)+'px')
    toggleMenuOn();
}


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
    let row = document.createElement('tr');
    row.setAttribute('id','row_'+String(i));
    cel1.innerText=d['gsx$датапроведенняуроку']['$t'];    
    cel2.innerText=d['gsx$хтовідвідуєурок']['$t'];
    cel3.innerText=d['gsx$вчительурокякоговідвідують']['$t'];
    cel4.innerText=d['gsx$класгрупа']['$t'];
    cel5.innerText=d['gsx$предмет']['$t'];
    cel6.innerText=d['gsx$темауроку']['$t'];
    row.setAttribute('data-name', d['gsx$вчительурокякоговідвідують']['$t']);
    //row.style.display = "none";
    // row.style.display = "";
    // row.style.display.remove;

    let ul = document.querySelectorAll(".f_chb");
    
    // for(inp of ul) {
    //     let t = inp.getAttribute('data-1');
    //     if (t === d['gsx$вчительурокякоговідвідують']['$t']){
    //         row.style.display = "none"
    //     } else {
    //     }
    // }

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

