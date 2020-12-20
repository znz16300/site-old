var d1 = "";
let data_table = {};


let sheet2 = "default";
let title_st = '';
let key = '1VQq2KHHgf_rLtNMzyh9LETjbdSSmkpZRjAvbr9kdkjY';

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
        for (let i=3; i<data.length;i++){
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

            createTable(data);

            // createCards(data);       

        }       
    );    

}

const btn_print = document.getElementById("btn__print_id");
const btn_teach = document.getElementById("id_table_teach");
btn_print.addEventListener("click", ()=>{
    
});

btn_print.addEventListener("click", ()=>{
    text.innerText = "";
    for (let i=3; i<gl_data.length; i++){
        let c = document.getElementById("id_"+String(i));
        if (c.checked){
            createCard(gl_data[i]);
        }
    }

    
})

function createTable(data){
    console.log(data);
    const table = document.getElementById("table__id");
    for (let i=3; i<data.length; i++){
        let row = document.createElement('tr');
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
        
        cel1.innerText=data[i]['gsx$датапроведенняуроку']['$t'];
        cel2.innerText=data[i]['gsx$хтовідвідуєурок']['$t'];
        cel3.innerText=data[i]['gsx$вчительурокякоговідвідують']['$t'];
        cel4.innerText=data[i]['gsx$класгрупа']['$t'];
        cel6.innerText=data[i]['gsx$темауроку']['$t'];
        cel5.innerText=data[i]['gsx$предмет']['$t'];
        cel7.innerHTML=`
            <input id="id_${String(i)}" type="checkbox">
        `;

        row.append(cel1, cel2, cel3, cel4, cel5, cel6, cel7)
        table.append(row);

    }
    
 


}

readPage();
// createCards(data);

