const urlMy = window.location.href;
console.log(urlMy);
const keyZamini = urlMy.split("id=")[1];

const server = "https://zelenskiy.pythonanywhere.com/";

const currentDate = new Date();
const date = currentDate.getDate();
const month = currentDate.getMonth() + 1;
const year = currentDate.getFullYear();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const dayOfWeek = currentDate.getDay();
const days = [
  "Неділя",
  "Понеділок",
  "Вівторок",
  "Середа",
  "Четвер",
  "П'ятниця",
  "Субота",
];
const dayName = days[dayOfWeek];

let timeTable = { 1: undefined, 2: undefined };
let timeTableClas = { 1: undefined, 2: undefined };

let workDaysDate = [];

let fields = {
  0: "gsx$teach",
};
let fieldsClas = {
  0: "gsx$clas",
};
let missing_teachers = [];
let allTeachers = [];
let allClases = [];
let les_count = 12;
const dWeek = {
  1: "mo",
  2: "tu",
  3: "we",
  4: "th",
  5: "fr",
  6: "st",
};

const teacherList = document.getElementById("teach_id");
const clasList = document.getElementById("clas_id");
const datePicker = document.getElementById("date_id");
const lessList = document.getElementById("less_id");
const datBlock = document.querySelector(".date_block");
const title = document.querySelector(".title");
const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");


let day = {chZn: 0, dWeek: 0};

function shiftDate(dateInput, step) {  
  let currentDate = new Date(dateInput.value);
  currentDate.setDate(currentDate.getDate() - step);
  let previousDate = currentDate.toISOString().split('T')[0];
  dateInput.value = previousDate;
}


btnLeft.addEventListener('click', () => {
  shiftDate(datePicker, 1);
  const tWD = getData(glData, 'workdays')['data'];
  day  = getDataByDate(tWD, datePicker.value);
  if (teacherList.value !== '')
    showTT(teacherList, ['week1', 'week2']);
  else
    showTT(clasList, ['week1 (clas)', 'week2 (clas)']);

});

btnRight.addEventListener('click', () => {
  shiftDate(datePicker, -1);
  const tWD = getData(glData, 'workdays')['data'];
  day  = getDataByDate(tWD, datePicker.value);
  if (teacherList.value !== '')
    showTT(teacherList, ['week1', 'week2']);
  else
    showTT(clasList, ['week1 (clas)', 'week2 (clas)']);
});

datePicker.addEventListener('change', () => {
  const tWD = getData(glData, 'workdays')['data'];
  day  = getDataByDate(tWD, datePicker.value);
  showTT(teacherList, ['week1', 'week2']);
})

function showTT(listD, tables){
  lessList.innerHTML = '<li value=""></li>';
  const selectedOption = listD.options[listD.selectedIndex];
  const surname = selectedOption.text;
  // Шукаємо розклад вчителя
  console.log(surname);
  let week = tables[0];
  if (day.chZn == "2"){
    week = tables[1];
  }
  const list = getData(glData, week)['data'];
  const tt = getInnerListByName(list, surname)
  
  // Визначаємо діапазон уроків
  const  maxLessons = 11;
  let lList = [];
  
  let start = (day.dWeek-1)*(maxLessons+1)+1;  
  let fin = start + maxLessons;
  let s;
  console.log(day);
  if (day.chZn == 1) 
    s =  tt[3][start-1] + ". Чисельник";
  else 
    s =  tt[3][start-1] + ". Знаменник";
  title.innerText = s;
 
  const startLesson = getData(glData, 'Час початку уроків').header;
  console.log(startLesson)
  for (let i=start; i<fin; i++){    
    let lesLime = startLesson[0][(i-1)%(maxLessons+1)]
    if (lesLime === undefined) lesLime = '';
    let num =  tt[2][i]
    if (num === undefined) num = '';
    let klas =  tt[1][i]
    if (klas === undefined) klas = '';
    let subj =  tt[0][i]   
    if (subj === undefined) subj = '';
    // if (subj === '') klas = '-'
    if (tables[0].length > 5) //Ознака того, що розклад класу
      lList.push("(" + lesLime + ") " + num + ". " + subj );
    else
      lList.push("(" + lesLime + ") " + num + ". " + klas + " - " + subj)
  }
  createList(lessList, lList, 'li')
}

teacherList.addEventListener('change', ()=>{
  clasList.value = ''
  showTT(teacherList, ['week1', 'week2']);
})
clasList.addEventListener('change', ()=>{
  teacherList.value = ''
  showTT(clasList, ['week1 (clas)', 'week2 (clas)']);
})

function getInnerListByName(list, surname) {
  for (var i = 0; i < list.length; i++) {
    if (list[i][0] === surname) {
      return [list[i].slice(1), list[i+1].slice(1), list[1].slice(1), list[0].slice(1)];
    }
  }
  return null;
}


let glData = [];

function padNumberWithZero(number) {
  return number < 10 ? '0' + number : number.toString();
}

let readTT = (s2)=>{    
  $.getJSON(server +  'getmultiblock/'+keyZamini,        
     function (data) {
      datePicker.value = `${year}-${(padNumberWithZero(month)).slice()}-${padNumberWithZero(date)}`
      glData = data; 
      // Читаємо список вчителів
      const tList = getFirstNonEmptyElements(getData(glData, 'week1')['data']);
      createList(teacherList, tList, 'option')
      // Читаємо список класів
      const cList = getFirstNonEmptyElements(getData(glData, 'week1 (clas)')['data']);
      createList(clasList, cList, 'option')
      // Визначаємо чисельник чи знаменник для вказаної дати
      const tWD = getData(glData, 'workdays')['data'];
      day  = getDataByDate(tWD, datePicker.value);
      
      // if (day.chZn == 1) 
      //   s =  tt[3][start-1] + ". Чисельник";
      // else 
      //   s =  tt[3][start-1] + ". Знаменник";
      // title.innerText = s;
          
    }
  );   
}

function getDataByDate(list, date) {
  let dateIndex = list[0].indexOf(date);
  if (dateIndex === -1) {
    return null; 
  } else {
    return { chZn: list[2][dateIndex], dWeek: list[1][dateIndex]}; 
  }
}


function getData(tables, table) {
  var result = tables.find(function(item) {
    return item.templFile === table;
  });
  if (result) {
    return { header: result.header, data: result.data };
  }
  return null;
}

function getFirstNonEmptyElements(lists) {
  return lists
    .map(innerList => innerList[0])
    .filter(element => element !== '')
    .filter(element => element !== undefined);
}

function createList(node, list, tag) {
  node.innerHTML = list.map(row => `<${tag}>${row}</${tag}>`).join('');
  node.value = '';
}



readTT();


// http://127.0.0.1:5509/ttable.html?id=1obSD_Q_w6ZXVAfMmJyXsGkf12VqDWjdhLDwARsd9Ujk

