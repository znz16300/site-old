const keyZamini = '1obSD_Q_w6ZXVAfMmJyXsGkf12VqDWjdhLDwARsd9Ujk';
const server = 'https://schooltools.pythonanywhere.com/';


const currentDate = new Date();
const date = currentDate.getDate();
const month = currentDate.getMonth() + 1;
const year = currentDate.getFullYear();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const dayOfWeek = currentDate.getDay();
const days = ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"];
const dayName = days[dayOfWeek];

let timeTable = {1: undefined, 2: undefined}

let workDaysDate = [];

let fields = {
    0: 'gsx$teach',
}
let missing_teachers = []
let allTeachers = []
let les_count = 12;
const dWeek = {
    '1': 'mo',
    '2': 'tu',
    '3': 'we',
    '4': 'th',
    '5': 'fr',
    '6': 'st',
}; 

const teacherList = document.getElementById("teach_id");
const datBlock =document.querySelector('#date_block')



const readPageTt = ()=>{
    //Визначаємо номер тижні (чисельник/знаменник)
    
    let shName = 'week1';
    let url = server + 'gettimetable/'+keyZamini+'/'+shName;
    
    request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400){
        data = JSON.parse(request.responseText);  
        timeTable[1] = data['feed']['entry'];   
        console.log(timeTable[1]);    
            let lessons = timeTable[1][1]
            let max = -1;
            for (var item in lessons) {
                if (item.slice(0,6) === 'gsx$mo'){ 
                    let n = parseInt(lessons[item]['$t']);
                    if (n > max){max = n};}
            }
            les_count = max;
            let i = 0;
            teacherList.innerHTML = `<option ></option>`;
            for (row of timeTable[1]){
                let k = row[fields[0]];
                if (k !== undefined && k['$t'] !== ""){
                    allTeachers.push({'teach': k.$t, 'numRow': i});
                    let cel1 = document.createElement('option');
                    cel1.innerText=`${k.$t}`;
                    teacherList.append(cel1);
                }  
                i++;
            } 
            // fillTable();
      } else {
        console.log('Upps ');
      }
    };
    request.onerror = function() {
      // There was a connection error of some sort
    };
    request.send();

    shName = 'week2';
    url = server + 'gettimetable/'+keyZamini+'/'+shName;
    request2 = new XMLHttpRequest();
    request2.open('GET', url, true);
    request2.onload = function() {
    if (request2.status >= 200 && request2.status < 400){
         data = JSON.parse(request2.responseText);  
         timeTable[2] = data['feed']['entry'];   
         console.log(timeTable[2]);    
         let lessons = timeTable[2][1]

         let max = -1;
         for (var item in lessons) {
             if (item.slice(0,6) === 'gsx$mo'){ 
                 let n = parseInt(lessons[item]['$t']);
                 if (n > max){max = n};
            }
         }
         les_count = max+1;
         let i = 0;
         teacherList.innerHTML = `<option ></option>`;
         for (row of timeTable[2]){
             let k = row[fields[0]];
            if (k !== undefined && k['$t'] !== ""){
                allTeachers.push({'teach': k.$t, 'numRow': i});
                let cel1 = document.createElement('option');
                cel1.innerText=`${k.$t}`;
                teacherList.append(cel1);
            }  
            i++;
        } 
        // fillTable();
    } else {
        console.log('Upps ');
      }
    };
    request2.onerror = function() {
      // There was a connection error of some sort
    };
    request2.send();

    sheetDate = "workdays";
    url = server + 'getwd/'+keyZamini+'/'+sheetDate;
    request3 = new XMLHttpRequest();
    request3.open('GET', url, true);
    request3.onload = function() {
      if (request3.status >= 200 && request3.status < 400){
        data = JSON.parse(request3.responseText);  
        data = data['feed']['entry']; 
        //console.log(data);
        for (let i=1; i<500; i++){
            
            let x = data[1]['gsx$day_'+parseInt(i)];
            let w = data[2]['gsx$day_'+parseInt(i)];
            let ch_zn = data[3]['gsx$day_'+parseInt(i)];
            if (x !== null && ch_zn !== undefined){
                workDaysDate.push(
                    {
                        'date': x['$t'],
                        'week': w['$t'],
                        'ch_zn': ch_zn['$t'],                         
                    })
            }
        }


      } else {
        console.log('Upps ');
      }
    };
    request3.onerror = function() {
      // There was a connection error of some sort
    };
    request3.send();

    
}



const s = "Поточна дата: " + date + "." + month + "." + year + " " + 
          "Поточний час: " + hours + ":" + minutes + "<br>" +
          "День тижня: " + dayName;

datBlock.innerHTML = s
readPageTt()
