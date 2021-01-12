let key = "1gIGSxWp-DQ6Cm5KiB-Z76gj4YyN0crjseQQgCetDCtY";
let sheet2 = "1";

let fields = {
    0: 'gsx$_cn6ca',
}
let missing_teachers = []
let allTeachers = []

const add_miss_button = document.getElementById("add_miss_button_id");
const clear_all_miss_button = document.getElementById("clear_all_miss_button_id");
const miss_teach = document.getElementById("miss_teach_id");
const date_start = document.getElementById("date_start");
const date_finish = document.getElementById("date_finish");
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
        fillRowTable(miss_teach.value, date_start.value, date_finish.value, reason.value, '-')

        miss_teach.value = "";
        date_start.value = "";
        date_finish.value = "";
        reason.value = "";
        window.localStorage.setItem('missing_teachers',
        JSON.stringify(missing_teachers));        
    }
    

})

let readPage = ()=>{
    let url  = "https://spreadsheets.google.com/feeds/list/"+key+"/"+sheet2+"/public/values?alt=json"
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

    


}

let fillRowTable = (a,b,c,d,e)=>{
    let cel1 = document.createElement('td');
    let cel2 = document.createElement('td');
    let cel3 = document.createElement('td');
    let cel4 = document.createElement('td');
    let cel5 = document.createElement('td');
    cel1.innerText=a;
    cel2.innerText=b;
    cel3.innerText=c;
    cel4.innerText=d;
    cel5.innerText=e;
    let row = document.createElement('tr');
    row.classList.add('row_data');
    table.append(row);
    row.append(cel1, cel2, cel3, cel4, cel5);
}

let fillTable = ()=>{
    for (teach of missing_teachers){
        fillRowTable(teach.teach, teach.dateSt, teach.dateFin, teach.reason,'-')
    }
}

let readStorage = ()=>{    
    k = window.localStorage.getItem("missing_teachers");
    if (k !== null) {
        missing_teachers = JSON.parse(k);    
        
    }    
    fillTable();
}

readStorage();
readPage();

