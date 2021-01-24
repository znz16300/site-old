let key = "1gIGSxWp-DQ6Cm5KiB-Z76gj4YyN0crjseQQgCetDCtY";
let idSheetMissTable = "missingbook";
let sheet1 = "1";
let sheet2 = "2";
let sheetDate = "3";
let rowEdit = undefined;
let teachNum = undefined;

let sheetIdMiss = 1520665800;
// let data_ch;
// let data_zn;
let timeTable = {1: undefined, 2: undefined}

let workDaysDate = [];

let fields = {
    0: 'gsx$teach',
}
let missing_teachers = []
let allTeachers = []
const dWeek = {
    '1': 'mo',
    '2': 'tu',
    '3': 'we',
    '4': 'th',
    '5': 'fr',
}; 

const add_miss_button = document.getElementById("add_miss_button_id");
const cancel_miss_button = document.getElementById("cancel_miss_button_id");
const clear_all_miss_button = document.getElementById("clear_all_miss_button_id");
const calc_button = document.getElementById("calc_button_id");
const copy_button = document.getElementById("copy_button_id");
const miss_teach = document.getElementById("miss_teach_id");
const open_button = document.getElementById("open_button_id");
const date_start = document.getElementById("date_start");
const date_finish = document.getElementById("date_finish");
const date_out_start = document.getElementById("date_out_start");
const date_out_finish = document.getElementById("date_out_finish");
const date_pz_start = document.getElementById("date_pz_start");
const date_pz_finish = document.getElementById("date_pz_finish");
const reason = document.getElementById("reason_id");
const table = document.getElementById("table_id");
const output = document.getElementById("output_id");
const url_client = document.getElementById("url_client_id");
const sett_pz = document.getElementById("sett_pz_id");
const pz_button = document.getElementById("pz_button_id");



pz_button.addEventListener("click", (e)=>{
    let data = {}
    data['date_start'] = date_pz_start.value;
    data['date_finish'] = date_pz_finish.value;
    data['idmisstable'] = key;
    data['namesheetmisstable'] = idSheetMissTable;

    // jQuery.ajax({
    //     url: "http://127.0.0.1:5000/createpz/",
    //     // url: "http://zelenskiy.pythonanywhere.com/createpz/",
    //     type: "POST",
    //     cache: false,
    //     data: data,
    //     error: function () {
    //         console.log("Щось не те ... ");
    //     },
    //     success: function () {
    //         console.log("success");
    //     }
    // });

    saveSettings();
})

date_pz_start.addEventListener("change", (e)=>{

    saveSettings();
})
date_pz_finish.addEventListener("change", (e)=>{

    saveSettings();
})
date_out_start.addEventListener("change", (e)=>{

    saveSettings();
})
date_out_finish.addEventListener("change", (e)=>{

    saveSettings();
})

open_button.addEventListener('click', (e)=>{
    //https://docs.google.com/spreadsheets/d/1gIGSxWp-DQ6Cm5KiB-Z76gj4YyN0crjseQQgCetDCtY/edit#gid=1520665800&range=A893
    let url = "https://docs.google.com/spreadsheets/d/" + key + 
              "/edit#gid="+String(sheetIdMiss)+"&range=A893";
    window.open(url);
})

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


cancel_miss_button.addEventListener('click', ()=>{
    console.log(missing_teachers);
    miss_teach.value = "";
    date_start.value = "";
    date_finish.value = "";
    reason.value = "";
    add_miss_button.innerText = "Додати";
    document.querySelectorAll(".row_data").forEach(el =>{
        el.style.backgroundColor = "#f3eac2";
    })
    document.getElementById("row"+String(rowEdit)).style.backgroundColor = "#f3eac2";
    rowEdit === undefined;
    teachNum === undefined;
})

calc_button.addEventListener('click', ()=>{
    saveSettings();
    let s = "";
    let d1 = dateStr_to_numDay(date_out_start.value);
    let d2 = dateStr_to_numDay(date_out_finish.value);
    for (let i=d1; i<=d2; i++){
        if (isInWorkDaysDate(i)){
            for (row of missing_teachers){
                let t_d1 = dateStr_to_numDay(row['dateSt']);
                let t_d2 = dateStr_to_numDay(row['dateFin']); 
                //Визначаємо номер рядка з вчителем
                let numRow;
                for (t of allTeachers){
                    if (t.teach === row.teach){
                        numRow = t.numRow;
                    }
                }
                if (t_d1 <= i &&  i <= t_d2){
                    // console.log(row.teach, numDay_to_dateStr(i));
                    let dd = chZnFind(i);
                    let cz = dd.ch_zn;
                    for (let j=0; j<11; j++){
                       let k = 'gsx$'+dWeek[dd.week]+String(j);
                       if (timeTable[cz][numRow][k] !== undefined){
                           if (timeTable[cz][numRow][k]['$t'] !== ""){
                                let dateOut = numDay_to_dateStr(i).toLocaleDateString("fr-CA");
                                let teacher = row.teach;
                                let date = dateOut.slice(8)+"."+dateOut.slice(5,7)+"."+dateOut.slice(0,4);
                                let subj = timeTable[cz][numRow][k]['$t'];    //Предмет
                                let clas = timeTable[cz][numRow+1][k]['$t'];  //Клас
                                let reason = row.reason; //Причина
                                let numLesson = String(j); //Номер урока
                                s += "\t" + date + "\t" + fioToFin(teacher) + "\t" + 
                                    reason + "\t" + subj + "\t" +
                                    clas  + "\t\t\t\t" +  numLesson + '\n';
                           }
                       }
                    }
                    
                }
            }

        }    

    }
    output.innerHTML = s;
})


copy_button.addEventListener("click", ()=>{
    let range = document.createRange();
    range.selectNode(output); 
    window.getSelection().addRange(range); 
    try { 
      document.execCommand('copy'); 
    } catch(err) { 
      console.log('Can`t copy, boss'); 
    } 
    window.getSelection().removeAllRanges();
    

})

add_miss_button.addEventListener('click', (e)=>{
    let numRow = '';
    for (t of allTeachers){
        if (t.teach ===miss_teach.value ){
            numRow = t.numRow;
        }
    }
    if (miss_teach.value !== "" &&
        date_start.value !== "" &&
        date_finish.value !== "" &&
        reason.value !== ""){
        let d1 = date_start.value;
        let d2 = date_finish.value;

        

        if (rowEdit === undefined){
            missing_teachers.push({
                'idTeach': numRow,
                'teach': miss_teach.value,
                'dateSt': date_start.value,
                'dateFin': date_finish.value,
                'reason': reason.value,
            })
            fillRowTable(miss_teach.value, d1, d2, reason.value, '-', numRow, missing_teachers.length - 1)
        } else {
            console.log(missing_teachers[teachNum]);
            missing_teachers[teachNum].teach = miss_teach.value;
            missing_teachers[teachNum].dateSt = date_start.value;
            missing_teachers[teachNum].dateFin = date_finish.value;
            missing_teachers[teachNum].reason = reason.value;

            rowEdit.childNodes[0].innerText = miss_teach.value;                
            rowEdit.childNodes[1].innerText = dateToShort(date_start.value);
            rowEdit.childNodes[2].innerText = dateToShort(date_finish.value);
            rowEdit.childNodes[3].innerText = reason.value;
            rowEdit.style.backgroundColor = "#91A3CA";
        }

        
        saveSettings();

        miss_teach.value = "";
        date_start.value = "";
        date_finish.value = "";
        reason.value = "";
        add_miss_button.innerText = "Додати";
        rowEdit = undefined;
        teachNum = undefined;
        window.localStorage.setItem('missing_teachers',
        JSON.stringify(missing_teachers));   
             
    }
    

})


let fioToFin = (fio)=>{
    let ss = fio.split(" ");
    return ss[0] + ' ' + ss[1][0] + "." + ss[2][0] + ".";
}
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

let chZnFind = (nmDay)=>{
    for (d of workDaysDate){
        if (dateStr_to_numDay(d.date) === nmDay){
            return d;
        }
    }
    return '';
}

let saveSettings = ()=>{
    let d1 = date_start.value;
    let d2 = date_finish.value;
    let d3 = date_out_start.value;
    let d4 = date_out_finish.value;
    let d5 = date_pz_start.value;
    let d6 = date_pz_finish.value;
    window.localStorage.setItem('d1', d1);
    window.localStorage.setItem('d2', d2);
    window.localStorage.setItem('d3', d3);
    window.localStorage.setItem('d4', d4);
    window.localStorage.setItem('d5', d5);
    window.localStorage.setItem('d6', d6);
}
let loadSettings = ()=>{
    let d1 = window.localStorage.getItem('d1');
    let d2 = window.localStorage.getItem('d2');
    let d3 = window.localStorage.getItem('d3');
    let d4 = window.localStorage.getItem('d4');
    let d5 = window.localStorage.getItem('d5');
    let d6 = window.localStorage.getItem('d6');
    if (d1 === null){
        d1 = '2021-01-01';
    }
    if (d2 === null){
        d2 = '2021-01-01';
    }
    if (d3 === null){
        d3 = '2021-01-01';
    }
    if (d4 === null){
        d4 = '2021-01-01';
    }
    if (d5 === null){
        d5 = '2021-01-01';
    }
    if (d6 === null){
        d6 = '2021-01-01';
    }
    date_start.value = d1;
    date_finish.value = d2;
    date_out_start.value = d3;
    date_out_finish.value = d4;
    date_pz_start.value = d5;
    date_pz_finish.value = d6;

}

let readPage_this = ()=>{
    let url  = "https://spreadsheets.google.com/feeds/list/"+key+"/"+sheet1+"/public/values?alt=json"
    $.getJSON(url,        
        function (data) {
            timeTable[1] = data['feed']['entry'];       
            // console.log(data);
            let i = 0;
            miss_teach.innerHTML = `<option ></option>`;
            for (row of timeTable[1]){
                let k = row[fields[0]];
                if (k !== undefined && k['$t'] !== ""){
                    allTeachers.push({'teach': k.$t, 'numRow': i});
                    let cel1 = document.createElement('option');
                    cel1.innerText=`${k.$t}`;
                    miss_teach.append(cel1);
                }  
                i++;
            } 
            fillTable();           
        }       
    );  
    url  = "https://spreadsheets.google.com/feeds/list/"+key+"/"+sheet2+"/public/values?alt=json"
    $.getJSON(url,        
        function (data) {
            timeTable[2] = data['feed']['entry'];       
        }       
    );  
    url  = "https://spreadsheets.google.com/feeds/list/"+key+"/"+sheetDate+"/public/values?alt=json"
    $.getJSON(url,        
        function (data) {
            data = data['feed']['entry'];
                 
            for (let i=1; i<500; i++){
                let x = data[0]['gsx$day'+parseInt(i)];
                let w = data[1]['gsx$day'+parseInt(i)];
                let ch_zn = data[2]['gsx$day'+parseInt(i)];
                if (x !== null && ch_zn !== undefined){
                    workDaysDate.push(
                        {
                            'date': x['$t'],
                            'week': w['$t'],
                            'ch_zn': ch_zn['$t'],                         
                        })
                }
            }
        }       
    );  
    
}

let fillRowTable = (a,b,c,d,e,id, idMiss)=>{
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
    cel2.innerText=dateToShort(b);
    cel3.innerText=dateToShort(c);
    cel4.innerText=d;
    cel5.innerHTML=`
    <div class="btn_update_delete">
        <button class="del_edit" id="del__${String(id)}"  title="вилучити">-</button>
        <button class="del_edit" id="edit_${String(id)}" title="редагувати">~</button>
    </div>
    `;


    let row = document.createElement('tr');
    row.classList.add('row_data');
    row.setAttribute('id', 'row'+String(id))
    row.setAttribute('data-num-row', String(idMiss))
    table.append(row);
    row.append(cel1, cel2, cel3, cel4, cel5);
    document.getElementById("del__"+String(id)).addEventListener('click', ()=>{
        console.log('dddddddd');
        // document.getElementById("row"+String(id)).style.backgroundColor = "red";
        let cnf = confirm(`Вилучити дані про ${a} за ${b}?`);
        if (cnf){
            //Вилучеємо дані з missing_teachers
            console.log(missing_teachers);
            removeMiss(a);
            console.log(missing_teachers);
            //Вилучеємо дані з таблиці
            document.getElementById("row"+String(id)).remove();
            saveSettings();
            window.localStorage.setItem('missing_teachers',
                JSON.stringify(missing_teachers));
        }else {
            // document.getElementById("row"+String(id)).style.backgroundColor = "";
        }
    })
    document.getElementById("edit_"+String(id)).addEventListener('click', ()=>{
        rowEdit = document.getElementById("row"+String(id));
        rowEdit.style.backgroundColor = "green";
        add_miss_button.innerText = "Змінити";
        miss_teach.value = a;
        date_start.value = (b);
        date_finish.value = (c);
        reason.value = d;
        
        teachNum = parseInt(rowEdit.getAttribute('data-num-row'));
    })
}

let removeMiss = (teacher)=>{
    let i = 0;
    for (t of missing_teachers){
        if (t.teach === teacher){
            missing_teachers.splice(i,1);
            return 0;
        }
        i++;
    }
    return 1;
}

let dateToShort = (d)=>{
    return d.slice(8, 10) + '.' + d.slice(5, 7);
}

let fillTable = ()=>{
    let i = 0;
    for (teach of missing_teachers){
        let d1 = teach.dateSt;
        let d2 = teach.dateFin;
        // let d1 = teach.dateSt.slice(8, 10) + '.' + teach.dateSt.slice(5, 7);
        // let d2 = teach.dateFin.slice(8, 10) + '.' + teach.dateFin.slice(5, 7);

        let numRow = '';
        for (t of allTeachers){
            if (t.teach ===teach.teach ){
                numRow = t.numRow;
            }
        }
        fillRowTable(teach.teach, d1, d2, teach.reason,'-', numRow, i);
        i++;
    }
}

let readStorage = ()=>{    
    k = window.localStorage.getItem("missing_teachers");
    if (k !== null) {
        missing_teachers = JSON.parse(k);            
    }    
    
}

url_client.value = window.location.href 
console.log(window.location.href )
loadSettings();
readStorage();
readPage_this();

