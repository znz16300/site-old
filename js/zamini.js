let key = "1gIGSxWp-DQ6Cm5KiB-Z76gj4YyN0crjseQQgCetDCtY";
let sheet1 = "1";
let sheet2 = "1";
let sheetDate = "3";
let data;
let data_zn;
let workDaysDate = [];

let fields = {
    0: 'gsx$_cn6ca',
}
let missing_teachers = []
let allTeachers = []

const add_miss_button = document.getElementById("add_miss_button_id");
const clear_all_miss_button = document.getElementById("clear_all_miss_button_id");
const calc_button = document.getElementById("calc_button_id");
const miss_teach = document.getElementById("miss_teach_id");
const date_start = document.getElementById("date_start");
const date_finish = document.getElementById("date_finish");
const date_out_start = document.getElementById("date_out_start");
const date_out_finish = document.getElementById("date_out_finish");
const reason = document.getElementById("reason_id");
const table = document.getElementById("table_id");

clear_all_miss_button.addEventListener('click', (e)=>{
    let p = confirm('Очистити всю таблицю,');
    if (p){
        missing_teachers = [];
        window.localStorage.setItem('missing_teachers',
            JSON.stringify(missing_teachers)); 
        let rows_data = document.querySelectorAll('.row_data');
        for (row of rows_data){
            row.remove();
        }
    }

    
})

let dateStr_to_numDay = (d)=>{
    return Date.parse(d)/24/3600/1000;
}
let numDay_to_dateStr = (d)=>{
    return new Date(d*24*3600*1000);
}
let isInWorkDaysDate = (i)=>{
    for (wd of workDaysDate){
        if (wd.date === numDay_to_dateStr(i).toLocaleDateString("fr-CA") && wd.ch_zn !== ""){
            return true;
        }
    }
    return false;
}



calc_button.addEventListener('click', ()=>{
    saveSettings();
    let d1 = dateStr_to_numDay(date_out_start.value);
    let d2 = dateStr_to_numDay(date_out_finish.value);
    for (let i=d1; i<=d2; i++){
        if (isInWorkDaysDate(i)){
            for (row of missing_teachers){
                let t_d1 = dateStr_to_numDay(row['dateSt']);
                let t_d2 = dateStr_to_numDay(row['dateFin']);            
                
                if (t_d1 <= i &&  i <= t_d2){
                    console.log(row.teach, numDay_to_dateStr(i));
                }
            }

        }
     

    }
})

add_miss_button.addEventListener('click', (e)=>{
    if (miss_teach.value !== "" &&
        date_start.value !== "" &&
        date_finish.value !== "" &&
        reason.value !== ""){
        missing_teachers.push({
            'teach': miss_teach.value,
            'dateSt': date_start.value,
            'dateFin': date_finish.value,
            'reason': reason.value,
        })
        console.log(missing_teachers)
        let d1 = date_start.value.slice(8, 10) + '.' + date_start.value.slice(5, 7);
        let d2 = date_finish.value.slice(8, 10) + '.' + date_finish.value.slice(5, 7);

        fillRowTable(miss_teach.value, d1, d2, reason.value, '-')
        saveSettings();

        miss_teach.value = "";
        date_start.value = "";
        date_finish.value = "";
        reason.value = "";
        window.localStorage.setItem('missing_teachers',
        JSON.stringify(missing_teachers));   
             
    }
    

})

let saveSettings = ()=>{
    let d1 = date_start.value;
    let d2 = date_finish.value;
    let d3 = date_out_start.value;
    let d4 = date_out_finish.value;
    window.localStorage.setItem('d1', d1);
    window.localStorage.setItem('d2', d2);
    window.localStorage.setItem('d3', d3);
    window.localStorage.setItem('d4', d4);
}
let loadSettings = ()=>{
    let d1 = window.localStorage.getItem('d1');
    let d2 = window.localStorage.getItem('d2');
    let d3 = window.localStorage.getItem('d3');
    let d4 = window.localStorage.getItem('d4');
    if (d1 === null){
        d1 = '2000-01-01';
    }
    if (d2 === null){
        d2 = '2000-01-01';
    }
    if (d3 === null){
        d3 = '2000-01-01';
    }
    if (d4 === null){
        d4 = '2000-01-01';
    }
    date_start.value = d1;
    date_finish.value = d2;
    date_out_start.value = d3;
    date_out_finish.value = d4;

}

let readPage_this = ()=>{
    let url  = "https://spreadsheets.google.com/feeds/list/"+key+"/"+sheet1+"/public/values?alt=json"
    $.getJSON(url,        
        function (data) {
            data = data['feed']['entry'];       
            // console.log(data);
            for (row of data){
                let k = row[fields[0]];
                if (k !== undefined){
                    allTeachers.push(k.$t);
                    let cel1 = document.createElement('option');
                    cel1.innerText=`${k.$t}`;
                    miss_teach.append(cel1);
                }                    
            }           
        }       
    );  
    url  = "https://spreadsheets.google.com/feeds/list/"+key+"/"+sheet2+"/public/values?alt=json"
    $.getJSON(url,        
        function (data) {
            data_zn = data['feed']['entry'];       
        }       
    );  
    url  = "https://spreadsheets.google.com/feeds/list/"+key+"/"+sheetDate+"/public/values?alt=json"
    $.getJSON(url,        
        function (data) {
            data = data['feed']['entry'];
                 
            for (let i=1; i<500; i++){
                let x = data[0]['gsx$day'+parseInt(i)];
                let ch_zn = data[2]['gsx$day'+parseInt(i)];
                if (x !== null && ch_zn !== undefined){
                    workDaysDate.push(
                        {
                            'date': x['$t'],
                            'ch_zn': ch_zn['$t'],                         
                        })
                }
            }
        }       
    );   
}

let fillRowTable = (a,b,c,d,e)=>{
    let cel1 = document.createElement('td');
    let cel2 = document.createElement('td');
    let cel3 = document.createElement('td');
    let cel4 = document.createElement('td');
    let cel5 = document.createElement('td');
    cel1.classList.add('s_1');
    cel2.classList.add('s_1');
    cel3.classList.add('s_1');
    cel4.classList.add('s_1');
    cel5.classList.add('s_1');
    cel1.innerText=a;
    cel2.innerText=b;
    cel3.innerText=c;
    cel4.innerText=d;
    cel5.innerHTML=`
    <div class="btn_update_delete">
        <div  id="del_id"  title="вилучити">-</div>
        <div  id="edit_id" title="редагувати">~</div>
    </div>
    `;


    let row = document.createElement('tr');
    row.classList.add('row_data');
    table.append(row);
    row.append(cel1, cel2, cel3, cel4, cel5);
    // document.getElementById("del_id").addEventListener('click', ()=>{
    //     console.log('dddddddd');
    // })
    // document.getElementById("edit_id").addEventListener('click', ()=>{
    //     console.log('eeeeeeee');
    // })
}



let fillTable = ()=>{
    for (teach of missing_teachers){
        let d1 = teach.dateSt.slice(8, 10) + '.' + teach.dateSt.slice(5, 7);
        let d2 = teach.dateFin.slice(8, 10) + '.' + teach.dateFin.slice(5, 7);

        fillRowTable(teach.teach, d1, d2, teach.reason,'-')
    }
}

let readStorage = ()=>{    
    k = window.localStorage.getItem("missing_teachers");
    if (k !== null) {
        missing_teachers = JSON.parse(k);            
    }    
    fillTable();
}


loadSettings();
readStorage();
readPage_this();

